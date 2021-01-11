/**
 * `emptyParamTagName`, `spacesParamTagName`, and `noParamTagName` should be
 * called `options` or `someOtherName` (i.e. the value for the namedParamName
 * option).
 * @param foo This should be called foo, unless `detectNamedParamFromComments`
 * is false.
 * @param normalParameter This should be called normalParameter, like normal.
 * @param noParamTagText
 * @param
 * @param  
 */
export const arrowFunction = (
  {paramTagName}: {paramTagName: any},
  normalParameter: any,
  {noParamTagText}: any,
  {emptyParamTagName}: {emptyParamTagName: any},
  {spacesParamTagName}: {spacesParamTagName: any},
  {noParamTagName}: {noParamTagName: any}
) => {}

/** @param foo */
export function functionDeclarationWithOverloads({foo}: any)
/** @param bar */
export function functionDeclarationWithOverloads({bar}: any)
export function functionDeclarationWithOverloads({
  noParamTag
}: {
  noParamTag: any
})
export function functionDeclarationWithOverloads() {}

/** @param foo */
export const anonymousFunction = function ({foo}: any) {}

export type Type = {
  /** @param foo description*/
  functionProperty: ({foo}: any) => any

  /** @param foo */
  method({foo}: any)
}

/** @param foo */
export type FunctionType = ({foo}: any) => any

export interface Interface {
  /** @param foo description */
  functionProperty: ({foo}: any) => any

  /** @param foo */
  methodWithOverloads({foo}: any)
  /** @param bar */
  methodWithOverloads({bar}: any)
  methodWithOverloads({noParamTag}: {noParamTag: any})
}

export class Class {
  /** @param foo description */
  declare declaredField: ({foo}: any) => any

  /** @param foo description */
  field: ({foo}: any) => any

  /** @param foo */
  constructor({foo}: any) {}

  /** @param foo */
  static staticMethodWithOverloads({foo}: any)
  static staticMethodWithOverloads({noParamTag}: {noParamTag: any})
  static staticMethodWithOverloads() {}

  /** @param foo */
  method({foo}: any) {}
}

/** @param foo */
export declare const declaredArrowFunction: ({foo}: any) => any
