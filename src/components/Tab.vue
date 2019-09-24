<template>
    <el-tabs v-model="curTab" type="card" closable @tab-remove="">
        <el-tab-pane
            v-for="(item,index) in editableTabs2"
            :key="index"
            :label="item.title"
            :name="item.name"
        >
            {{item.content}}
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "Tab",
        data(){
            return {
                curTab:1,
                editableTabs2: [{
                    title: '主页',
                    name: 1,
                    content: 'Tab 1 content'
                }, {
                    title: '设置',
                    name: 2,
                    content: 'Tab 2 content'
                }],
            }
        }
    }
</script>

<style scoped>

</style>