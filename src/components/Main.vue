<template>
  <div>
    <header>
      <!-- <img src="static/logo.png" alt=""> -->
      <!-- <h1>Cryptocoin Portfolio</h1> -->
      <portfolioValue></portfolioValue>
    </header>

    <section class="add-cryptos">
      <input autofocus autocomplete="off" placeholder="Name (BTC)" v-model="newcrypto">
      <input autocomplete="off" placeholder="Amount (0.001)" v-model="cryptoAmount" @keyup.enter="addCrypto">
      <input autocomplete="off" placeholder="Currency (USD)" v-model="cryptoCurrency" @keyup.enter="addCrypto">
      <datepicker input-class="cc-input" v-model="cryptoDate" name="cryptoDate" placeholder="Date of purchase"></datepicker>
      <button type="button" name="button" @click="addCrypto">Add</button>
    </section>

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

  Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      var val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

  import Vue from 'vue';
  import Datepicker from 'vuejs-datepicker';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../api/utils';
  import PortfolioValue from '@/components/PortfolioValue'

  export default {
    name: 'Main',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        newcrypto: '',
        cryptoAmount: '',
        cryptoDate: '',
        cryptoCurrency: '',
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
      groupBy(prop) {
        return this.reduce(function(groups, item) {
          var val = item[prop];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
        }, {});
      },
      addCrypto() {
        let title = this.newcrypto && this.newcrypto.trim();
        let amount = this.cryptoAmount && this.cryptoAmount.trim();
        let date = this.cryptoDate;
        let currency = this.cryptoCurrency;
        if (!title) {
          return
        }
        this.cryptos.push({
          id: cryptostorage.uid++,
          title: title,
          amount: amount,
          currency: currency,
          purchaseDate: date
        });
        this.newcrypto = '';
        this.cryptoAmount = '';
        this.cryptoDate = '';
        this.cryptoCurrency = '';
      },
      removeCrypto(crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      },
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
      Datepicker,
      PortfolioValue
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
  header {
    padding: 25px 0;
    background-color: #4965C3;
    img {
      display: none;
      width: 100px;
      text-align: center;
    }
    h1 {
      text-align: center;
      font-family: Droid Sans;
      color: white;
    }
  }

  .add-cryptos {
    text-align: center;
    padding-top: 50px;
    .vdp-datepicker {
      display: inline-block;
    }
    input{
      font-size: 1rem;
      font-weight: 400;
      color: #4965C3;
      padding-top: 0;
      padding-right: 10px;
      padding-bottom: 0;
      padding-left: 10px;
      box-sizing: border-box;
      width: 150px;
      min-height: 40px;
      border: 2px solid #ccc;
      outline: 0;
    }
    button {
      background: #4965C3;
      color: #FFF;
      border: none;
      outline: 0;
      height: 40px;
      padding: 10px;
      position: relative;
      top: -2px;
    }
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
