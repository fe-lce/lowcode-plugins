import { DiffMonacoEditorComponent, SingleMonacoEditor } from './editor';
import { INITIAL_OPTIONS, noop } from './helper';

export * from './monaco';
export * from './controller';

export const SingleMonacoEditorComponent = Object.assign(SingleMonacoEditor, {
  displayName: 'SingleMonacoEditor',
  defaultProps: {
    width: '100%',
    height: 150,
    defaultValue: '',
    language: 'javascript',
    options: INITIAL_OPTIONS,
    editorDidMount: noop,

    editorWillMount: noop,
    onChange: noop,
    requireConfig: {},
  },
  MonacoDiffEditor: DiffMonacoEditorComponent,
});

export default SingleMonacoEditorComponent;
