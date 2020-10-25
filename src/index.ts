import {ParameterType} from 'typedoc'
import {Converter} from 'typedoc/dist/lib/converter'
import type {ParameterReflection} from 'typedoc'
import type {Context} from 'typedoc/dist/lib/converter'
import type {PluginHost} from 'typedoc/dist/lib/utils'

export const load = ({application}: PluginHost): void => {
  application.options.addDeclaration({
    name: 'param-name',
    help: 'Specifies the name to replace __namedParameters with.',
    type: ParameterType.String,
    defaultValue: 'options'
  })

  application.converter.on(
    Converter.EVENT_CREATE_PARAMETER,
    (_: Context, param: ParameterReflection) => {
      if (param.name === '__namedParameters')
        param.name = application.options.getValue('param-name') as string
    }
  )
}
