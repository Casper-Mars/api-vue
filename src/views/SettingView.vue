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
        </el-row>


    </div>
</template>

<script>
    export default {
        name: "SettingView",
        data() {
            return {
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
                this.formModel.headers.push({
                    name: '',
                    value: ''
                })
            },
            removeHeaders: function (header) {
                let index = this.formModel.headers.indexOf(header);
                if (index !== -1) {
                    this.formModel.headers.splice(index, 1);
                }
            }
        }


    }
</script>

<style scoped>

</style>