import { IPublicModelPluginContext } from '@felce/lowcode-types';
import { UndoRedo } from './undo-redo';

const plugin = (ctx: IPublicModelPluginContext) => {
  return {
    // 插件名，注册环境下唯一
    name: 'PluginUndoRedo',
    // 依赖的插件（插件名数组）
    dep: [],
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'undoRedo',
        content: UndoRedo,
        props: {
          align: 'right',
          width: 88,
        },
      });
    },
  };
};

plugin.pluginName = 'PluginUndoRedo';

export default plugin;
