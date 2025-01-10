import { IPublicModelPluginContext } from '@felce/lowcode-types';
import { IconQuestion } from './icon';

const PluginManual = (ctx: IPublicModelPluginContext) => {
  return {
    init() {
      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'leftArea',
        name: 'manualPane',
        type: 'PanelDock',
        props: {
          align: 'bottom',
          icon: IconQuestion,
          description: '如何使用',
          onClick() {
            window
              .open('https://felce.cn/docs/demoUsage/intro', '_blank')
              .focus();
          },
        },
      });
    },
  };
};

PluginManual.pluginName = 'PluginManual';

export default PluginManual;
