import Vue from 'vue';
import { getJsonBody } from '../helpers/utils';

const apiUrl = 'http://cryptocoin-api.herokuapp.com'
const devUrl = 'http://localhost:9001'

export function getByUrl(url) {
    return new Promise((resolve, reject)=>{
        Vue.http.get(url).then((res)=>{
            resolve(getJsonBody(res.body));
        }).catch((err)=>{
            reject(err);
        });
    });
}

export function getPrice(crypto, currency) {
    return new Promise((resolve, reject) => {
        Vue.http.get(apiUrl + '/price', {
            params: {
                crypto: crypto,
                currency: currency
            }
        }).then((result) => {
            resolve(getJsonBody(result.body[currency]));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getValue(crypto, coins, currency) {
    return new Promise((resolve, reject) => {
        Vue.http.get(apiUrl + '/value', {
            params: {
                crypto: crypto,
                coins: coins,
                currency: currency
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getDaily(crypto, currency) {
    return new Promise((resolve, reject) => {
        Vue.http.get(apiUrl + '/daily', {
            params: {
                crypto: crypto,
                currency: currency
            }
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getMonthly(crypto, currency) {
    return new Promise((resolve, reject) => {
        Vue.http.get(apiUrl + '/value', {
            params: {
                crypto: crypto,
                currency: currency
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
        Vue.http.get(apiUrl + '/portfolio', {
        }).then((result) => {
            resolve(JSON.parse(result.body));
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getPriceForTimestamp(crypto, day, currency) {
    return new Promise((resolve, reject) => {
      Vue.http.get(apiUrl + '/historicprice', {
          params: {
              crypto: crypto,
              day: day,
              currency: currency
          }
        }).then((result) => {
            resolve(JSON.parse(result.body[currency]));
        }).catch((err) => {
            reject(err);
        });
    });
}
