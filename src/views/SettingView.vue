<template>
    <div id="setting">
        <el-row>
            <el-row>
                <el-col>
                    <h3>请求头header设置</h3>
                </el-col>
                <el-col>
                    <el-button type="primary" @click="addHeaders">添加请求头</el-button>
                </el-col>
            </el-row>
            <el-row v-for="(item,index) in formModel.headers" style="margin: 10px" :gutter="10">
                <el-col :span="4">
                    <el-input v-model="item.name"></el-input>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="item.value"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="danger" @click="removeHeaders(item)" icon="el-icon-delete" circle></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-button v-on:click="saveHeaders">保存</el-button>
            </el-row>
        </el-row>

        <el-row>
            <el-row>
                <el-col>
                    <h3>设置服务器地址</h3>
                </el-col>
            </el-row>
            <el-row>
                <div class="flex-box">
                    <el-col :span="4">
                        <el-input v-model="remote"></el-input>
                    </el-col>
                    <el-button v-on:click="saveRemote">保存</el-button>
                </div>
            </el-row>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "SettingView",
        data() {
            return {
                remote: '',
                formModel: {
                    headers: [
                        {
                            name: "sessionId",
                            value: "1"
                        },
                        {
                            name: "content-type",
                            value: "1"
                        },
                        {
                            name: "token",
                            value: "1"
                        },
                    ]
                }
            }
        },
        methods: {
            addHeaders: function () {
                if (this.formModel.headers === null) {
                    this.formModel.headers = [{
                        name: "",
                        value: ""
                    }]
                } else {
                    this.formModel.headers.push({
                        name: '',
                        value: ''
                    })
                }
            },
            removeHeaders: function (header) {
                localStorage.getItem("headers");
                let index = this.formModel.headers.indexOf(header);
                if (index !== -1) {
                    this.formModel.headers.splice(index, 1);
                }
            },
            saveHeaders: function () {
                let s = JSON.stringify(this.formModel.headers);
                localStorage.setItem("headers", s);
            },
            initHeaders: function () {
                debugger;
                let item = localStorage.getItem("headers");
                let parse = JSON.parse(item);
                this.formModel.headers = parse;
            },
            saveRemote() {
                localStorage.setItem("remote", this.remote)
            },

            initRemote() {
                this.remote = localStorage.getItem("remote")
            }
        },
        mounted() {
            this.initRemote();
            this.initHeaders();
        }


    }
</script>

<style scoped>
    .flex-box {
        display: flex;
    }
</style>
