const withTM = require("next-transpile-modules")(["antd-mobile"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone", // 最小化构建
  /* react 18 strict mode下，组件会初始化2次 */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
