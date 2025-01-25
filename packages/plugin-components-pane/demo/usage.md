---
title: Usage
order: 1
---

用法

```jsx
import React, { Component } from 'react';
import {createRoot} from 'react-dom/client';
import { Icon } from '@alifd/next';
import ComponentPane, { PaneIcon } from '@felce/lowcode-plugin-components-pane';
import './index.scss';

const packages = [
  {
    package: 'polyfill',
    urls: ['//g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js'],
  },
  { package: 'react', version: '18.3.1', urls: null, library: 'React' },
  { package: 'react-dom', version: '18.3.1', urls: null, library: 'ReactDOM' },
  { package: 'prop-types', version: '15.6.2', urls: null, library: 'PropTypes' },
];

class App extends Component {
  componentDidMount() {
    VisualEngine.init(this.container);
    VisualEngine.Panes.add(() => {
      return {
        type: 'dock',
        name: 'trunk',
        width: 300,
        title: '零售云 - 在线设计',
        description: '组件库',
        menu: <PaneIcon />,
        content: ComponentPane,
        props: {
          editor: VisualEngine.editor,
          Trunk: VisualEngine.Trunk,
        },
      };
    });

    VisualEngine.editor.set('assets', {
      version: '1.0.0',
      externals: [],
      packages,
    });
    VisualEngine.Pages.addPage({
      id: 'test',
      componentsTree: [],
    });
  }
  render() {
    return (
      <div id="engine" style={{ position: 'relative' }} ref={(ref) => (this.container = ref)}></div>
    );
  }
}

const root = createRoot(document.getElementById('lce-container')!);

root.render(<App />);
```
