/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  trailingSlash: true,
  allowedDevOrigins: [
    'run-agent-6a435a1601c2dcf308f41467-mr08f0w7-preview.agent-sandbox-bj-d1-gw.trae.cn',
    '.trae.cn',
    '.agent-sandbox-bj-d1-gw.trae.cn',
  ],
};

module.exports = nextConfig;