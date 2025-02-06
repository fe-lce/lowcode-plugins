---
title: Diff Usage
order: 2
---

```jsx
import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import LowcodePluginBaseMonacoEditor from '@felce/lowcode-plugin-base-monaco-editor';

class App extends Component {
  render() {
    return (
      <div>
        <LowcodePluginBaseMonacoEditor.MonacoDiffEditor
          original={JSON.stringify({ a: 1 }, null, 2)}
          value={JSON.stringify({ b: 2 }, null, 2)}
          height={100}
          language="json"
        />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('lce-container')!);

root.render(<App />);
```
