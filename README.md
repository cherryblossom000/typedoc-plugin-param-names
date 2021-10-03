# typedoc-plugin-param-names

<!-- markdownlint-disable MD013 -->
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://badgen.net/github/license/cherryblossom000/typedoc-plugin-param-names)](https://github.com/cherryblossom000/typedoc-plugin-param-names/blob/master/LICENSE)
[![version](https://badgen.net/npm/v/typedoc-plugin-param-names)](https://www.npmjs.com/package/typedoc-plugin-param-names)
<!-- markdownlint-enable MD013 -->

Renames `__namedParameters` to the parameter names in the documentation
comments. Created because of
[this issue](https://github.com/TypeStrong/typedoc/issues/1321).

## Status

This package is deprecated and will not be actively maintained as it is no
longer needed. As of v0.22.5, TypeDoc will [infer the name of a destructured
parameter](https://github.com/TypeStrong/typedoc/pull/1704) using the `@param`
tag.

### Migration

TypeDoc does not have a way to specify a default `__namedParameters` like
`namedParamName` in this plugin. Instead, explicitly use `@param theName`
instead.

For example, if `namedParamName` was `'options'` (the default), change this:

```ts
const fn = ({foo}: {foo: string}) => {}
```

to this:

```ts
/** @param options */
const fn = ({foo}: {foo: string}) => {}
```

Other than that, there should be no need to change any code; simply
`npm/yarn/pnpm uninstall typedoc-plugin-param-names`.

## Usage

The plugin will automatically try to detect the parameter names based on the
documentation comments:

```ts
/**
 * @param options1
 * @param options2 You can also have a description for the parameter.
 */
const fn = (
  {foo}: {foo: string}, // rendered as options1
  {bar}: {bar: string}  // rendered as options2
): void => {}
```

If you are going to mix non-destructured parameters with destructured ones, you
need to use a `@param` tag (you don’t need to include any description) for every
non-destructured parameter that comes before the destructured ones (that you
want to rename):

<!-- markdownlint-disable MD013 -->
```ts
/**
 * @param normalParameter
 * @param options1
 */
const fn = (
  normalParameter: string, // normalParameter
  {foo}: {foo: string},    // options1
  anotherOne: string,      // anotherOne
  {bar}: {bar: string}     // <value of namedParamName> (default: options)
) => {}
```
<!-- markdownlint-enable MD013 -->

If you want the behaviour from v1.0.0, set `detectNamedParamFromComments` to
`false`:

```ts
/**
 * @param normalParameter abc
 * @param options1 def
 */
const fn = (
  normalParameter: string, // normalParameter  with 'abc'
  {foo}: {foo: string},    // <namedParamName> with 'def'
  anotherOne: string,      // anotherOne
  {bar}: {bar: string}     // <namedParamName> with 'def'
) => {}
```

As shown above, the plugin changes the parameter name of the `@param` tags for
the corresponding destructured parameters so the documentation ‘abc’ is shown.
However, because all the destructured parameters would be converted to the same
name, the documentation from the first `@param` tag that matches the parameter
name would be used for all of them. If you want to disable this behaviour (for
example if you have multiple destructured parameters that you have not
documented), set `changeNamedParamTag` to `false`:

```ts
/**
 * @param normalParameter abc
 * @param options1 def
 */
const fn = (
  normalParameter: string, // normalParameter  with 'abc'
  {foo}: {foo: string},    // <namedParamName> with no documentation
  anotherOne: string,      // anotherOne
  {bar}: {bar: string}     // <namedParamName> with no documentation
) => {}
```

### Options

<!-- markdownlint-disable MD013 -->
| Option                         | Description                                                                                                                                                                                          | Type    | Default     |
| -----------------------------  | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `namedParamName`               | Specifies the name to replace `__namedParameters` with, if a `@param` tag isn’t found.                                                                                                               | string  | `'options'` |
| `detectNamedParamFromComments` | Whether to detect the name of parameters from the documentation comments.                                                                                                                            | boolean | `true`      |
| `changeNamedParamTag`          | Whether to change the name of the `@param` tag to `namedParamName` so documentation is shown for a corresponding `__namedParameters` parameter. Ignored if `detectNamedParamFromComments` is `true`. | boolean | `true`      |
<!-- markdownlint-enable MD013 -->

## Limitations

- Cannot detect parameter name from documentation comment in the following class
  and interface fields/properties:

  ```ts
    class Class {
      declare declaredField: ({foo}: {foo: string}) => void
      field!: ({foo}: {foo: string}) => void
    }

    interface Interface {
      property: ({foo}: {foo: string}) => void
    }
    ```

  These will all be renamed to the `namedParamName` option, regardless of the
  documentation comments.

- Replaces parameters actually called `__namedParameters`

## License

[MIT](LICENSE) © 2020–2021 cherryblossom000
