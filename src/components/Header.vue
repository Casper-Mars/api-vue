<template>
    <div id="header">
        <div class="flex-box">
            <div class="header-box">
                <span>API文档</span>
            </div>
            <div class="header-box">
                <el-input @keyup.enter.native="searchMenu" v-model="keyword" placeholder="搜索接口"></el-input>
                <el-button v-on:click="searchMenu"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import EventBus from '../eventBus'
    export default {
        name: "Header",
        data () {
            return {
                keyword: ''
            }
        },
        methods: {
            searchMenu() {
                EventBus.$emit("searchMenu", {
                    'keyword': this.keyword
                })
            }
        }
    }
</script>

<style scoped>
    .flex-box{
        display: flex;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
    .header-box{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
    }
    #header{
        height: 100%;
        width: 100%;
    }

</style>
