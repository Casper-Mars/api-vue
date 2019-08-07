<template>
    <div id="app">
        <el-container style="padding: 0">
            <el-header :style="{height: headerHeight+'px'}">

            </el-header>
            <el-container :style="{height: (curHeight-headerHeight-16)+'px'}">
                <el-aside>
                    <Menu/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>

    import Menu from './components/Menu'

    export default {
        name: 'main',
        components: {
            Menu
        },
        data() {
            return {
                curHeight: document.documentElement.clientHeight,
                headerHeight: 100
            }
        },
        mounted() {
        debugger;
            this.curHeight = document.documentElement.clientHeight;
        }
    }

</script>
