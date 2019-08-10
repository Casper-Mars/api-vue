<template>
    <el-row>
        <el-row><h4>{{msg}}</h4></el-row>
        <el-row>
            <el-col>
                <el-input
                        type="textarea"
                        v-model="jsonData"
                        :autosize="rows"
                        :readonly="readOnly"
                />
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

        methods: {},
        computed: {
            rows: function () {
                let rows = 7;
                if (this.jsonData !== null) {
                    let tmp = this.jsonData.split("\n");
                    rows = tmp.length;
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

</style>