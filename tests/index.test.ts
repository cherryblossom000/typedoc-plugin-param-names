import * as path from 'path'
import {Application, TSConfigReader} from 'typedoc'
import {ReflectionType} from 'typedoc/dist/lib/models'
import type {
  DeclarationReflection,
  ParameterReflection,
  TypeDocOptions
} from 'typedoc'
import type {Type} from 'typedoc/dist/lib/models'
import type {ParamNamesOptions} from '../src'

declare global {
  interface ReadonlyArray<T> {
    map<U>(
      this: Readonly<Array8<T>>,
      callbackfn: (value: T, index: number, array: this) => U,
      thisArg?: unknown
    ): Array8<U>
  }
}

declare module 'typedoc' {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- augmentation
  class Application {
    bootstrap(options?: Partial<ParamNamesOptions & TypeDocOptions>): void
  }
}

type Array8<T> = [T, T, T, T, T, T, T, T]

const fixtureFolder = path.join(__dirname, 'fixture')

const convert = (
  options?: Partial<ParamNamesOptions>
): Record<
  | 'anonymousFunction'
  | 'arrowFunction'
  | 'class_'
  | 'declaredArrowFunction'
  | 'functionDeclaration'
  | 'functionType'
  | 'interface_'
  | 'type',
  DeclarationReflection | undefined
> => {
  const app = new Application()
  app.options.addReader(new TSConfigReader())
  app.bootstrap({
    entryPoints: [path.join(fixtureFolder, 'index.ts')],
    tsconfig: path.join(fixtureFolder, 'tsconfig.json'),
    plugin: [path.join(__dirname, '..')],
    ...options
  })

  const project = app.convert()

  describe('Converted successfully', () => {
    test('Project reflection is present', () => expect(project).toBeDefined())
    test('Project reflection has children', () =>
      expect(project?.children).toBeDefined())
    test('Logger has no errors', () =>
      expect(app.logger.hasErrors()).toBe(false))
    test('Logger has no warnings', () =>
      expect(app.logger.hasWarnings()).toBe(false))
  })

  const [
    class_,
    interface_,
    functionType,
    type,
    anonymousFunction,
    arrowFunction,
    declaredArrowFunction,
    functionDeclaration
  ] = project!.children!
  return {
    arrowFunction,
    declaredArrowFunction,
    functionDeclaration,
    anonymousFunction,
    functionType,
    type,
    interface_,
    class_
  }
}

const asReflectionType = (type: Type | undefined): ReflectionType | undefined =>
  type instanceof ReflectionType ? type : undefined

const hasName =
  (name: string) =>
  (declaration: DeclarationReflection): boolean =>
    declaration.name === name

const _testParam = (
  parameter: ParameterReflection | undefined,
  name: string,
  text: string
): void => {
  expect(parameter?.name).toBe(name)
  expect(parameter?.comment?.shortText).toBe(text)
}

const testParam = (
  parameter: ParameterReflection | undefined,
  name = 'foo'
): void => _testParam(parameter, name, `${name} description.`)

const testParamNoText = (
  parameter: ParameterReflection | undefined,
  name: string
): void => {
  expect(parameter?.name).toBe(name)
  // parameter is not undefined due to above
  expect(parameter!.comment).toBeUndefined()
}

describe('Default options', () => {
  const {
    arrowFunction,
    declaredArrowFunction,
    functionDeclaration,
    anonymousFunction,
    type,
    interface_,
    class_
  } = convert()

  const arrowFunctionParams = arrowFunction?.signatures?.[0]?.parameters

  test('Normal parameters are unaffected', () =>
    testParam(arrowFunctionParams?.[1], 'normalParameter'))

  describe('Detecting from documentation comments', () => {
    test.each`
      name                         | declaration
      ${'Arrow function'}          | ${arrowFunction}
      ${'Declared arrow function'} | ${declaredArrowFunction}
      ${'Anonymous function'}      | ${anonymousFunction}
      ${'Type method'}             | ${asReflectionType(type?.type)?.declaration.children?.find(hasName('method'))}
      ${'Class method'}            | ${class_?.children?.find(hasName('method'))}
    `(
      '$name',
      ({declaration}: {declaration: DeclarationReflection | undefined}) =>
        testParam(declaration?.signatures?.[0]?.parameters?.[0])
    )

    describe.each`
      name                      | declaration
      ${'Function declaration'} | ${functionDeclaration}
      ${'Interface method'}     | ${interface_?.children?.find(hasName('methodWithOverloads'))}
      ${'Class static method'}  | ${class_?.children?.find(hasName('staticMethodWithOverloads'))}
    `('$name', ({declaration}: {declaration?: DeclarationReflection}) => {
      test('First overload', () =>
        testParam(declaration?.signatures?.[0]?.parameters?.[0], 'foo'))
      test('Second overload', () =>
        testParam(declaration?.signatures?.[1]?.parameters?.[0], 'bar'))
    })
  })

  test('Named parameter with @param name but no text', () =>
    _testParam(arrowFunctionParams?.[2], 'noParamTagText', ''))

  describe('Fallback to namedParamName', () => {
    test('@param without name', () =>
      testParamNoText(arrowFunctionParams?.[3], 'options'))
    test('@param with trailing spaces name', () =>
      testParamNoText(arrowFunctionParams?.[4], 'options'))
    test('No @param', () =>
      testParamNoText(arrowFunctionParams?.[5], 'options'))
  })
})
