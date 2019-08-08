module.exports =  {
    devServer: {
        port: 8082,
        host: "localhost",
        https: false,
        // 自动启动浏览器
        open: false,
        proxy: {
            "/api": {
                target:  "http://localhost:18080/api",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }

   },
    outputDir:'../api-container/src/main/resources/static',
};
