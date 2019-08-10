<template>
    <div id="main">

        <el-container>
            <el-header class="header" :style="{height: headerHeight+'px'}">
                <Header></Header>
            </el-header>
            <el-container :style="{height: (curHeight-headerHeight-16)+'px'}">
                <el-aside width="200px">
                    <Menu></Menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import Menu from '../components/Menu'
    import Header from '../components/Header'
    export default {
        components: {
            Header,
            Menu
        },
        data() {
            return {
                curHeight: document.documentElement.clientHeight,
                headerHeight: 100
            }
        },
        mounted() {
            this.curHeight = document.documentElement.clientHeight;
        },
        name: "MainPage"
    }
</script>

<style scoped>

.header{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 2px;
}

</style>
