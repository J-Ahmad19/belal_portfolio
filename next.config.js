/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/keystatic",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
