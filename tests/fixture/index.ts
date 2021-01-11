/* eslint-disable prettier/prettier -- trailing spaces */
/**
 * @param foo foo description.
 * @param normalParameter normalParameter description.
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
/* eslint-enable prettier/prettier -- trailing spaces */

/** @param foo foo description. */
export declare const declaredArrowFunction: ({foo}: any) => any

/** @param foo foo description. */
export function functionDeclarationOverloads({foo}: any)
/** @param bar bar description. */
export function functionDeclarationOverloads({bar}: any)
export function functionDeclarationOverloads({noParamTag}: {noParamTag: any})
export function functionDeclarationOverloads() {}

/** @param foo foo description. */
export const anonymousFunction = function ({foo}: any) {}

/** @param foo */
export type FunctionType = ({foo}: any) => any

export type Type = {
  /** @param foo foo description. */
  functionProperty: ({foo}: any) => any

  /** @param foo foo description. */
  method({foo}: any)
}

export interface Interface {
  /** @param foo foo description. */
  functionProperty: ({foo}: any) => any

  /** @param foo foo description. */
  methodWithOverloads({foo}: any)
  /** @param bar bar description. */
  methodWithOverloads({bar}: any)
  methodWithOverloads({noParamTag}: {noParamTag: any})
}

export class Class {
  /** @param foo foo description. */
  declare declaredField: ({foo}: any) => any

  /** @param foo foo description. */
  field: ({foo}: any) => any

  /** @param foo foo description. */
  constructor({foo}: any) {}

  /** @param foo foo description. */
  static staticMethodWithOverloads({foo}: any)
  /** @param bar bar description. */
  static staticMethodWithOverloads({bar}: any)
  static staticMethodWithOverloads({noParamTag}: {noParamTag: any})
  static staticMethodWithOverloads() {}

  /** @param foo foo description. */
  method({foo}: any) {}
}
