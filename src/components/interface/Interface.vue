<template>
    <div>
        <el-tabs :tab-position="'left'">
            <el-tab-pane label="接口信息">
                <InterfaceInfo :interface="interface"/>
            </el-tab-pane>
            <el-tab-pane label="接口测试">
                <InterfaceTest :interface="interface"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    import InterfaceInfo from "@/components/interface/InterfaceInfo";
    import InterfaceTest from "@/components/interface/InterfaceTest";

    export default {
        name: "InterfaceView",
        components: {
            InterfaceInfo,
            InterfaceTest
        },
        props: {
            interface: Object
        },
        methods: {}
    }
</script>

<style scoped>

</style>
