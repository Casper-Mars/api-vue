module.exports = {
    devServer: {
        port: 8082,
        host: "localhost",
        https: false,
        // 自动启动浏览器
        open: false,
        proxy: {
            "/api": {
                target: "http://119.23.28.6:18080/api-doc/api",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }

    },
    outputDir: '../api-container/src/main/resources/static',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/api-doc/'
        : '/',

};
