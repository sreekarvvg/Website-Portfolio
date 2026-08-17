import type { NextConfig } from "next";

/** Asset folders under `public/` — decks, screenshots, artwork and the film. */
const ASSET_DIRS = ["metalabs", "mba", "mavip", "intellect"];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        // These files are content-addressed by hand: a deck page never changes
        // under the same name, it is replaced by a new one. Anything reached
        // through next/image already gets a long cache; these are the raw
        // requests (the film, and images referenced from CSS).
        source: `/:dir(${ASSET_DIRS.join("|")})/:path*`,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
