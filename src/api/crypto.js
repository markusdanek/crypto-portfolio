import Vue from 'vue';
import { getJsonBody } from './utils';

const apiUrl = 'http://cryptocoin-api.herokuapp.com'

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
        Vue.http.get(apiUrl + '/price/', {
            params: {
                crypto: crypto
            }
        }).then((result) => {
            resolve(getJsonBody(result.body.USD));
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
        Vue.http.get('/portfolio/', {
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getPriceForTimestamp() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/historicprice/', {
          params: {
              crypto: crypto,
              day: day
          }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}
