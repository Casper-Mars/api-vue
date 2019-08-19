<template>
    <el-row>
        <el-row><h4>{{msg}}</h4></el-row>
        <el-row>
            <el-col>
                <json-viewer
                        :value="jsonData"
                        :expand-depth=5
                        copyable
                        boxed
                        sor>
                </json-viewer>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "JsonTestPenal",
        props: {
            msg: String,
            jsonData: String,
            readOnly:Boolean
        },

        methods: {}
    }
</script>

<style scoped>

</style>
