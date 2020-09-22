// eslint-disable-next-line import/no-extraneous-dependencies
const { generateConfig } = require('gatsby-plugin-ts-config');

module.exports = generateConfig({
  projectRoot: __dirname, // <- not required.  If omitted, projectRoot will be process.cwd()
  configDir: '.gatsby',
});
