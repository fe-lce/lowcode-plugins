import { IPublicModelPluginContext } from '@felce/lowcode-types';
import { addonCombine } from './addon-combine';

const SetRefPropPlugin = (ctx: IPublicModelPluginContext) => {
  const { material } = ctx;
  return {
    init() {
      material.registerMetadataTransducer(
        addonCombine,
        110,
        'register-ref-prop'
      );
    },
  };
};

SetRefPropPlugin.pluginName = 'SetRefPropPlugin';
export default SetRefPropPlugin;
