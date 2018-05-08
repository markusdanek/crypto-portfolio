import Vue from 'vue';
import {getJsonBody} from '../helpers/utils';

const ccUrl = 'https://min-api.cryptocompare.com/data'
const apiUrl = 'https://cryptocoin-api.herokuapp.com'

export function getByUrl(url) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url).then((res) => {
      resolve(getJsonBody(res.body));
    }).catch((err) => {
      reject(err);
    });
  });
}

export function getPrice(crypto, currency) {
  return new Promise((resolve, reject) => {
    Vue.http.get(ccUrl + '/price', {
      params: {
        fsym: crypto,
        tsyms: currency
      }
    }).then((result) => {
      resolve(getJsonBody(result.body[currency]));
    }).catch((err) => {
      reject(err);
    });
  });
}

export function getPriceForTimestamp(crypto, day, currency) {
  return new Promise((resolve, reject) => {
    Vue.http.get(ccUrl + '/pricehistorical', {
      params: {
        fsym: crypto,
        day: day,
        tsyms: currency
      }
    }).then((result) => {
      resolve(JSON.parse(result.body[crypto][currency]));
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
    Vue.http.get(apiUrl + '/portfolio', {}).then((result) => {
      resolve(JSON.parse(result.body));
    }).catch((err) => {
      reject(err);
    });
  });
}
