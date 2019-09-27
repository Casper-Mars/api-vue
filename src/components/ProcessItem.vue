<template>
    <div id="processItem">
        <div class="interface-box">
            <div class="interface-info-box">
                {{processItem.title}}
                {{processItem.id}}
            </div>
            <el-card>
                请求参数
                <div class="interface-param-box">
                    <el-card class="box-card" v-for="item in processItem.param.tableData">
                        <div class="interface-result-item">
                            <span style="width: 100%">
                                {{item.name}}
                            </span>
                            <el-button size="mini">选择</el-button>
                            <el-input :name="item.name"></el-input>
                        </div>
                    </el-card>
                </div>
            </el-card>
            <el-card>
                请求返回值
                <div class="interface-result-box">
                    <el-card class="result-card" v-for="item in processItem.resp.tableData[2].children">
                        <div class="interface-result-item">
                            <span style="width: 100%">{{item.name}}</span>
                        </div>
                    </el-card>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import util from '../util/UtilTool'
    export default {
        name: "ProcessItem",
        props:{
            item: null
        },
        data() {
            return {
                processItem: {}
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                console.log(this.item)
                this.$api.get(
                    "/api/interface",
                    {id: this.item.interfaceId},
                    null,
                    (data) => {
                        let tmp = util.getCurrentInterface(data, this.item.interfaceId)
                        console.log(tmp)
                        this.processItem = tmp
                    },
                    (data) => {

                    }
                );
            }
        }
    }
</script>

<style scoped>
    .interface-param-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .interface-result-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .interface-result-item{
        display: flex;
        width: 70px;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .el-input{
        width: 100%;
    }
    .result-card{
        width: 120px
    }
    #processItem{
        font-size: 14px;
        margin: 10px;
    }
</style>
