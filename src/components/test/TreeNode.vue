<template>
    <!--    <div style="height: 50px">-->
    <!--        <el-row type="flex" justify="space-between">-->
    <!--            <el-col :span="12">-->
    <!--                <el-row type="flex">-->
    <!--                    <el-col :span="6">-->
    <!--                        <span>{{label}}</span>-->
    <!--                    </el-col>-->
    <!--                </el-row>-->
    <!--            </el-col>-->
    <!--            <el-col :span="12">-->
    <!--                <el-row type="flex" justify="end">-->
    <!--                    <el-col v-if="refEnable" :span="14">-->
    <!--                        <span>aaaaaa</span>-->
    <!--                    </el-col>-->
    <!--                    <el-col v-if="refEnable" :span="4">-->
    <!--                        <span>-></span>-->
    <!--                    </el-col>-->
    <!--                </el-row>-->
    <!--            </el-col>-->
    <!--        </el-row>-->
    <!--    </div>-->
    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{{label}}</span>
            </span>
            <span v-if="refEnable">
              <el-button style="font-size: 12px;" type="text">#1->user_sessionId</el-button>
              <el-button style="font-size: 12px;" type="text">----></el-button>
            </span>
          </span>
</template>

<script>
    export default {
        name: "TestNode",
        props: {
            label: String,
            refEnable: Boolean
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