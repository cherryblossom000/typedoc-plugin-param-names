# Changelog

# [3.1.0](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v3.0.1...v3.1.0) (2021-09-19)


### Features

* support typedoc 0.22 ([e7bf671](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/e7bf671af6625a153fea051e7b3ece9dc47190e7)), closes [#12](https://github.com/cherryblossom000/typedoc-plugin-param-names/issues/12)

## [3.0.1](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v3.0.0...v3.0.1) (2021-07-11)


### Bug Fixes

* fix peer dependency range for typedoc ([1cb5a46](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/1cb5a4658071585d16e1ef42b1b38ecd76c00b2e))

# [3.0.0](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v2.0.0...v3.0.0) (2021-07-10)


### Features

* support `typedoc@0.21` ([d04eb4b](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/d04eb4bfe3fd6531dbea93e6fe4f575867155d05))


### BREAKING CHANGES

* No longer supports typedoc versions `0.15.5` to `0.20.37` due to
https://github.com/TypeStrong/typedoc/commit/22df5746dc8bf7df0a26ff47e1f1d82737461f05.

# [2.0.0](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v1.2.0...v2.0.0) (2021-01-11)


### Bug Fixes

* fix TS error ([80eb585](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/80eb5853486e705b0a9cfc81236f94a4f8b6765d))


### Features

* detect param name from comments and change options ([6e5e465](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/6e5e4654fa2b7aeff5c366d39fdb60d5d183af06))
* use application logger ([4cc0020](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/4cc0020c9c65de080fbeaedceb5e58d2f4cbad2f))


### BREAKING CHANGES

* The `param-name` option has been renamed to `namedParamName` and by default, the
plugin will detect the name of parameters from the documentation comments.

# [1.2.0](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v1.1.0...v1.2.0) (2021-01-10)


### Features

* support `typedoc@0.20` ([1b47aa9](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/1b47aa96b18f965964eccd69c7eccf1348b46bfe))

# [1.1.0](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v1.0.2...v1.1.0) (2020-10-25)


### Features

* support `typedoc@0.19` (fixes [#2](https://github.com/cherryblossom000/typedoc-plugin-param-names/issues/2)) ([fc22ffb](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/fc22ffbbeb44eb2f64b0cf5fc0a59419e41b225e))

## [1.0.2](https://github.com/cherryblossom000/typedoc-plugin-param-names/compare/v1.0.1...v1.0.2) (2020-08-12)


### Bug Fixes

* publish dist directory ([99cdd9b](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/99cdd9bcccdbf4d2e8252b8e68ae076894d2f133))

# 1.0.0 (2020-07-06)


### Features

* initial release ([1e1ccba](https://github.com/cherryblossom000/typedoc-plugin-param-names/commit/1e1ccba6885b9704fc2d409b54aeeb7ae9436019))
