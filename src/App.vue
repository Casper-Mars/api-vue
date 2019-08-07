<template>
    <div id="app">
        <el-container>
            <el-header>

            </el-header>
            <el-container :style="{height: height}">
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
        data(){
          return{
              height:""
          }
        },
        mounted(){
            debugger;
            this.height=document.body.clientHeight+'px';
        }
    }

</script>
