<template>
    <div>
        <h2>
            流程测试
        </h2>
        <div class="devi_line">分界线</div>
        <div style="padding: 10px">
            <el-button v-on:click="choiceInterface = true" style="margin: 5px">添加接口</el-button>
            <el-button style="margin: 5px;" @click="showNodeList">启动测试</el-button>
        </div>
        <div class="devi_line">分界线</div>
        <!--        <el-collapse>-->
        <!--            <el-collapse-item :title="item.title" v-for="(item,index) in testNodeList">-->
        <!--                <TreeNode :test-node="item" :add-ref="addRef"/>-->
        <!--            </el-collapse-item>-->
        <!--        </el-collapse>-->
        <el-row v-for="(item,index) in testNodeList" style="margin: 5px">
            <TreeNode :test-node="item" :add-ref="addRef" :remove-node="removeNode"/>
        </el-row>
        <!--选择接口-->
        <el-dialog
                title="选择接口"
                :visible.sync="choiceInterface"
                width="30%">
            <div>
                <el-row class="tac">
                    <el-col>
                        <el-menu
                                :unique-opened="true"
                                default-active="1"
                                class="el-menu-vertical-demo">
                            <el-submenu v-for="(item, index) in showMenu" :index="String(index)">
                                <template slot="title">{{item.name}}</template>
                                <el-menu-item v-for="(child, cIndex) in item.children"
                                              @click="addProcess(child)"
                                              :index="String(cIndex)">
                                    {{child.name}}
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="choiceInterface = false">取 消</el-button>
                        <el-button type="primary" @click="choiceInterface = false">确 定</el-button>
                    </span>
        </el-dialog>
        <!--选择前置的测试节点-->
        <el-dialog
                title="选择前置测试节点"
                :visible.sync="choiceTestNode"
        >
            <div>
                <el-table
                        :data="tmpTestNodeList"
                >
                    <el-table-column
                            prop="id"
                            label="id"
                    ></el-table-column>
                    <el-table-column
                            prop="title"
                            label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="showSelectNodeResp(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="choiceTestNode = false">取 消</el-button>
                        <el-button type="primary" @click="choiceTestNode = false">确 定</el-button>
                    </span>
        </el-dialog>
        <!--选择前置测试节点的数据-->
        <el-dialog
                title="选择前置测试节点的数据"
                :visible.sync="choiceTestNodeParam"
        >
            <div>
                <el-table
                        :border="true"
                        :tree-props="{children:'children',hasChildren:'hasChildren'}"
                        :data="curSelectNodeResp"
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
                            fixed="right"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="selectRefParam(scope.row)" v-if="scope.row.children===null">选择
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="choiceTestNodeParam = false">取 消</el-button>
                        <el-button type="primary" @click="choiceTestNodeParam = false">确 定</el-button>
                    </span>
        </el-dialog>
        <!--序列测试面板-->
        <el-dialog
                title="序列测试"
                :visible.sync="seqTestPanel"
        >
            <TestStep :test-node-list="testNodeList"/>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="seqTestPanel = false">取 消</el-button>
                        <el-button type="primary" @click="seqTestPanel = false">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script>
    import TreeNode from "../components/test/TreeNode";
    import util from "../util/UtilTool"
    import TestStep from "../components/test/TestStep";

    export default {
        name: "SequenceTestView",
        components: {
            TreeNode,
            TestStep
        },
        data() {
            return {
                choiceInterface: false,
                choiceTestNode: false,
                choiceTestNodeParam: false,
                choiceTestNodeParamValue: false,
                showMenu: [],
                processIdSet: null,
                testNodeList: [],
                curTestNodeParam: {},
                curTestNode: {},
                curSelectNodeResp: [],
                curSelectNode: {},
                tmpTestNodeList: [],
                seqTestPanel: false,
            }
        },
        methods: {
            addProcess(item) {
                if (this.processIdSet.has(item.interfaceId)) {
                    return
                }
                this.processIdSet.add(item.interfaceId);
                this.$api.get(
                    "/api/interface",
                    {id: item.interfaceId},
                    null,
                    (data) => {
                        console.log(data);
                        util.getCurrentInterface(data);
                        let target = data.data;
                        target['headers'] = this.$store.getters.headerList.slice(0);
                        target['id'] = item.interfaceId;
                        /*处理参数，添加refPath属性*/
                        this.addRefPathPropToParam(target.param.tableData);
                        this.testNodeList.push(target);
                        this.choiceInterface = false;
                    },
                    (data) => {

                    }
                );
            },
            addRef(node, item) {
                let children = item.children;
                if (children !== undefined && children !== null) {
                    return;
                }
                this.curTestNode = node;
                this.curTestNodeParam = item;
                this.tmpTestNodeList = [];
                let testNodeList = this.testNodeList;
                for (let i = 0; i < testNodeList.length; i++) {
                    if (testNodeList[i].id !== node.id) {
                        this.tmpTestNodeList.push(testNodeList[i]);
                    } else {
                        break;
                    }
                }
                this.choiceTestNode = true;
            },
            addRefPathPropToParam(params) {
                if (params === null) {
                    return;
                }
                for (let i = 0; i < params.length; i++) {
                    let children = params.children;
                    if (children === undefined || children === null) {
                        params[i].refPath = "";
                        params[i].value = "";
                        continue;
                    }
                    this.addRefPathPropToParam(children);
                }
            },
            showSelectNodeResp(interfaceNode) {
                this.curSelectNode = interfaceNode;
                this.curSelectNodeResp = interfaceNode.resp.tableData;
                this.choiceTestNodeParam = true;
            },
            selectRefParam(node) {
                let src = this.curSelectNodeResp;
                let selectNodeId = this.curSelectNode.id;
                let selectNodeName = this.curSelectNode.title;
                let pre = "#" + selectNodeName + "(" + selectNodeId + ")->";
                let path = null;
                for (let i = 0; i < src.length; i++) {
                    path = this.findParamPath(node.id, src[i]);
                    if (path !== null) {
                        this.curTestNodeParam.refPath = pre + path;
                        break;
                    }
                }
                this.choiceTestNode = false;
                this.choiceTestNodeParam = false;
            },
            findParamPath(id, src) {
                if (src === null) {
                    return null;
                }
                if (src.id === id) {
                    return src.name;
                }
                let children = src.children;
                if (children !== null) {
                    for (let i = 0; i < children.length; i++) {
                        let path = this.findParamPath(id, children[i]);
                        if (path === null) {
                            continue;
                        }
                        return src.name + "->" + path;
                    }
                } else {
                    return null;
                }
            },
            removeNode(node) {
                let index = this.testNodeList.indexOf(node);
                if (index !== -1) {
                    this.testNodeList.splice(index, 1);
                }
                this.processIdSet.delete(node.id);
            },
            showNodeList() {
                this.seqTestPanel = true;
            }
        },
        mounted() {
            this.processIdSet = new Set();
            let menu = JSON.parse(localStorage.getItem('menu'));
            this.showMenu = menu
        }
    }
</script>

<style scoped>
    .devi_line {
        padding: 0 20px 0;
        margin: 20px 0;
        line-height: 1px;
        border-left: 200px solid black;
        border-right: 200px solid black;
        text-align: center;
    }

    .process-list-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
