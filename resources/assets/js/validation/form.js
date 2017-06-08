import axios from 'axios';
import Errors from './errors';

export default class Form {
    constructor(fields) {
        this.fields = fields;
        this.errors = new Errors();
        this.busy = false;
    }

    post(url) {
        return this.submit('post', url);
    }

    put(url) {
        return this.submit('put', url);
    }

    patch(url) {
        return this.submit('patch', url);
    }

    delete(url) {
        return this.submit('delete', url);
    }

    submit(method, url) {
        this.errors.clear();
        this.busy = true;

        return new Promise((resolve, reject) => {
            axios[method](url, this.fields)
                .then(response => {
                    this.busy = false;

                    resolve(response.data);
                })
                .catch(error => {
                    this.busy = false;
                    this.onFail(error.response.data);

                    reject(error.response);
                });
        });
    }

    onFail(errors) {
        this.errors.record(errors);
    }
}
