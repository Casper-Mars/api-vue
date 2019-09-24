<template>
    <div id="main">
        <el-container>
            <el-header class="header" :style="{height: headerHeight+'px'}">
                <Header></Header>
            </el-header>
            <el-container :style="{height: (curHeight-headerHeight-16)+'px'}">
                <el-aside width="300px">
                    <Menu></Menu>
                </el-aside>
                <el-main>
                    <Tab/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import Menu from '../components/Menu'
    import Header from '../components/Header'
    import Tab from "../components/Tab";

    export default {
        components: {
            Header,
            Menu,
            Tab
        },
        data() {
            return {
                curHeight: document.documentElement.clientHeight,
                headerHeight: 100
            }
        },
        mounted() {
            this.curHeight = document.documentElement.clientHeight;
            // unsplash SDK测试
            // const unsplash = new Unsplash({
            //     applicationId: "31f60798ed8053f372f4ef4b7e0033f3bdfda41b8184e4d70b096eba42545414",
            //     secret: "d32260cf7e73772b17ce272bef7807ea9e3b28cbbe308f7da1628cf133030979"
            // });
            // unsplash.search.photos("神仙", 1)
            //     .then(toJson)
            //     .then(json => {
            //         console.log(json);
            // });
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
