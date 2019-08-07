<template>
    <div id="header">
        <div class="flex-box">
            <div class="header-box">
                <span>API文档</span>
            </div>
            <div class="header-box">
                <el-input v-model="input" placeholder="搜索接口"></el-input>
                <el-button><i class="el-icon-search"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
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
