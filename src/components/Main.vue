<template>
  <b-container class="main">
    <pre>
      Main.vue:
      {{ $data }}
    </pre>
    <AppHeader></AppHeader>
    <AddCryptos></AddCryptos>
    <CryptoList></CryptoList>
  </b-container>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '@/components/layouts/Header';
  import AddCryptos from '@/components/AddCrypto';
  import CryptoList from '@/components/CryptoList';
  import { cryptostorage } from '../helpers/utils';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';

  export default {
    name: 'Main',
    data () {
      return {
        cryptos: cryptostorage.fetch(),
        loadingToday: false,
        loadingYesterday: false
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
      getPriceForToday(){
        this.loadingToday = true;
        let priceToday = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let priceTodayPromise = getPrice(this.cryptos[i].title, this.cryptos[i].currency)
            .then((values)=>{
              priceToday.push(values);
              Vue.set(this.cryptos[i], 'priceToday', values);
              this.loadingToday = false;
            }).catch((err)=>{
                return err;
          });
        }
      },
      getPriceForYesterday(){
        this.loadingYesterday = true;
        let priceYesterday = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let today = new Date();
          let yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday = yesterday.toISOString();
          let priceYesterdayPromise = getPriceForTimestamp(this.cryptos[i].title, yesterday, this.cryptos[i].currency)
            .then((values) => {
              priceYesterday.push(values);
              Vue.set(this.cryptos[i], 'priceYesterday', values);
              this.loadingYesterday = false;
            }).catch((err)=>{
                return err;
          });
        }
      }
    },
    components: {
      AppHeader,
      AddCryptos,
      CryptoList
    },
    mounted() {
      // this.getHistoricPrice();
      // this.getPriceForAmount();
      this.getPriceForToday();
      this.getPriceForYesterday();
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    background: #FFFFFF;
    background: linear-gradient(135deg, #FFF 0%,#FFFFFF 100%);
    padding: 0;
  }

  .computed-crypto {
    text-align: center;
    ul {
      li {
        list-style-type: none;
      }
    }
  }
</style>
