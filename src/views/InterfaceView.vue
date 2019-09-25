<template>
    <Interface :interface="interface"/>
</template>

<script>
    import Interface from "@/components/interface/Interface";

    export default {
        name: "InterfaceView",
        props:{
            interface:Object
        },
        components: {
            Interface
        }
    }
</script>

<style scoped>

</style>