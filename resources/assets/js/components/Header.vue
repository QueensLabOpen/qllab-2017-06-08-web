<template>
    <header class="header" v-if="user">
        <div class="header__item">
            <router-link to="/" class="header__logo" exact></router-link>
        </div>
        <div class="header__logout">
            <a class="h-interaction-clickable" @click.prevent="logout">Logout</a>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    },

    methods: {
        logout() {
            axios.post('/logout')
            .then(({ data }) => {
                this.$store.dispatch('LOGOUT', data.csrfToken);
                this.$router.push({ name: 'login' });
            });
        }
    }
}
</script>
