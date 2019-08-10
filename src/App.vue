<template>
    <div id="app">
        <Main></Main>
    </div>

</template>

<script>
    import Main from './views/MainPage'

    export default {
        name: 'main',
        components: {
            Main
        }
    }

</script>
<style scoped>
    .container {
        height: 100%;
    }
</style>
