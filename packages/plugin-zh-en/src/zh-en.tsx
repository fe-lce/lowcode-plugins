import type { PluginProps, IPublicApiCommon } from '@felce/lowcode-types';
import { PureComponent } from 'react';
import { IconEn } from './icons/en';
import { IconZh } from './icons/zh';
import './index.less';

// const { editorCabin } = common;
// const { globalLocale } = editorCabin;

type IZhEnProps = PluginProps & {
  common: IPublicApiCommon;
};

export default class ZhEn extends PureComponent<IZhEnProps> {
  static displayName = 'LowcodeZhEn';

  state = {
    locale: '',
  };

  private globalLocale;

  constructor(props: IZhEnProps) {
    super(props);
    this.globalLocale = (props.common.editorCabin as any).globalLocale;

    this.state.locale = this.globalLocale.getLocale();
    this.globalLocale.onChangeLocale((locale: string) => {
      this.setState({
        locale,
      });
      window.location.reload();
    });
  }

  changeHandle() {
    const isZh = this.state.locale === 'zh-CN';
    this.globalLocale.setLocale(isZh ? 'en-US' : 'zh-CN');
  }

  componentWillUnmount() {
    // this.dispose();
  }

  render() {
    const isZh = this.state.locale === 'zh-CN';
    return (
      <div
        className="lowcode-plugin-zh-en"
        onClick={() => {
          this.changeHandle();
        }}
      >
        {isZh ? <IconEn size={20} /> : <IconZh size={20} />}
      </div>
    );
  }
}
