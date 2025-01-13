import { Button, Dialog, Message } from '@alifd/next';
import MonacoEditor, {
  IEditorInstance,
} from '@felce/lowcode-plugin-base-monaco-editor';
import {
  IPublicEnumTransformStage,
  IPublicModelPluginContext,
} from '@felce/lowcode-types';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface PluginCodeDiffProps {
  intlCtx: any;
  pluginContext: IPublicModelPluginContext;
  // 是否显示项目级 schema
  showProjectSchema: boolean;
}

export default function PluginSchema({
  intlCtx,
  pluginContext,
  showProjectSchema = false,
}: PluginCodeDiffProps) {
  const { intl } = intlCtx;
  const { project, skeleton } = pluginContext;

  const [editorSize, setEditorSize] = useState({ width: 0, height: 0 });
  const getSchemaStr = useCallback(() => {
    const schema = project.exportSchema(IPublicEnumTransformStage.Save);
    const schemaToShow = showProjectSchema
      ? schema
      : schema?.componentsTree?.[0];
    return schemaToShow ? JSON.stringify(schemaToShow, null, 2) : '';
  }, []);
  const [schemaValue, setSchemaValue] = useState(() => {
    return getSchemaStr();
  });
  const monacoEditorRef = useRef<IEditorInstance>();

  const resize = useCallback(() => {
    setEditorSize({
      width: document.documentElement.clientWidth - 60,
      height: document.documentElement.clientHeight - 100,
    });
  }, []);

  useLayoutEffect(() => {
    const cancelListenShowPanel = skeleton.onShowPanel((pluginName: string) => {
      if (pluginName == 'LowcodePluginAliLowcodePluginSchema') {
        setSchemaValue(getSchemaStr());
      }
    });
    return cancelListenShowPanel;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const onSave = () => {
    Dialog.alert({
      content: intl('Save Tip'),
      footerActions: ['cancel', 'ok'],
      onOk: () => {
        let json;
        try {
          const str = (monacoEditorRef.current as any)?.getValue();
          json = JSON.parse(str ?? schemaValue);
        } catch (err) {
          Message.error(
            'Cannot save schema. Schema Parse Error.' + err.message
          );
          return;
        }
        if (showProjectSchema) {
          // 当前操作项目级 schema
          project.importSchema(json);
        } else {
          // 当前操作页面级 schema
          project.importSchema({
            ...project.exportSchema(IPublicEnumTransformStage.Save),
            componentsTree: [json],
          });
        }
        Message.success(intl('Schema Saved'));
        skeleton.hidePanel('LowcodePluginAliLowcodePluginSchema');
      },
    });
  };

  return (
    <>
      <Button
        onClick={onSave}
        style={{ position: 'absolute', right: 68, zIndex: 100, top: -38 }}
      >
        {intl('Save Schema')}
      </Button>
      <MonacoEditor
        height={editorSize.height}
        language="json"
        theme="vs-light"
        value={schemaValue}
        onChange={(input) => {
          setSchemaValue(input);
        }}
        editorDidMount={(_, monacoEditor) => {
          monacoEditorRef.current = monacoEditor;
          monacoEditor.addAction({
            id: 'my-unique-id',
            label: 'Save Schema',
            keybindingContext: null,
            contextMenuGroupId: 'navigation',
            contextMenuOrder: 1.5,
            run: onSave,
          });
        }}
      />
    </>
  );
}
