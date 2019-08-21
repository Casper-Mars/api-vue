<template>
    <el-container>
        <el-header>
            <h2>{{interface.title}}</h2>
        </el-header>
        <el-main>
            <el-row>
                <el-row><h3>接口地址</h3></el-row>
                <el-row>{{interface.requestUrl}}</el-row>
            </el-row>
            <el-row>
                <el-row><h3>部署服务器地址</h3></el-row>
                <el-row>
                    <el-input v-model="serviceUrl"></el-input>
                </el-row>
            </el-row>
            <el-row>
                <el-row>
                    <h3>请求头参数</h3>
                    <el-button @click="addHeader" type="primary">添加请求头</el-button>
                </el-row>
                <el-row v-for="(item,index) in headers" :gutter="10" style="margin: 10px">
                    <el-col :span="6">
                        <el-input v-model="item.name"></el-input>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="item.value"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="deleteHeader(item)" type="danger" icon="el-icon-delete" circle></el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="submitTest">提交测试</el-button>
                </el-row>
                <el-row>
                    <el-row><h3>测试结果</h3></el-row>
                    <el-row>
                        <el-table
                            :border="true"
                            :data="tableData"
                        >
                            <el-table-column
                                    prop="stateCode"
                                    label="请求状态码"
                            ></el-table-column>
                            <el-table-column
                                    prop="paramJson"
                                    label="请求参数"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="respondStr"
                                    label="响应值"
                                ></el-table-column>
                        </el-table>
                    </el-row>
                </el-row>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "InterfaceTestPro",
        props: {
            interface: Object
        },
        data() {
            return {
                serviceUrl: this.$store.getters.remote,
                headers: [
                ],
                tableData:[
                ]
            }
        },
        methods: {
            addHeader: function () {
                this.headers.push({});
            },
            deleteHeader: function (item) {
                let index = this.headers.indexOf(item);
                if (index !== -1) {
                    this.headers.splice(index, 1);
                }
            },
            submitTest:function () {
                debugger;
                let id = this.interface.id;
                let address = this.serviceUrl;
                let headers = this.headers;
                this.$api.post(
                    "/api/test/batch",
                    {
                        id:id,
                        address:address,
                        times:10,
                        headers:headers
                    },
                    null,
                    (data)=>{
                        console.log(data);
                        this.tableData = data;

                    },
                    (data)=>{

                    }
                )

            }
        }


    }
</script>

<style scoped>

</style>
