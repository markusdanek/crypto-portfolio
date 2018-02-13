<template>
  <b-container class="main">
    <AppHeader></AppHeader>
    <AddCryptos></AddCryptos>
    <CryptoList></CryptoList>
  </b-container>
</template>

<script>
  Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      var val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

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
        cryptoGrouped: ''
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
      getHistoricPrice() {
        for (let i = 0; i < this.cryptos.length; i++) {
          let historicPrice = getPriceForTimestamp(this.cryptos[i].title, this.cryptos[i].purchaseDate, this.cryptos[i].currency);
          Promise.all([historicPrice]).then((values) => {
            Vue.set(this.cryptos[i], 'purchaseDatePrice', values[0]);
          }).catch(e => console.error(e));
        }
        this.cryptoGrouped = this.cryptos.groupBy('title');
      },
      getPriceForAmount(){
        let cryptoValue = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          let cryptoAmount = this.cryptos[i].amount;
          let cryptoPrice = this.cryptos[i].purchaseDatePrice;
          let value;
          if(cryptoAmount != null && cryptoPrice != null){
            value = parseInt(cryptoAmount * cryptoPrice);
            cryptoValue+=value;
          }
          Vue.set(this.cryptos[i], 'purchaseValueFiat', value);
        }
      },
      getPriceForToday(){
        let priceToday = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let priceTodayPromise = getPrice(this.cryptos[i].title, this.cryptos[i].currency)
            .then((values)=>{
              priceToday.push(values);
              Vue.set(this.cryptos[i], 'priceToday', values);
            }).catch((err)=>{
                return err;
          });
        }
      },
      getPriceForYesterday(){
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
      this.getHistoricPrice();
      this.getPriceForAmount();
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
