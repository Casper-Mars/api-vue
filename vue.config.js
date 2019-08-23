module.exports = {
    devServer: {
        port: 8082,
        host: "localhost",
        https: false,
        // 自动启动浏览器
        open: false,
        proxy: {
            "/api": {
                target: "http://localhost:18080/api-doc/api",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
    outputDir: '../api-container/src/main/resources/static',
    publicPath: process.env.NODE_ENV === 'production' ? '/api-doc/' : '/',

    pwa: {
        iconPath: {
            favicon32: 'indexicon.png',
            favicon16: 'indexicon.png',
            appleTouchIcon: 'indexicon.png',
            maskIcon: 'indexicon.png',
            msTileImage: 'indexicon.png'
        }
    },

};
