<template>
    <el-tabs v-model="this.$store.getters.curTab" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item,index) in this.$store.getters.tabList"
            :key="index"
            :label="item.title"
            :name="item.name"
        >
            <div v-if="item.name==='1'">
                <IndexPage/>
            </div>
            <div v-else-if="item.name === '2'">
                <SettingView/>
            </div>
            <div v-else>
                <InterfaceView :interface="item.content"/>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import IndexPage from "../views/IndexPage";
    import SettingView from "../views/SettingView";
    import InterfaceView from "../views/InterfaceView";
    export default {
        name: "Tab",
        components: {InterfaceView, SettingView, IndexPage},
        modules:{
          IndexPage,
          SettingView,
          InterfaceView
        },
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
        },
        methods:{
            removeTab(targetName){
                this.$store.dispatch("removeTab",targetName);
            }
        }
    }
</script>

<style scoped>

</style>