<template xmlns:el-footer="http://www.w3.org/1999/html">
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
        <el-footer>
            <el-button type="primary" @click="doTestSequence">测试</el-button>
        </el-footer>
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
        },
        methods: {
            doTestSequence: function () {
                let testNodeList = this.testNodeList;
                this.isComplete = false;
                this.isSuccess = false;
                try {
                    for (let i = 0; i < testNodeList.length; i++) {
                        this.curActiveStep = i + 1;
                        this.doTest(testNodeList[i]);
                    }
                } catch (e) {
                    this.isSuccess = false;
                    this.errorTitle = e;
                } finally {
                    this.isComplete = true;
                }

            },
            doTest: async function (testNode) {
                let id = testNode.id;
                let address = localStorage.getItem("remote");
                let headers = this.getHeader(testNode);
                let params = this.getParam(testNode);
                let data = {
                    id: id,
                    address: address,
                    times: 1,
                    headers: headers,
                    params: params
                };
            debugger
                let res = await this.$axios.post("/api/test/one", data);
                let resp = res.data;
                if (resp.code === 200 && resp.data.stateCode === "200") {
                    testNode.resp.jsonData = JSON.parse(res.data.data.respondStr);
                } else {
                    throw "测试节点：" + testNode.id + " 请求失败";
                }
                console.log(res);
            },
            getHeader: function (testNode) {
                let headers = testNode.headers;
                let header = [];
                for (let i = 0; i < headers.length; i++) {
                    let tmp = {};
                    tmp['name'] = headers[i].name;
                    tmp['value'] = this._getParamValue(headers[i]);
                    header.push(tmp);
                }
                return header;
            },
            _getHeaderValue(header) {
                let value = header.value;
                let refPath = header.refPath;
                if (refPath === null) {
                    return value;
                }
                return this._getRefNodeValue(refPath);
            },
            getParam: function (testNode) {
                /*获取存放参数的对象*/
                let tableData = testNode.param.tableData;
                /*遍历参数对象*/
                return this._getAllParam(tableData);
            },
            _getAllParam(paramList) {
                if (paramList === null) {
                    return null;
                }
                let paramMap = {};
                for (let i = 0; i < paramList.length; i++) {
                    let temp = paramList[i];
                    let children = temp.children;
                    let value = '';
                    if (children === null) {
                        value = this._getParamValue(temp);
                    } else {
                        value = this._getAllParam(children);
                    }
                    if (value === null) {
                        continue;
                    }
                    paramMap[temp.name] = value;
                }
                return paramMap;
            },
            _getParamValue(refNode) {
                let refPath = refNode.refPath;
                let value = refNode.value;
                if (refPath === null || refPath === "") {
                    return value;
                }
            debugger;

                /*获取目标测试节点的返回值*/
                return this._getRefNodeValue(refPath);
            },
            _getRefNodeValue(refPath) {
            debugger;
                /*切割出参数参照链*/
                let propList = refPath.split("->");
                /*分解出参照的id*/
                let id = propList.splice(0, 1)[0];
                let start = id.indexOf("(");
                let end = id.indexOf(")");
                id = id.substring(start + 1, end);

                /*获取目标测试节点*/
                let targetTestNode = this._getTestNodeById(id);
                /*如果目标测试节点不存在，抛出异常并提示用户节点不存在*/
                if (targetTestNode === null) {
                    throw "节点：" + id + " 不存在";
                }
                /*遍历参数参照*/
                let tmp = targetTestNode.resp.jsonData;
                for (let i = 0; i < propList.length; i++) {
                    tmp = tmp[propList[i]];
                    if (tmp === null) {
                        /*抛出异常，提示用户该节点取值失败*/
                        throw "参照的节点：" + id + " 的参数：" + propList[i] + " 不存在值";
                    }
                }
                return tmp;
            },
            _getTestNodeById(id) {
                let testNodeList = this.testNodeList;
                for (let i = 0; i < testNodeList.length; i++) {
                    if (testNodeList[i].id === id) {
                        return testNodeList[i];
                    }
                }
                return null;
            }

        }
    }
</script>

<style scoped>

</style>