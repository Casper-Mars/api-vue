<template>
    <div id="menu">
        <el-menu
                :unique-opened=true
                router
                default-active="/"
        >
            <template v-for="(menu,index) in menuList">
                <el-submenu :index="menu.index+index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <template v-for="item in menu.children">
                            <el-menu-item :index="item.index" v-on:click="get(item.interfaceId)">
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
    export default {
        name: "Menu",
        mounted() {
            this.$axios({
                url: "/api/menu",
                method: "get"
            }).then((data) => {
                let menuTmp = data.data.data;
                console.log(data);
                console.log(menuTmp);
                for (let i = 0; i < menuTmp.length; i++) {
                    this.dealMenu(menuTmp[i]);
                    this.menuList.push(menuTmp[i]);
                }
            })
        },
        data() {
            return {
                menuList: [
                    {
                        interfaceId: 0,
                        index: "/",
                        name: "主页",
                        children: [
                            {
                                interfaceId: 0,
                                index: "/",
                                name: "主页"
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            get: function (id) {
                console.log(id);
                if (id === '0' || id === 0) {
                    return;
                }
                this.$axios({
                    url: "/api/interface",
                    method: "get",
                    params:{
                        id:id
                    },
                    dataType: "json"
                }).then((data) => {
                    let tmp = data.data.data;
                    let paramList = tmp.param.tableData;
                    if (!(paramList === undefined || paramList == null)) {
                        this.deal(paramList);
                    }
                    let respList = tmp.resp.tableData;
                    if (!(respList === undefined || respList == null)) {
                        this.deal(respList)
                    }
                    this.$store.dispatch("updateInterface", tmp);
                });
            },
            dealChild: function (param, id) {
                param.id = ++id;
                param.isRequire = param.isRequire ? "必传" : "否";
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
                menu.index = "/interface/" + menu.interfaceId+menu.hash;
                let children = menu.children;
                if (children === undefined || children == null || children.length === 0) {
                    return;
                }
                for (let i = 0; i < children.length; i++) {
                    this.dealMenu(children[i]);
                }
            }
        }
    }
</script>

<style scoped>

</style>
