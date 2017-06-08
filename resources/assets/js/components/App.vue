<template>
    <div id="app">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
import AppHeader from '../components/Header';

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
    },

    components: {
        AppHeader
    }
}
</script>
