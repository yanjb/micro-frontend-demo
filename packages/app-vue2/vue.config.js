const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')

const port = 8081

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
      publicPath: `//localhost:${port}/`,
    },
  },
  publicPath: `//localhost:${port}/`,
})
