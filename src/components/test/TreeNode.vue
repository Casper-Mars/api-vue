<template>
    <el-card>
        <el-container>
            <el-header>
                <h2>#{{testNode.id}}----{{testNode.title}}({{testNode.requestUrl}})</h2>
            </el-header>
            <el-main>
                <el-container>
                    <el-header>
                        <h3>请求头:</h3>
                    </el-header>
                    <el-main>
                        <el-row v-for="(item,index) in testNode.headers" :key="index" type="flex" justify="space-around"
                                gutter="20"
                                style="padding: 10px">
                            <el-col :span="6">
                                <el-input v-model="item.name"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="item.value"></el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="primary" @click="addRef(testNode,item)">-></el-button>
                            </el-col>
                            <el-col :span="11">
                                <el-input v-model="item.refPath"></el-input>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-container>
                <el-container>
                    <el-header>
                        <h3>参数:</h3>
                    </el-header>
                    <el-main>
                        <el-tree
                                :data="testNode.param.tableData"
                                :props="{children: 'children',label: 'name'}"
                                node-key="name"
                                default-expand-all
                                :expand-on-click-node="false"
                                :render-content="renderContent"
                        ></el-tree>
                    </el-main>
                </el-container>
                <el-container>
                    <el-header>
                        <h3>返回值:</h3>
                    </el-header>
                    <el-main>
                        <json-viewer
                                :value="testNode.resp.jsonData"
                                :expand-depth=5
                                copyable
                                boxed
                                sor>
                        </json-viewer>
                    </el-main>
                </el-container>
            </el-main>
            <el-footer>
                <el-button type="danger" round @click="removeNode(testNode)">删除</el-button>
            </el-footer>
        </el-container>
        <!--设置参数的值-->
        <el-dialog
                title="设置值"
                :visible.sync="choiceTestNodeParamValue"
        >
            <el-input v-model="curData.value"/>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="choiceTestNodeParamValue = false">取 消</el-button>
                        <el-button type="primary" @click="choiceTestNodeParamValue=false;curData={};">确 定</el-button>
                    </span>
        </el-dialog>
    </el-card>

</template>

<script type="text/jsx">
    export default {
        name: "TestNode",
        props: {
            label: String,
            refEnable: Boolean,
            addRef: Function,
            addValue: Function,
            removeNode: Function,
            testNode: Object
        },
        data() {
            return {
                choiceTestNodeParamValue: false,
                curData: {},
                parent: {
                    path: "#1->sessionId"
                }
            }
        },
        methods: {
            renderContent: function (h, {node, data, store}) {
                let ref = data.children === null || data.children === undefined;
                return (
                    <span
                        style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                  <span>{data.name}:{data.value}</span>
                </span>
                <span>
                  <el-button style="font-size: 12px;" type="text">{data.refPath}</el-button>
                  <el-button style="font-size: 12px;" type="text"
                             on-click={() => this.setValue(data)}>添加值</el-button>
                    <el-button style="font-size: 12px;" type="text"
                               on-click={() => this.addRef(this.testNode, data)}>添加引用</el-button>
                <el-button style="font-size: 12px;" type="text"
                           on-click={() => this.clearRef(data)}>删除引用</el-button>
                </span>
            </span>
                );
            },
            setValue(data) {
                this.curData = data;
                this.choiceTestNodeParamValue = true;
            },
            clearRef(data) {
                data.refPath = "";
            }

        }
    }
</script>

<style scoped>

</style>