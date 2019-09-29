<template>

    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
        <span>
            <span>{{label}}</span>
        </span>
        <span v-if="refEnable" >
            <el-input disabled>aaaa</el-input>
            <el-button  type="primary">-></el-button>
        </span>
    </span>

</template>

<script>
    export default {
        name: "TestNode",
        props: {
            label: String,
            refEnable:Boolean
        },
        data() {
            return {
                parent: {
                    path: "#1->sessionId"
                }
            }
        }
    }
</script>

<style scoped>

</style>