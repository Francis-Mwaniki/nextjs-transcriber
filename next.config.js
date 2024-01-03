/** @type {import('next').NextConfig} */
const nextConfig = {

    /* increase timeout */
    serverRuntimeConfig: {
        apiTimeout: 1000 * 60 * 5, // 5 minutes
    },
    publicRuntimeConfig: {
        apiTimeout: 1000 * 60 * 5, // 5 minutes
    },
}

module.exports = nextConfig
