import { IPublicModelPluginContext } from '@felce/lowcode-types';
import React from 'react';
import { SimulatorResizePane } from './pane';

const plugin = (ctx: IPublicModelPluginContext) => {
  const SimulatorResizePaneRef = React.createRef<SimulatorResizePane>();

  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 往引擎增加工具条
      ctx.skeleton.add({
        area: 'topArea',
        name: 'SimulatorResizePane',
        type: 'Widget',
        props: {
          description: '切换画布尺寸',
          align: 'center',
        },
        contentProps: {
          ref: SimulatorResizePaneRef,
          pluginContext: ctx,
        },
        content: SimulatorResizePane,
      });
    },
  };
};

plugin.pluginName = 'SimulatorResizePane';

export default plugin;
