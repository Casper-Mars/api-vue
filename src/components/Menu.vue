<template>
    <div id="menu">
        <el-menu
                :unique-opened=true
                router
                default-active="/"
        >
            <template v-for="(menu,index) in showMenu">
                <el-submenu v-if="menu.isShow" :index="menu.index+index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{menu.name}}{{menu.isShow}}</span>
                    </template>
                    <el-menu-item-group>
                        <template v-for="item in menu.children">
                            <el-menu-item v-if="item.isShow" :index="item.index" v-on:click="get(item.interfaceId)">
                                {{item.name}}
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import EventBus from '../eventBus'

    export default {
        name: "Menu",
        mounted() {

            this.$api.get(
                "/api/menu",
                null,
                (data) => {
                    let menuTmp = data.data;
                    console.log(data);
                    console.log(menuTmp);
                    for (let i = 0; i < menuTmp.length; i++) {
                        this.dealMenu(menuTmp[i]);
                        this.menuList.push(menuTmp[i]);
                    }
                    this.initMenuShow()
                },
                (data) => {

                }
            );
            EventBus.$on("searchMenu", item => {
                let keyword = item.keyword
                this.filtrateMenu(keyword)
            })
        },
        data() {
            return {
                menuList: [
                    {
                        interfaceId: 0,
                        index: "/index",
                        name: "主页",
                        children: [
                            {
                                interfaceId: 0,
                                index: "/index",
                                name: "主页"
                            },
                            {
                                interfaceId: 0,
                                index: "/setting",
                                name: "设置"
                            },
                        ]
                    }
                ],
                showMenu: []
            }
        },
        methods: {
            initMenuShow() {
                for (let i = 0; i < this.menuList.length; i++) {
                    let menu = this.menuList[i];
                    menu.isShow = true;
                    let children = menu.children;
                    for (let j = 0; j < children.length; j++) {
                        children[j].isShow = true
                    }
                }
                // 简单地实现克隆对象。这样无法克隆对象中的方法
                this.showMenu = JSON.parse(JSON.stringify(this.menuList));
            },
            /**
             * 根据关键字过滤菜单
             * @param keyword
             */
            filtrateMenu(keyword) {
                this.initMenuShow();
                console.log(this.menuList);
                console.log(this.showMenu);
                for (let i = 0; i < this.showMenu.length; i++) {
                    let menuItem = this.showMenu[i];
                    if (menuItem.name.indexOf(keyword) !== -1 || menuItem.index.indexOf(keyword) !== -1) {
                        continue
                    }
                    let hasMatched = this.filtrateChildren(menuItem.children, keyword)
                    console.log(hasMatched);
                    if (!hasMatched) {
                        this.showMenu.splice(i, 1);
                        i--
                    }
                }
                console.log(this.menuList)
                console.log(this.showMenu)
            },
            /**
             * 过滤二级菜单
             * @param childrenList
             * @param keyword
             */
            filtrateChildren(childrenList, keyword) {
                let hasMatched = false;
                for (let i = 0; i < childrenList.length; i++) {
                    let item = childrenList[i];
                    if (item.name.indexOf(keyword) !== -1 || item.index.indexOf(keyword) !== -1) {
                        hasMatched = true;
                        continue
                    }
                    // 去掉不匹配的菜单项
                    // item.isShow = false
                    childrenList.splice(i, 1);
                    i--
                }
                return hasMatched
            },
            get: function (id) {
                console.log(id);
                if (id === '0' || id === 0) {
                    return;
                }
                this.$api.get(
                    "/api/interface",
                    {id:id},
                    (data)=>{
                        let tmp = data.data;
                        if (tmp.param != null) {
                            let paramList = tmp.param.tableData;
                            if (!(paramList === undefined || paramList == null)) {
                                this.deal(paramList);
                                tmp.param.jsonData = this.getJsonData(paramList);
                            }

                        }
                        if (tmp.resp != null) {
                            let respList = tmp.resp.tableData;
                            if (!(respList === undefined || respList == null)) {
                                this.deal(respList);
                                tmp.resp.tableData = respList[0].children;
                                tmp.resp.jsonData = this.getJsonData(respList)[''];
                            }
                        }
                        this.$store.dispatch("updateInterface", tmp);
                    },
                    (data)=>{

                    }
                );
            },
            dealChild: function (param, id) {
                param.id = ++id;
                param.require = param.require ? "必传" : "否";
                let child = param.children;
                if (child === undefined || child == null || child.length === 0) {
                    return param;
                }
                id = param.id;
                for (let i = 0; i < child.length; i++) {
                    let tmp = this.dealChild(child[i], id);
                    id = tmp.id;
                }
                return param;
            },
            deal: function (list) {
                let id = 1;
                for (let i = 0; i < list.length; i++) {
                    let tmp1 = this.dealChild(list[i], id);
                    id = tmp1.id;
                }
            },
            dealMenu: function (menu) {
                menu.index = "/interface/" + menu.interfaceId + menu.hash;
                let children = menu.children;
                if (children === undefined || children == null || children.length === 0) {
                    return;
                }
                for (let i = 0; i < children.length; i++) {
                    this.dealMenu(children[i]);
                }
            },
            getJsonData: function (paramList) {
                let obj = {};
                if (paramList == null || paramList.length === 0) {
                    return null;
                }
                for (let i = 0; i < paramList.length; i++) {
                    let param = paramList[i];
                    let child = null;
                    if (param.children != null) {
                        child = this.getJsonData(param.children);
                    }
                    if (param.array) {
                        if (child != null) {
                            obj[param.name] = [child];
                        } else {
                            obj[param.name] = [];
                        }
                    } else {
                        if (child != null) {
                            obj[param.name] = child;
                        } else {
                            obj[param.name] = '';
                        }
                    }
                }
                return obj;
            },
        }
    }
</script>

<style scoped>

</style>
