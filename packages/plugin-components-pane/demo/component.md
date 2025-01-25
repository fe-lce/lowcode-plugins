---
title: Component
order: 2
---

用法

```jsx
import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import ComponentPane, { PaneIcon } from '@felce/lowcode-plugin-components-pane';
import Editor from '../schema/editor';
import mock from '../schema/mock.json';

const editor = new Editor();
editor.set('assets', mock);

class App extends Component {
  render() {
    return (
      <div
        style={{ width: '312px', backgroundColor: 'white', paddingTop: '12px', height: '600px' }}
      >
        <ComponentPane editor={editor} />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('lce-container')!);

root.render(<App />);
```
