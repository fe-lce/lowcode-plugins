import type { PluginProps, IPublicApiCommon } from '@felce/lowcode-types';
import { PureComponent } from 'react';
import { IconEn } from './icons/en';
import { IconZh } from './icons/zh';
import './index.less';

const { editorCabin } = common;
const { globalLocale } = editorCabin;

type IZhEnProps = PluginProps & {
  common: IPublicApiCommon;
};

export default class ZhEn extends PureComponent<IZhEnProps> {
  static displayName = 'LowcodeZhEn';

  state = {
    locale: globalLocale.getLocale(),
  };

  constructor(props: IZhEnProps) {
    super(props);

    this.props.common;
  }

  private dispose = globalLocale.onChangeLocale((locale: string) => {
    this.setState({
      locale,
    });
    window.location.reload();
  });

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const isZh = this.state.locale === 'zh-CN';
    return (
      <div
        className="lowcode-plugin-zh-en"
        onClick={() => {
          globalLocale.setLocale(isZh ? 'en-US' : 'zh-CN');
        }}
      >
        {isZh ? <IconEn size={20} /> : <IconZh size={20} />}
      </div>
    );
  }
}
