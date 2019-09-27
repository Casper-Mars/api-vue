<template>
    <el-container>
        <el-header>
            <h3>#{{no}}-{{interface.name}}-{{interface.path}}</h3>
        </el-header>
        <el-container>
            <el-col v-for="(item,index) in interface.headers">
                <el-row>
                    <el-col>{{item.name}}</el-col>
                    <el-col>{{item.value}}</el-col>
                </el-row>
            </el-col>
            <el-input
                    type="textarea"
                    :autosize="rows"
                    :value="this.$util.formatJson(interface.resp)"
                    v-model="param"
            />
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "TestNode",
        props:{
            no:Number,
            name:String,

        },
        data(){
            return{
                interface:{
                    name:"测试接口",
                    path:"/api/test",
                    headers:[
                        {
                            name:"sessionId",
                            value:"123123132"
                        },
                    ],
                    param:{
                        account:"",
                        password:""
                    },
                    resp:"{\n" +
                        "  \"code\": \"\",\n" +
                        "  \"message\": \"\",\n" +
                        "  \"object\": {\n" +
                        "    \"sessionId\": \"\",\n" +
                        "    \"mobilePhone\": \"\",\n" +
                        "    \"hasPaymentPwd\": \"\",\n" +
                        "    \"alias\": \"\",\n" +
                        "    \"imCould\": \"\",\n" +
                        "    \"sign\": \"\",\n" +
                        "    \"userId\": \"\",\n" +
                        "    \"isAppraisal\": \"\",\n" +
                        "    \"hasBindWeixin\": \"\"\n" +
                        "  }\n" +
                        "}"
                }
            }
        }
    }
</script>

<style scoped>

</style>