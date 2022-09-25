/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: "abdelnaby",
        mongodb_password: "PACbw2lEpSrPq5jB",
        mongodb_clusterName: "cluster0",
        mongodb_database: "blog_DEV",
      },
    };
    return nextConfig;
  }
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "abdelnaby",
      mongodb_password: "PACbw2lEpSrPq5jB",
      mongodb_clusterName: "cluster0",
      mongodb_database: "blog",
    },
  };
  return nextConfig;
};
