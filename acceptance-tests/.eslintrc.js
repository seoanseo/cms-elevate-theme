require('eslint-config-hubspot-dev/set-project-directory').setProjectDirectory(
  __dirname
);
module.exports = {
  extends: ['hubspot-dev/selenium-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
