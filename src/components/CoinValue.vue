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

        let sum = [];
        for (var i = 0; i < coinTitle.length; i++) {
          console.log(coinTitle[i]);
          let sumTemp = [];
          for (var j = 0; j < this.test1[coinTitle[i]].length; j++) {
            let currentTitle = this.test1[coinTitle[i]][j].title;
            let purchaseValue = this.test1[coinTitle[i]][j].purchaseValueFiat;
            sumTemp.push(purchaseValue);
            sum = sumTemp.reduce((pv, cv) => pv+cv, 0);
          }
          console.log("Purchase value in USD: ", sum);
        }
      }
    },
    mounted() {
      this.getCryptoData();
    }
  }
</script>
