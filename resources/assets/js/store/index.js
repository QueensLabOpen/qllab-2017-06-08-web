import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        auth: authCheck,
        title: config.title,
        intended: config.intended
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        AUTHENTICATED(state) {
            state.auth = true;
        },
        SET_TITLE(state, title) {
            state.title = title;
        },
        SET_INTENDED(state, route) {
            state.intended = route;
        },
        LOGOUT(state, token) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

            state.user = null;
            state.auth = false;
            state.intended = config.intended;
        }
    },

    actions: {
        GET_USER({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/user')
                .then(({ data }) => {
                    commit('SET_USER', data);
                    resolve(data);
                })
                .catch(error => {
                    reject(error.response);
                });
            });
        },
        AUTHENTICATED({ commit }) {
            commit('AUTHENTICATED');
        },
        SET_TITLE({ commit }, title) {
            commit('SET_TITLE', `${title} · ${config.title}`);
        },
        SET_INTENDED({ commit }, route) {
            commit('SET_INTENDED', route);
        },
        LOGOUT({ commit }, token) {
            commit('LOGOUT', token);
        }
    },

    getters: {
        userCheck: state => state.user !== null,
        authCheck: state => state.auth
    }
});
