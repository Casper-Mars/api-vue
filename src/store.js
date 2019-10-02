import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const TestNode = [];


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
            refPath: ""
        },
    ],
    menuList: {}
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
    },
    menuList() {
        return state.menuList;
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
            refPath: ""
        };
        state.headerList.push(target);
    },
    removeHeader(state, target) {
        let index = state.headerList.indexOf(target);
        if (index !== -1) {
            state.headerList.splice(index, 1);
        }
    },
    setMenuList(state, target) {
        state.menuList = target;
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
    },
    setMenuList(context, target) {
        context.commit("setMenuList", target);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
