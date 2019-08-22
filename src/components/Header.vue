<template>
    <div id="header">
        <div class="flex-box">
            <div class="header-box">
                <span>API文档</span>
            </div>
            <div class="header-box">
                <el-input @keyup.enter.native="searchMenu" v-model="keyword" placeholder="搜索接口"></el-input>
                <el-button v-on:click="searchMenu"><i class="el-icon-search"></i></el-button>
                <el-button type="danger" @click="dialogTableVisible = true">开发者模式</el-button>
            </div>
        </div>
        <el-dialog title="输入口令" :visible.sync="dialogTableVisible">
            <el-input v-model="password"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="openDeve">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import EventBus from '../eventBus'

    export default {
        name: "Header",
        data() {
            return {
                keyword: '',
                dialogTableVisible: false,
                password: ""
            }
        },
        methods: {
            searchMenu() {
                EventBus.$emit("searchMenu", {
                    'keyword': this.keyword
                })
            },
            openDeve() {
                let password = this.password;
                if (password === "Admin123456@") {
                    this.$store.commit("openDev", true);
                }
                this.dialogTableVisible = false;
            }
        }
    }
</script>

<style scoped>
    .flex-box {
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }

    .header-box {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
    }

    #header {
        height: 100%;
        width: 100%;
    }

</style>
