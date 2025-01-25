import { IPublicModelPluginContext } from '@felce/lowcode-types';
import { IconQuestion } from './icon';
import { enUS, zhCN } from './locale';

const PluginManual = (ctx: IPublicModelPluginContext) => {
  const intlCtx = ctx.common.utils.createIntl({
    'en-US': enUS,
    'zh-CN': zhCN,
  });
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
          description: intlCtx.intl('manual'),
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
