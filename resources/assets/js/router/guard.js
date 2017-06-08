import store from '../store';
import config from '../config';

export default {
    guest(to, from, next) {
        if (store.getters.authCheck) {
            next({ name: config.intended });
        } else {
            next();
        }
    },

    auth(to, from, next) {
        if (store.getters.authCheck) {
            if (!store.getters.userCheck) {
                store.dispatch('GET_USER').then(() => next());
            } else {
                next();
            }
        } else {
            const route = to.matched.some(record => record.path === '*') ? config.intended : to.name;

            store.dispatch('SET_INTENDED', route);

            next({ name: 'login' });
        }
    }
}
