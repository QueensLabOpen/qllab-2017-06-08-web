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
        intended: config.intended,
        image: null,
        tags: null,
        filename: null
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
        },
        SET_IMAGE(state, payload) {
            state.image = payload;
        },
        SET_FILENAME(state, filename) {
            state.filename = filename
        },
        SET_TAG(state, tags) {
            state.tags = tags
        },
        CLEAN(state) {
            state.tags = null
            state.image = null
            stage.filename = null
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
        },
        POST_IMAGE({ state }) {
            return new Promise((resolve, reject) => {
                axios.post('http://qllab1-api.azurewebsites.net/api/content', {
                    tags: state.tags,
                    filename: state.filename,
                    data: state.image
                })
                .then((response) => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error.response)
                })
            })
        }
    },

    getters: {
        userCheck: state => state.user !== null,
        authCheck: state => state.auth
    }
});
