<template>
    <Interface :interface="this.$store.getters.interface"/>
</template>

<script>
    import Interface from "@/components/Interface";

    export default {
        name: "InterfaceView",
        components: {
            Interface
        }
    }
</script>

<style scoped>

</style>