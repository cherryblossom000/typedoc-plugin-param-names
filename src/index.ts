import {Converter, ParameterType} from 'typedoc'
import type {
  Application,
  ArrayDeclarationOption,
  BooleanDeclarationOption,
  MapDeclarationOption,
  MixedDeclarationOption,
  NumberDeclarationOption,
  SignatureReflection,
  StringDeclarationOption
} from 'typedoc'
import type {Context} from 'typedoc/dist/lib/converter'

const paramNameOption = 'namedParamName'
const detectFromCommentsOption = 'detectNamedParamFromComments'
const changeParamTagOption = 'changeNamedParamTag'

export interface ParamNamesOptions {
  [paramNameOption]: string
  [detectFromCommentsOption]: boolean
  [changeParamTagOption]: boolean
}

type KeyToDeclaration<K extends keyof ParamNamesOptions> =
  ParamNamesOptions[K] extends boolean
    ? BooleanDeclarationOption
    : ParamNamesOptions[K] extends string
    ? StringDeclarationOption
    : ParamNamesOptions[K] extends number
    ? NumberDeclarationOption
    : ParamNamesOptions[K] extends readonly string[]
    ? ArrayDeclarationOption
    : unknown extends ParamNamesOptions[K]
    ? MixedDeclarationOption
    : ParamNamesOptions[K] extends Readonly<Record<string, infer T>>
    ? MapDeclarationOption<T>
    : never

declare module 'typedoc' {
  // @ts-ignore Cannot redeclare exported variable 'Options'.
  // This is just adding overloads to some methods and doesn't conflict with Options.
  class Options {
    addDeclaration<K extends keyof ParamNamesOptions>(
      declaration: KeyToDeclaration<K> & {name: K}
    ): void
    getValue<K extends keyof ParamNamesOptions>(name: K): ParamNamesOptions[K]
  }
}

export const load = (app: Application): void => {
  app.options.addDeclaration<typeof paramNameOption>({
    name: paramNameOption,
    help: 'Specifies the name to replace __namedParameters with, if a @param tag isn’t found.',
    type: ParameterType.String,
    defaultValue: 'options'
  })

  app.options.addDeclaration<typeof detectFromCommentsOption>({
    name: detectFromCommentsOption,
    help: 'Whether to detect the name of parameters from the documentation comments.',
    type: ParameterType.Boolean,
    defaultValue: true
  })

  app.options.addDeclaration<typeof changeParamTagOption>({
    name: changeParamTagOption,
    help: `Whether to change the name of the @param tag to ${paramNameOption} so documentation is shown for a corresponding __namedParameters parameter. Ignored if ${detectFromCommentsOption} is true.`,
    type: ParameterType.Boolean,
    defaultValue: true
  })

  let paramName: string
  let detectFromComments: boolean
  let changeParamTag: boolean

  app.converter.on(Converter.EVENT_BEGIN, () => {
    paramName = app.options.getValue(paramNameOption)
    detectFromComments = app.options.getValue(detectFromCommentsOption)
    changeParamTag = app.options.getValue(changeParamTagOption)

    if (!changeParamTag && detectFromComments) {
      app.logger.warn(
        `${changeParamTagOption} is ignored when ${detectFromCommentsOption} is true`
      )
    }
  })

  app.converter.on(
    Converter.EVENT_CREATE_SIGNATURE,
    (_: Context, sig: SignatureReflection) => {
      if (!sig.parameters) return

      for (const [i, param] of sig.parameters.entries()) {
        if (param.name !== '__namedParameters') continue

        const paramTag = sig.comment?.tags.find(
          ({tagName}, j) => tagName === 'param' && j === i
        )

        if (detectFromComments)
          param.name = (paramTag?.paramName ?? '') || paramName
        else {
          param.name = paramName
          if (changeParamTag && paramTag) paramTag.paramName = param.name
        }
      }
    }
  )
}
