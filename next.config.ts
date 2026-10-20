import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The vercel.app URL duplicates the whole site; send it to the real domain
      // so Google only indexes www.nouskunai.com.
      {
        source: "/:path*",
        has: [{ type: "host", value: "nouskun-ai.vercel.app" }],
        destination: "https://www.nouskunai.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
