import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const TestNode = [
    //  {
    //     id: 1,
    //     title: "登录",
    //     requestUrl: "/api/auth/login",
    //     headers: [
    //         {
    //             name: "sessionId",
    //             value: "",
    //             refPath: ""
    //         }
    //     ],
    //     param: {
    //         isJson: true,
    //         isArray: false,
    //         jsonData: '{name: "name", desc: "姓名", type: "String",}',
    //         tableData: [
    //             {
    //                 name: "name",
    //                 desc: "姓名",
    //                 type: "String",
    //                 isRequire: true,
    //                 isArray: false,
    //                 isEntity: false,
    //                 children: [],
    //             },
    //             {
    //                 name: "age",
    //                 desc: "年龄",
    //                 type: "Integer",
    //                 isArray: false,
    //                 isRequire: true,
    //                 isEntity: false,
    //                 children: [],
    //             },
    //             {
    //                 name: "class",
    //                 desc: "类别",
    //                 type: "Integer[]",
    //                 isArray: true,
    //                 isRequire: true,
    //                 isEntity: false,
    //                 children: [],
    //             },
    //         ],
    //     },
    //     resp: {
    //         isJson: true,
    //         isArray: true,
    //         jsonData: {
    //             "code": "200",
    //             "msg": "成功",
    //             "object": {
    //                 "user_sessionId": "1231312",
    //                 "state": "1"
    //             },
    //         },
    //         tableData: [
    //         ]
    //     }
    // },
    // {
    //     id: 2,
    //     title: "订单列表",
    //     requestUrl: "/api/order/list",
    //     headers: [
    //         {
    //             name: "sessionId",
    //             value: "",
    //             refPath: "#1->object->user_sessionId"
    //         }
    //     ],
    //     param: [
    //         {
    //             name: "state",
    //             value: "",
    //             refPath: "#1->object->state"
    //         },
    //         {
    //             name: "pageSize",
    //             value: "10",
    //             refPath: ""
    //         },
    //         {
    //             name: "pageNum",
    //             value: "1",
    //             refPath: ""
    //         }
    //     ],
    //     resp: {
    //         isJson: true,
    //         isArray: true,
    //         jsonData: {
    //             "code": "200",
    //             "msg": "成功",
    //             "object": {
    //                 "user_sessionId": "1231312",
    //                 "state": "1"
    //             },
    //         },
    //         tableData: [
    //         ]
    //     }
    // }


]


const state = {
    isLogin: false,
    remote: "/remote",
    curTab: '1',
    testNodeList: TestNode,
    tabList: [
        {
            name: '1',
            title: '主页',
            content: {},
            deleteAble: false,
            isInterface: false
        },
        {
            name: '2',
            title: '设置',
            content: {},
            deleteAble: false,
            isInterface: false
        },
        {
            name: '3',
            title: '流程测试',
            content: {},
            deleteAble: false,
            isInterface: false
        },
    ],
    headerList: [
        {
            name: "sessionId",
            value: "",
            refPath:""
        },
    ]
};

const getters = {
    login() {
        return state.isLogin;
    },
    tabList() {
        return state.tabList;
    },
    curTab() {
        return state.curTab;
    },
    testNodeList() {
        return state.testNodeList;
    },
    headerList() {
        return state.headerList;
    }
};
const mutations = {
    setInterface(state, target) {
        /*判断标签是否存在*/
        let tabs = state.tabList;
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].name === target.id) {
                return;
            }
        }
        let tmp = {
            name: target.id,
            title: target.title,
            content: target,
            deleteAble: true,
            isInterface: true
        };
        state.tabList.push(tmp);
        state.curTab = target.id;
    },
    openDev(state) {
        state.isLogin = state;
    },
    removeTab(state, target) {
        let tabs = state.tabList;
        let activeName = state.curTab;
        let removeTarget;
        if (activeName === target) {
            tabs.forEach((tab, index) => {
                if (tab.name === target) {
                    removeTarget = tab;
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }
        if (!removeTarget.deleteAble) {
            return;
        }
        state.curTab = activeName;
        state.tabList = tabs.filter(tab => tab.name !== target);
    },
    addTestNode(state, target) {
        state.testNodeList.push(target);
    },
    addHeader(state) {
        let target = {
            name: "",
            value: "",
            refPath:""
        };
        state.headerList.push(target);
    },
    removeHeader(state, target) {
        let index = state.headerList.indexOf(target);
        if (index !== -1) {
            state.headerList.splice(index, 1);
        }
    }


};
const actions = {
    updateInterface(context, target) {
        context.commit("setInterface", target);
    },
    removeTab(context, target) {
        context.commit("removeTab", target);
    },
    addTestNode(context, target) {
        context.commit("addTestNode", target);
    },
    addHeader(context) {
        context.commit("addHeader");
    },
    removeHeader(context, target) {
        context.commit("removeHeader", target);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
