import { IPublicModelPluginContext } from '@felce/lowcode-types';
import ComponentsPane from './pane';
const ComponentPanelPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, common, event, material, project } = ctx;
      // 注册组件面板
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: [
          {
            name: 'componentsPane',
            type: 'Panel',
            contentProps: {
              common,
              event,
              material,
              project,
            },
            content: ComponentsPane,
          },
        ],
        props: {
          align: 'top',
          icon: 'zujianku',
          description: '组件库',
        },
      });

      componentsPane?.disable?.();
      project.onSimulatorRendererReady(() => {
        componentsPane?.enable?.();
      });
    },
  };
};
ComponentPanelPlugin.pluginName = 'ComponentPanelPlugin';
export default ComponentPanelPlugin;
