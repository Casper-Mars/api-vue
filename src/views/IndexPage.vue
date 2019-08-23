<template>
    <div>
        <vue-markdown :source="markdownBody"></vue-markdown>
        <div>{{getMarkdownBody}}</div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'

    export default {
        name: "IndexPage",
        components: {
            VueMarkdown
        },
        data() {
            return {
                markdownBody: "这里可以放置描述信息"
            }
        },
        computed:{
            getMarkdownBody(){
                return this.markdownBody;
            }
        },
        mounted() {
        debugger;
            var that = this;
            this.$api.get(
                "/api/index/info",
                null,
                null,
                (data) => {
                    that.markdownBody = data.data;
                },
                (data) => {

                }
            );
        }
    }
</script>

<style scoped>

</style>
