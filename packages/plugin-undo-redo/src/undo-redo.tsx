import { project } from '@felce/lowcode-engine';
import { IPublicTypeDisposable, PluginProps } from '@felce/lowcode-types';
import { PureComponent } from 'react';
import { Button, Icon } from '@alifd/next';

import './undo-redo.less';

export interface IProps extends PluginProps {
  logo?: string;
}

export interface IState {
  undoEnable: boolean;
  redoEnable: boolean;
}

export class UndoRedo extends PureComponent<IProps, IState> {
  static displayName = 'LowcodeUndoRedo';

  private history: any;
  private changeDocumentDispose?: IPublicTypeDisposable;
  private changeStateDispose?: IPublicTypeDisposable;
  constructor(props: any) {
    super(props);
    this.state = {
      undoEnable: false,
      redoEnable: false,
    };
    this.init();
  }

  init = (): void => {
    this.changeDocumentDispose = project.onChangeDocument((doc) => {
      this.history = doc.history;
      this.updateState(this.history?.getState() || 0);
      this.changeStateDispose?.();
      this.changeStateDispose = this.history.onChangeState(() => {
        this.updateState(this.history?.getState() || 0);
      });
    });
  };

  updateState = (state: number): void => {
    this.setState({
      undoEnable: !!(state & 1),
      redoEnable: !!(state & 2),
    });
  };

  handleUndoClick = (): void => {
    this.history.back();
  };

  handleRedoClick = (): void => {
    this.history.forward();
  };

  componentWillUnmount() {
    this.changeDocumentDispose?.();
    this.changeStateDispose?.();
  }

  render(): React.ReactNode {
    const { undoEnable, redoEnable } = this.state;
    return (
      <div className="lowcode-plugin-undo-redo">
        <Button
          size="medium"
          data-tip="撤销"
          data-dir="bottom"
          onClick={this.handleUndoClick}
          ghost
          disabled={!undoEnable}
        >
          <Icon type="houtui" />
        </Button>
        <Button
          size="medium"
          data-tip="恢复"
          data-dir="bottom"
          onClick={this.handleRedoClick}
          ghost
          disabled={!redoEnable}
        >
          <Icon type="qianjin" />
        </Button>
      </div>
    );
  }
}
