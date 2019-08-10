<template>
    <el-row>
        <el-row><h4>{{ msg }}</h4></el-row>
        <el-row>
            <el-col>
                <el-table
                        :border="true"
                        :tree-props="{children:'children',hasChildren:'hasChildren'}"
                        :data="tableData"
                        row-key="id"
                        default-expand-all
                >
                    <el-table-column
                            prop="name"
                            label="参数名称"
                    ></el-table-column>
                    <el-table-column
                            prop="desc"
                            label="参数描述"
                    ></el-table-column>
                    <el-table-column
                            prop="type"
                            label="参数类型"
                    ></el-table-column>
                    <el-table-column
                            prop="isRequire"
                            label="是否必传"
                    ></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "ParamTable",
        props: {
            tableData: Array,
            msg: String
        }

    }
</script>

<style scoped>

</style>