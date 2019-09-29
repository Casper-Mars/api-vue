<template>
    <div>
        <h2>
            流程测试
        </h2>
        <div class="devi_line">分界线</div>
        <div>
            <el-button v-on:click="dialogVisible = true">添加接口</el-button>
        </div>
        <el-tree
                :data="data4"
                :props="defaultProps"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
<!--        <div class="process-list-box">-->
<!--            <el-card style="width: 600px;margin: 10px" v-for="(item, index) in processList">-->
<!--                <ProcessItem  v-bind:item="item"></ProcessItem>-->
<!--            </el-card>-->
<!--        </div>-->

<!--        <el-dialog-->
<!--                title="选择接口"-->
<!--                :visible.sync="dialogVisible"-->
<!--                width="30%">-->
<!--            <div>-->
<!--                <el-row class="tac">-->
<!--                    <el-col >-->
<!--                        <el-menu-->
<!--                                :unique-opened="true"-->
<!--                                default-active="1"-->
<!--                                class="el-menu-vertical-demo">-->
<!--                                <el-submenu v-for="(item, index) in showMenu" :index="String(index)">-->
<!--                                    <template slot="title">{{item.name}}</template>-->
<!--                                    <el-menu-item v-for="(child, cIndex) in item.children"-->
<!--                                                  @click="addProcess(child)"-->
<!--                                                  :index="String(cIndex)">-->
<!--                                        {{child.name}}-->
<!--                                    </el-menu-item>-->
<!--                                </el-submenu>-->
<!--                        </el-menu>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--            </div>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->



    </div>
</template>

<script type="text/jsx">
    import ProcessItem from  "../components/ProcessItem"
    import TreeNode from "../components/test/TreeNode";
    export default {
        name: "SequenceTestView",
        components: {
            ProcessItem,
            TreeNode
        },
        data() {
            return {
                dialogVisible: false,
                showMenu:[],
                processList: [],
                processIdSet: null,
                data4: [{
                    id: 1,
                    label: 'param',
                    children: [{
                        id: 2,
                        label: 'mobile',
                    },{
                        id: 3,
                        label: 'password',
                    },{
                        id: 4,
                        label: 'code',
                    },{
                        id: 5,
                        label: 'registerType',
                    },]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            addProcess (item) {
                if (this.processIdSet.has(item.interfaceId)) {
                    return
                }
                this.processList.push(item)
                this.processIdSet.add(item.interfaceId)
                console.log(this.processList)
            },
            renderContent:function (h, { node, data, store }) {
                debugger;
                let ref = data.children === null || data.children===undefined;
                return (
                    <TreeNode label={data.label} refEnable={ref}/>
                );
            }
        },
        mounted(){
            this.processIdSet = new Set()
            let menu = JSON.parse(localStorage.getItem('menu'))
            console.log(menu);
            this.showMenu = menu
        }
    }
</script>

<style scoped>
    .devi_line{
        padding: 0 20px 0;
        margin: 20px 0;
        line-height: 1px;
        border-left: 200px solid black;
        border-right: 200px solid black;
        text-align: center;
    }
    .process-list-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
