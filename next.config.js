/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'], 
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY, 
  },
  reactStrictMode: true,
}

module.exports = nextConfig