/** @type {import('next').NextConfig} */
// NOTE: With custom server option you don't need the next.config.js to handle server logics you handle yourself
// const isProd = process.env.NODE_ENV === 'production'
// Setting env as local is not stardard for Next so I use this variable
// const isLocal = process.env.NEXT_PUBLIC_ENV === 'local'
// const isDev = process.env.NODE_ENV === 'development'
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, { isServer, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ],
      exclude: /node_modules/
    })
    config.resolve.extensions.push('.ts', '.tsx')

    if (!isServer) {
      config.cache = false
      config.module.rules.push({
        test: /\.test\.(tsx|ts)$/, // explicitly ignore the test file during building
        loader: 'ignore-loader'
      })
    }
    return config
  }
}

module.exports = nextConfig
