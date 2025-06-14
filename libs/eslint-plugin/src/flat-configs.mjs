import baseConfig from './lib/config/base.flat.mjs';
import reactConfig from './lib/config/react.flat.mjs';
import nestjsConfig from './lib/config/nestjs.flat.mjs';

export const configs = {
  base: baseConfig,
  react: reactConfig,
  nestjs: nestjsConfig,
};

export { baseConfig as base, reactConfig as react, nestjsConfig as nestjs };
