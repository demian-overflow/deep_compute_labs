const path = require('path');

module.exports = {
  framework: "@storybook/nextjs",
  stories: [
    "../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../app/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/config': path.resolve(__dirname, 'next-config-shim.js')
    };
    return config;
  }
};
