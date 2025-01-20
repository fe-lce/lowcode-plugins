import { common } from '@felce/lowcode-engine';
import type { PluginProps, IPublicApiCommon } from '@felce/lowcode-types';
import { PureComponent } from 'react';
import { IconEn } from './icons/en';
import { IconZh } from './icons/zh';
import './index.less';
import { intl } from './locale';

const { editorCabin } = common;
const { globalLocale, Tip } = editorCabin;

export default class ZhEn extends PureComponent<
  PluginProps & {
    common: IPublicApiCommon;
  }
> {
  static displayName = 'LowcodeZhEn';

  state = {
    locale: globalLocale.getLocale(),
  };

  private dispose = globalLocale.onChangeLocale((locale) => {
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
        <Tip direction="right">{intl('To Locale')}</Tip>
      </div>
    );
  }
}
