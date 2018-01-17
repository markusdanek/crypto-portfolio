<template>
  <div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'test',
    data () {
      return {
        cryptoPrice: [],
        cryptoLocalStorage: cryptostorage.fetch(),
        cryptoAmount: []
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
        console.log("getPriceForAmount");
        for (var i = 0; i < this.cryptoLocalStorage.length; i++) {
          let cryptoName = this.cryptoLocalStorage[i].title;
          // let cryptoAmount = this.cryptoLocalStorage[i].amount;
          let cryptoDate = this.cryptoLocalStorage[i].date;
          getPriceForTimestamp(cryptoName, cryptoDate).then((res)=>{
              console.log("getPriceForTimestamp");
              this.cryptoAmount = res;
            }).catch((err)=>{
                return err;
          });
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
