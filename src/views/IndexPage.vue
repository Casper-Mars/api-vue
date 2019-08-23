<template>
    <el-container>
        <el-header>
            <h2>在线文档使用说明</h2>
        </el-header>
        <el-main>
            <el-row>
                <el-row><h3>总体说明</h3></el-row>
                <el-row>
                    <p>
                        文档提供接口信息和相关的数据模型，并附带手动测试接口的功能。接口的服务器地址可以通过设置界面设定，同时可以设定一些常用的请求头参数
                    </p>
                </el-row>
            </el-row>
            <el-row>
                <el-row><h3>接口baseUrl</h3></el-row>
                <el-row><p>/api</p></el-row>
            </el-row>
            <el-row>
                <el-row><h3>开发者模式说明</h3></el-row>
                <el-row>
                    <p>
                        开发者模式只对接口的开发人员开放，具体功能暂不描述
                    </p>
                </el-row>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "IndexPage",
        data() {
            return {
            }
        },
    }
</script>

<style scoped>

</style>
