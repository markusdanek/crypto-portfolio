<template>
  <div>
    <pre>{{ $data }}</pre>
    <div v-for="crypto in cryptoOverview">
      <div class="">

      </div>
      {{crypto.cryptoTitle}}, {{crypto.purchaseValueUSD}}, {{crypto.todayValueUSD}}
    </div>
  </div>
</template>

<script>
  import {
    cryptostorage
  } from '../helpers/utils';

  export default {
    name: 'CryptoValue',
    data() {
      return {
        cryptos: cryptostorage.fetch(),
        cryptoOverview: ''
      }
    },
    methods: {
      getCryptoData() {
        let cryptoGrouped = this.cryptos.groupBy('title');
        let coinTitle = [];
        for (var title in cryptoGrouped) {
          coinTitle.push(title)
        }
        let sumPurchase = [];
        let sumToday = [];
        let cryptoArray = [];
        for (var i = 0; i < coinTitle.length; i++) {
          let sumTempPurchase = [];
          let sumTempToday = [];
          for (var j = 0; j < cryptoGrouped[coinTitle[i]].length; j++) {
            let currentTitle = cryptoGrouped[coinTitle[i]][j].title;
            let purchaseValue = cryptoGrouped[coinTitle[i]][j].purchaseValueFiat;
            let priceToday = cryptoGrouped[coinTitle[i]][j].priceToday * cryptoGrouped[coinTitle[i]][j].amount;
            sumTempPurchase.push(purchaseValue);
            sumTempToday.push(priceToday);
            sumPurchase = sumTempPurchase.reduce((pv, cv) => pv + cv, 0);
            sumToday = sumTempToday.reduce((pv, cv) => pv + cv, 0);
            sumPurchase = sumPurchase.toFixed(2);
            sumToday = sumToday.toFixed(2);
          }
          cryptoArray.push({
            cryptoTitle: coinTitle[i],
            purchaseValueUSD: sumPurchase,
            todayValueUSD: sumToday
          });
        }
        return cryptoArray;
      }
    },
    mounted() {
      this.cryptoOverview = this.getCryptoData();
    }
  }
</script>
