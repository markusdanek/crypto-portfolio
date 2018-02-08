<template>
  <div>
    <AppHeader></AppHeader>

    <AddCryptos></AddCryptos>

    <section class="computed-crypto" v-show="cryptos.length" v-cloak>
      <h1>Your cryptocurrencies</h1>
      <ul class="todo-list">
        <li v-for="crypto in cryptos" :key="crypto.id">
          <div>
            <label>{{ crypto.title }} (Amount: {{ crypto.amount }})</label>
            <button class="destroy" @click="removeCrypto(crypto)">Delete</button>
          </div>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>

  import Vue from 'vue';
  import AppHeader from '@/components/layouts/Header';
  import AddCryptos from '@/components/AddCrypto';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'Main',
    props: [],
    data () {
      return {
        cryptos: cryptostorage.fetch(),
        cryptoGrouped: ''
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
      AppHeader, AddCryptos
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
  .computed-crypto {
    text-align: center;
    ul {
      li {
        list-style-type: none;
      }
    }
  }
</style>
