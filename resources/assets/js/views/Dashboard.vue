<template>
    <main class="main"></main>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('SET_TITLE', 'Dashboard');
    }
}
</script>
