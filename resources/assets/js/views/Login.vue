<template>
    <section class="login">
        <a class="login__logo"></a>
        <form class="login__form" @submit.prevent="login" @keydown="form.errors.clear($event.target.name)">
            <alert type="error" :visible="form.errors.any()">{{ form.errors.get('username') }}</alert>
            <v-input v-model="form.fields.username" label="Username"></v-input>
            <v-input v-model="form.fields.password" type="password" label="Password"></v-input>
            <v-button type="warning" native-type="submit" :disabled="disabled">Log In</v-button>
        </form>
    </section>
</template>

<script>
import Form from '../validation/form';
import Alert from '../components/Alert';
import VInput from '../components/Input';
import VButton from '../components/Button';

export default {
    created() {
        this.$store.dispatch('SET_TITLE', 'Login');
    },

    data() {
        return {
            form: new Form({
                username: '',
                password: ''
            })
        }
    },

    computed: {
        disabled() {
            return !(this.form.fields.username && this.form.fields.password);
        },
        intended() {
            return this.$store.state.intended;
        }
    },

    methods: {
        login() {
            this.form.post('/login')
            .then(() => {
                this.$store.dispatch('GET_USER').then(() => {
                    this.$store.dispatch('AUTHENTICATED');
                    this.$router.push({ name: this.intended });
                });
            })
            .catch(error => {
                this.form.fields.password = '';
            });
        }
    },

    components: {
        Alert,
        VInput,
        VButton
    }
}
</script>
