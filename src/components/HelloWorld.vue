<template>
    <div class="hello">

        <el-button v-on:click="test">
            测试
        </el-button>


    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        methods: {
            test: function (e) {
                this.$axios({
                    method: "post",
                    url: "/api/json",
                }).then((data) => {
                    console.log(data.data);
                })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
