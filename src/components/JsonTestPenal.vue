<template>
    <el-row>
        <el-row><h4>{{msg}}</h4></el-row>
        <el-row>
            <el-col>
                <el-input
                        type="textarea"
                        v-model="jsonData"
                        :autosize="{minRows: 2, maxRows: 7}"
                        :readonly="true"
                />
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "JsonTestPenal",
        props:{
            msg:String,
            jsonData:String
        }
    }
</script>

<style scoped>

</style>