<template>
  <div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
  import { cryptostorage } from '../helpers/utils';

  export default {
    name: 'CryptoValue',
    data () {
      return {
        cryptos: cryptostorage.fetch(),
        test1: ''
      }
    },
    methods: {
      getCryptoData(){
        this.test1 = this.cryptos.groupBy('title');
        let coinTitle = [];

        // $coinTitle[] contains title of available coins in grouped $cryptos
        for (var title in this.test1) {
          coinTitle.push(title)
        }

        let sumPurchase = [];
        let sumToday = [];
        for (var i = 0; i < coinTitle.length; i++) {
          console.log(coinTitle[i]);
          let sumTempPurchase = [];
          let sumTempToday = [];
          for (var j = 0; j < this.test1[coinTitle[i]].length; j++) {
            let currentTitle = this.test1[coinTitle[i]][j].title;
            let purchaseValue = this.test1[coinTitle[i]][j].purchaseValueFiat;
            let priceToday = this.test1[coinTitle[i]][j].priceToday * this.test1[coinTitle[i]][j].amount;
            sumTempPurchase.push(purchaseValue);
            sumTempToday.push(priceToday);
            sumPurchase = sumTempPurchase.reduce((pv, cv) => pv+cv, 0);
            sumToday = sumTempToday.reduce((pv, cv) => pv+cv, 0);
          }
          console.log("PurchaseValueUSD: ", sumPurchase);
          console.log("TodayValueUSD: ", sumToday);
        }
      }
    },
    mounted() {
      this.getCryptoData();
    }
  }
</script>
