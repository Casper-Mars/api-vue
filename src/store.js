import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const TestNode = [
    {
        name: "登录",
        path: "/api/auth/login",
        headers: [
            {
                name: "sessionId",
                value: "",
                refPath: ""
            }
        ],
        param: [
            {
                name: "param",
                refPath: "",
                value: "",
                children: [
                    {
                        name: "phone",
                        refPath: "",
                        value: ""
                    },
                    {
                        name: "password",
                        refPath: "",
                        value: ""
                    }
                ]
            }
        ],
        resp: {
            "code": "200",
            "msg": "成功",
            "object": {
                "user_sessionId": "1231312",
                "state": "1"
            }
        }
    },
    {
        name: "订单列表",
        path: "/api/order/list",
        headers: [
            {
                name: "sessionId",
                value: "",
                refPath: "#1->object->user_sessionId"
            }
        ],
        param: [
            {
                name: "state",
                value: "",
                refPath: "#1->object->state"
            },
            {
                name: "pageSize",
                value: "10",
                refPath: ""
            },
            {
                name: "pageNum",
                value: "1",
                refPath: ""
            }
        ],
        resp: {
            "code": "200",
            "msg": "成功",
            "object": {
                "user_sessionId": "1231312"
            }
        }
    }

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
    }


};
const mutations = {
    setInterface(state, target) {
        /*判断标签是否存在*/
        let tabs = state.tabList;
    debugger;
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
    }

};
const actions = {
    updateInterface(context, target) {
        context.commit("setInterface", target);
    },
    removeTab(context, target) {
        context.commit("removeTab", target);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
