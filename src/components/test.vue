<template>
  <div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'test',
    data () {
      return {
        cryptoLocalStorage: cryptostorage.fetch()
      }
    },
    computed: {
      getPrices() {
        getPrice('ETH').then((res)=>{
            this.cryptoPrice = res;
          }).catch((err)=>{
              return err;
        });
      }
    },
    methods: {
      getPriceForAmount() {
        for (let i = 0; i < this.cryptoLocalStorage.length; i++) {
          let cryptoName = this.cryptoLocalStorage[i].title;
          let cryptoDate = this.cryptoLocalStorage[i].date;
          let cryptoAmount = this.cryptoLocalStorage[i].amount;

          let historicPrice = getPriceForTimestamp(cryptoName, cryptoDate);
          Promise.all([historicPrice]).then((values) => {
            // this.cryptoLocalStorage[i].purchaseDatePrice = values[0];
            Vue.set(this.cryptoLocalStorage[i], 'purchaseDatePrice', values[0])
          }).catch(e => console.error(e));
        }
      }
    },
    created() {
        this.getPriceForAmount();
    }
  }
</script>

<style scoped>
</style>
