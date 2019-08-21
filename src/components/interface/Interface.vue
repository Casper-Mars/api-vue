<template>
    <div>
        <el-tabs :tab-position="'left'">
            <el-tab-pane label="接口信息">
                <InterfaceInfo :interface="interface"/>
            </el-tab-pane>
            <el-tab-pane label="接口测试">
                <InterfaceTest :interface="interface"/>
            </el-tab-pane>
            <el-tab-pane v-if="this.$store.getters.login" label="智能测试">
                <InterfaceTestPro :interface="interface"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    import InterfaceInfo from "@/components/interface/InterfaceInfo";
    import InterfaceTest from "@/components/interface/InterfaceTest";
    import InterfaceTestPro from "./InterfaceTestPro";

    export default {
        name: "InterfaceView",
        components: {
            InterfaceInfo,
            InterfaceTest,
            InterfaceTestPro
        },
        props: {
            interface: Object
        },
        methods: {}
    }
</script>

<style scoped>

</style>
