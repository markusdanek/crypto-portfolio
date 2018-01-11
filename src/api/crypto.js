import Vue from 'vue';
import { getJsonBody } from './utils';

export function getByUrl(url) {
    return new Promise((resolve, reject)=>{
        Vue.http.get(url).then((res)=>{
            resolve(getJsonBody(res.body));
        }).catch((err)=>{
            reject(err);
        });
    });
}

export function getPrice(crypto) {
    return new Promise((resolve, reject) => {
        Vue.http.get('/price/', {
            params: {
                crypto: crypto
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getValue(crypto, coins) {
    return new Promise((resolve, reject) => {
        Vue.http.get('/value/', {
            params: {
                crypto: crypto,
                coins: coins
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getDaily(crypto) {
    return new Promise((resolve, reject) => {
        Vue.http.get('/daily/', {
            params: {
                crypto: crypto
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getMonthly(crypto) {
    return new Promise((resolve, reject) => {
        Vue.http.get('/value/', {
            params: {
                crypto: crypto
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getPortfolio() {
    return new Promise((resolve, reject) => {
        Vue.http.get('/value/', {
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}
