<template>
    <div>
        <el-container>
            <el-main>
                <el-row>
                    <h3>测试接口</h3>
                </el-row>
                <el-form label-width="100px">
                    <el-form-item label="URL">
                        <el-input v-model="interface.requestUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式">
                        <el-input v-model="interface.requestMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="header参数">
                        <el-row v-for="(item,index) in header" :gutter="10">
                            <el-col :span="4">
                                <el-input v-model="item.name"></el-input>
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="item.value"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="danger" @click="removeHeaders(item)" icon="el-icon-delete"
                                           circle></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="请求参数">
                        <JsonTestPenal :json-data="this.$util.formatJson(interface.resp.jsonData)"/>
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
                header: [
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


    }
</script>

<style scoped>

</style>