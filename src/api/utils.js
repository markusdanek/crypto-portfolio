import _ from 'lodash'
export const STORAGE_KEY = 'cryptocoin-portfolio'

export function getJsonBody(body) {
    if(_.isString(body)) {
        try {
            return JSON.parse(body);
        } catch(err) {
            return body;
        }
    }
    return body;
}

export let cryptostorage = {
  fetch: function () {
    let cryptos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    cryptos.forEach(function (crypto, index) {
      crypto.id = index
    })
    cryptostorage.uid = cryptos.length
    return cryptos
  },
  save: function (cryptos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cryptos))
  }
}

// export function Array.prototype.groupBy(prop) {
//   return this.reduce(function(groups, item) {
//     var val = item[prop];
//     groups[val] = groups[val] || [];
//     groups[val].push(item);
//     return groups;
//   }, {});
// }
