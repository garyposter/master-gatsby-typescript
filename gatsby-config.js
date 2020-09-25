// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateConfig } = require("gatsby-plugin-ts-config");

export default generateConfig({
  projectRoot: __dirname, // <- not required.  If omitted, projectRoot will be process.cwd()
  configDir: ".gatsby",
});
