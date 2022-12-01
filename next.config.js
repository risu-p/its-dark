const withTM = require("next-transpile-modules")(["antd-mobile"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  /* react 18 strict mode下，组件会初始化2次 */
  reactStrictMode: false,
});

module.exports = nextConfig;
