import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    curInterface: {
        title: "测试接口",
        requestMethod: "post",
        requestUrl: "/api/member/list",
        param: {
            isJson: true,
            isArray: false,
            jsonData: "param:{\nname:'',\nage:,\nteacher:{\nname:'',\n},\n}",
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
            jsonData: "param:{\nname:'',\nage:,\nteacher:{\nname:'',\n},\n}",
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
};

const getters = {
    interface() {
        return state.curInterface;
    },
    title() {
        return state.curInterface.title;
    },
    requestMethod() {
        return state.curInterface.requestMethod;
    },
    requestUrl() {
        return state.curInterface.requestUrl;
    },
    isJson() {
        return state.curInterface.isJson;
    },
    paramJsonData() {
        return state.curInterface.param.jsonData;
    },
    paramTableData() {
        return state.curInterface.param.tableData;
    },
    respTableData() {
        return state.curInterface.resp.tableData;
    },
    respJsonData() {
        return state.curInterface.resp.jsonData;
    },
};
const mutations = {
    setInterface(state, target) {
        state.curInterface = target;
    }
};
const actions = {
    updateInterface(context, target) {
        context.commit("setInterface", target);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
