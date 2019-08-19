<template>
    <el-container>
        <el-header>
            <h2>{{interface.title}}</h2>
        </el-header>
        <el-main>
            <!--接口地址-->
            <el-row>
                <el-row><h3>1 接口地址</h3></el-row>
                <el-row>{{interface.requestUrl}}</el-row>
            </el-row>
            <!--请求方法-->
            <el-row>
                <el-row><h3>2 请求方法</h3></el-row>
                <el-row>{{interface.requestMethod}}</el-row>
            </el-row>
            <!--请求参数描述-->
            <el-row>
                <el-row><h3>3 请求参数描述</h3></el-row>
                <el-row>
                    <!--请求参数示例-->
                    <JsonTestPenal v-if="interface.param.isJson" msg="请求参数示例"
                                   :jsonData="interface.param.jsonData"></JsonTestPenal>
                    <!--请求参数列表-->
                    <ParamTable :tableData="interface.param.tableData" msg="请求参数列表"></ParamTable>
                </el-row>
            </el-row>
            <!--响应参数描述-->
            <el-row>
                <el-row><h3>4 响应参数描述</h3></el-row>
                <!--响应参数列表-->
                <ParamTable :table-data="interface.resp.tableData" msg="响应参数列表"></ParamTable>
                <!--响应参数示例-->
                <JsonTestPenal msg="响应参数示例" :json-data="interface.resp.jsonData" :readOnly="true"/>

            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import ParamTable from "@/components/interface/ParamTable";
    import JsonTestPenal from "@/components/interface/JsonTestPenal";

    export default {
        name: "InterfaceInfo",
        props: {
            interface: Object
        },
        components: {
            ParamTable,
            JsonTestPenal
        }
    }
</script>

<style scoped>

</style>
