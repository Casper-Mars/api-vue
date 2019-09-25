import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isLogin: false,
    remote: "/remote",
    curTab:'1',
    tabList: [
        {
            name: '1',
            title: '主页',
            content: {}
        },
        {
            name: '2',
            title: '设置',
            content: {}
        },
        /*{
            name: 3,
            title: '测试接口',
            content: {
                id: "123123",
                title: "测试接口",
                requestMethod: "post",
                requestUrl: "/api/member/list",
                contentType: "application/json",
                param: {
                    isJson: true,
                    isArray: false,
                    jsonData: {"name": "name", "desc": "姓名", "type": "String"},
                    tableData: [
                        {
                            id: 10,
                            name: "param",
                            desc: "学生信息",
                            isRequire: "必传",
                            type: "StudentDTO",
                            isArray: false,
                            isEntity: true,
                            children: [
                                {
                                    id: 1,
                                    name: "name",
                                    desc: "姓名",
                                    isRequire: "必传",
                                    type: "String",
                                    isArray: false,
                                    isEntity: false,
                                    children: [],
                                },
                                {
                                    id: 2,
                                    name: "age",
                                    desc: "年龄",
                                    isRequire: "必传",
                                    type: "Integer",
                                    isArray: false,
                                    isEntity: false,
                                    children: [],
                                },
                                {
                                    id: 3,
                                    name: "teacher",
                                    desc: "导师信息",
                                    isRequire: "必传",
                                    type: "TeacherDTO",
                                    isArray: false,
                                    isEntity: true,
                                    children: [
                                        {
                                            id: 4,
                                            name: "name",
                                            desc: "姓名",
                                            isRequire: "必传",
                                            type: "String",
                                            isArray: false,
                                            isEntity: false,
                                            children: [],
                                        },
                                    ]
                                },
                            ]
                        },
                    ],
                },
                resp: {
                    isJson: true,
                    isArray: false,
                    jsonData: {"name": "name", "desc": "姓名", "type": "String"},
                    tableData: [
                        {
                            id: 1,
                            name: "code",
                            type: "String",
                            desc: "响应码",
                            isArray: false,
                            isEntity: false,
                            isRequire: "",
                            children: [],
                        },
                        {
                            id: 2,
                            name: "msg",
                            type: "String",
                            desc: "响应信息",
                            isArray: false,
                            isEntity: false,
                            isRequire: "",
                            children: [],
                        },
                        {
                            id: 3,
                            name: "data",
                            type: "DTO",
                            desc: "响应数据",
                            isArray: false,
                            isEntity: false,
                            isRequire: "",
                            children: [
                                {
                                    id: 4,
                                    name: "name",
                                    type: "String",
                                    desc: "姓名",
                                    isArray: false,
                                    isEntity: false,
                                    isRequire: "",
                                    children: [],
                                },
                            ]
                        }
                    ]
                },
            },
        }*/
    ],
};

const getters = {
    login() {
        return state.isLogin;
    },
    tabList() {
        return state.tabList;
    },
    curTab(){
        return state.curTab;
    }

};
const mutations = {
    setInterface(state, target) {
        /*判断标签是否存在*/
        let tabs = state.tabList;
        debugger;
        for (let i = 0;i<tabs.length;i++){
            if (tabs[i].name === target.id) {
                return;
            }
        }
        let tmp = {
            name:target.id,
            title:target.title,
            content:target
        };
        state.tabList.push(tmp);
        state.curTab = target.id;
    },
    openDev(state) {
        state.isLogin = state;
    },
    removeTab(state,target){
        if(target === '1' || target === '2'){
            return;
        }
        let tabs = state.tabList;
        let activeName = state.curTab;
        if (activeName === target) {
            tabs.forEach((tab, index) => {
                if (tab.name === target) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }
        state.curTab = activeName;
        state.tabList = tabs.filter(tab => tab.name !== target);
    }

};
const actions = {
    updateInterface(context, target) {
        context.commit("setInterface", target);
    },
    removeTab(context,target){
        context.commit("removeTab",target);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
