// eslint-disable-next-line import/no-extraneous-dependencies
const { generateConfig } = require('gatsby-plugin-ts-config');

export default generateConfig({
  projectRoot: __dirname, // <- not required.  If omitted, projectRoot will be process.cwd()
  configDir: '.gatsby',
});
