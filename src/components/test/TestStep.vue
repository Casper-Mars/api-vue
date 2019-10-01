<template>
    <el-container direction="vertical">
        <el-container>
            <el-main>
                <el-steps :active="curActiveStep">
                    <el-step v-for="(item,index) in testNodeList" :key="index" :title="item.title">
                    </el-step>
                </el-steps>
            </el-main>
        </el-container>
        <el-container v-if="isComplete">
            <el-main v-if="isSuccess">
                <el-alert type="success" title="测试完成" :closable="false"></el-alert>
            </el-main>
            <el-main v-else>
                <el-alert :title="errorTitle" type="error" :closable="false"></el-alert>
                <json-viewer
                        :value="errorResp"
                        :expand-depth=5
                        copyable
                        boxed
                        sor>
                </json-viewer>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "TestStep",
        data() {
            return {
                curActiveStep: 1,
                isSuccess: false,
                isComplete: false,
                errorTitle: "测试中断，xx接口测试出错",
                errorResp: {code: "200", msg: "成功", object: {}},
            }
        },
        props: {
            testNodeList: Array,
        }
    }
</script>

<style scoped>

</style>