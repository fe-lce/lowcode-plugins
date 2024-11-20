import { project } from '@felce/lowcode-engine';
import { IPublicEnumTransformStage } from '@felce/lowcode-types';

export const deleteHiddenTransducer = (ctx: any) => {
  return {
    name: 'deleteHiddenTransducer',
    async init() {
      project.addPropsTransducer((props: any): any => {
        delete props.hidden;
        return props;
      }, IPublicEnumTransformStage.Save);
    },
  };
};

deleteHiddenTransducer.pluginName = 'deleteHiddenTransducer';
