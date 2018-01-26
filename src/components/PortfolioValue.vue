<template>
  <div>
    <section>
      Portfolio value in USD: {{ portfolioValue }}
    </section>
  </div>
</template>

<script>
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'PortfolioValue',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        portfolioValue: '',
      }
    },
    watch: {
      cryptos: {
        handler(cryptos) {
          cryptostorage.save(cryptos)
        },
        deep: true
      }
    },
    methods: {
      calcCryptoValue(){
        this.portfolioValue = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          this.portfolioValue+=this.cryptos[i].purchaseValueInUSD;
        }
      }
    },
    mounted() {
      this.calcCryptoValue();
    }
  }
</script>

<style scoped>

</style>
