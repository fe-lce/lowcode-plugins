import { Plugin } from 'vite';

function altPlugin(): Plugin {
  let bundleContent = '';
  return {
    name: 'build-plugin-alt',
    writeBundle(options, bundle) {
      // try {
      //   // 假设打包后的主文件是 index.html，你可以根据实际情况修改
      //   const outputPath = path.join(options.dir || 'dist', 'index.html');
      //   // 读取打包后的文件内容
      //   bundleContent = fs.readFileSync(outputPath, 'utf-8');
      // } catch (error) {
      //   console.error('Error reading bundled file:', error);
      // }
    },
    config() {},
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , sessionToken'
        );
        res.setHeader(
          'Access-Control-Allow-Methods',
          'PUT, POST, GET, DELETE, OPTIONS'
        );
        // type = 'text/javascript';
        if (req.url === '/apis/injectInfo') {
          res.setHeader('Content-Type', 'application/javascript');
          res.end(`export default ${JSON.stringify(server.config.root)}`);
        } else {
          next();
        }
      });
    },
    // transform(code, id) {
    //   console.log(code);
    //   debugger;
    //   return {
    //     code,
    //     map: null,
    //   };
    // },
  };
}
export default altPlugin;
