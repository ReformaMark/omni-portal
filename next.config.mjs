/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'neat-ox-277.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'hidden-puffin-695.convex.cloud',
            },
        ]
    }
};

export default nextConfig;