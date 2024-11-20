module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';

  return isEnvProduction
    ? {
        react: 'react',
        'react-dom': 'react-dom',
        '@felce/lowcode-engine': '@felce/lowcode-engine',
        '@felce/lowcode-engine-ext': '@felce/lowcode-engine-ext',
        '@alifd/next': '@alifd/next',
        'prettier/esm/standalone.mjs': 'prettier/esm/standalone.mjs',
      }
    : {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@felce/lowcode-engine': 'AliLowCodeEngine',
        '@felce/lowcode-engine-ext': 'AliLowCodeEngineExt',
        '@alifd/next': 'Next',
        'prettier/esm/standalone.mjs': 'prettier',
      };
};
