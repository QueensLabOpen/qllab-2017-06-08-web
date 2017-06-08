<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    watch: {
        title(value) {
            document.title = value;
        }
    },

    computed: {
        title() {
            return this.$store.state.title;
        }
    }
}
</script>
