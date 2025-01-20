import { IPublicModelPluginContext } from '@felce/lowcode-types';
import ZhEn from './zh-en';
import './index.less';

const plugin = (ctx: IPublicModelPluginContext) => {
  return {
    // 插件名，注册环境下唯一
    name: 'PluginZhEn',
    // 依赖的插件（插件名数组）
    dep: [],
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'leftArea',
        type: 'Widget',
        name: 'zhEn',
        content: ZhEn,
        contentProps: {
          common: ctx.common,
        },
        props: {
          align: 'bottom',
        },
      });
    },
  };
};

plugin.pluginName = 'PluginZhEn';

export default plugin;
