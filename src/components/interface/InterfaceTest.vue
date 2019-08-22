<template>
    <div>
        <el-container>
            <el-main>
                <el-row>
                    <h3>测试接口</h3>
                </el-row>
                <el-form label-width="100px">
                    <el-form-item label="URL">
                        <div class="flex-box">
                            <el-input v-model="interface.requestUrl"></el-input>
                            <el-button type="primary" v-on:click="sendRequest">测试</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="请求方式">
                        {{interface.requestMethod}}
                    </el-form-item>
                    <el-form-item label="header参数">
                        <div class="header-box">
                            <el-row v-for="(item,index) in header" :gutter="10" style="width: 100%">
                                <el-col :span="4">
                                    <el-input disabled="" v-model="item.name"></el-input>
                                </el-col>
                                <el-col :span="14">
                                    <el-input v-model="item.value"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="danger" @click="removeHeaders(item)" icon="el-icon-delete"
                                               circle></el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form-item>
                    <el-form-item label="请求参数">
                        <el-input
                                type="textarea"
                                :autosize="rows"
                                :value="this.$util.formatJson(interface.param.jsonData)"
                                v-model="param"
                        />
                    </el-form-item>
                    <el-form-item v-if="showResult">
                        <json-viewer
                                :value="res"
                                :expand-depth=5
                                copyable
                                boxed
                                sor>
                        </json-viewer>
                    </el-form-item>
                </el-form>

            </el-main>
        </el-container>
    </div>
</template>

<script>
    import JsonTestPenal from "@/components/interface/JsonTestPenal";

    export default {
        name: "InterfaceTest",
        components: {
            JsonTestPenal
        },
        props: {
            interface: Object,
        },
        data() {
            return {
                showResult: false,
                param: null,
                res: null,
                header: [
                    {
                        name: "sessionId",
                        value: ""
                    },
                    {
                        name: "content-type",
                        value: ""
                    },
                    {
                        name: "token",
                        value: ""
                    },
                ]

            }
        },
        methods: {
            removeHeaders: function (header) {
                let index = this.header.indexOf(header);
                if (index !== -1) {
                    this.header.splice(index, 1);
                }
            },
            sendRequest() {
                let url = localStorage.getItem("remote") + this.interface.requestUrl
                let param
                if (this.param) {
                    param = JSON.parse(this.param)
                }
                let data = new FormData()
                for(let key in param) {
                    data.append(key, param[key])
                }

                let headers = {}
                for (let i in this.header) {
                    let item = this.header[i]
                    let val = item.value
                    if (val.trim() !== "") {
                        headers[item.name] = val
                    }
                }
                debugger;
                this.$api.post(
                    url,
                    data,
                    headers,
                    (data) => {
                        this.$message.success("请求成功")
                        this.res = data
                        this.showResult = true
                    },
                    (data) => {
                        this.$message.error("请求失败")
                    }
                )
            }
        },
        computed: {
            rows: function () {
                let rows = 7;
                this.param = this.$util.formatJson(this.interface.param.jsonData)
                if (this.interface.param.jsonData !== null) {
                    rows = this.interface.param.jsonData.length;
                }
                return {
                    minRows: 2,
                    maxRows: rows
                };
            }
        }
    }

</script>

<style scoped>
    .flex-box{
        display: flex;
        flex-wrap: nowrap;
    }
    .header-box{
        display: inline-flex;
        flex-wrap: wrap;
    }
</style>
