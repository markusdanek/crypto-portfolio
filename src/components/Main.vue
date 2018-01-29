<template>
  <div>

    <pre>{{ $data }}</pre>

    <input autofocus autocomplete="off" placeholder="Crypto name" v-model="newcrypto">
    <input autocomplete="off" placeholder="Amount" v-model="cryptoAmount" @keyup.enter="addCrypto">
    <datepicker v-model="cryptoDate" name="cryptoDate" placeholder="Date of purchase"></datepicker>

    <button type="button" name="button" @click="addCrypto">Add</button>

    <section v-show="cryptos.length" v-cloak>
      <ul class="todo-list">
        <li v-for="crypto in cryptos" :key="crypto.id">
          <div>
            <label>{{ crypto.title }} (Amount: {{ crypto.amount }})</label>
            <button class="destroy" @click="removeCrypto(crypto)">Delete</button>
          </div>
        </li>
      </ul>
    </section>

    <portfolioValue></portfolioValue>

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
        if (!title) {
          return
        }
        this.cryptos.push({
          id: cryptostorage.uid++,
          title: title,
          amount: amount,
          purchaseDate: date
        });
        this.newcrypto = '';
        this.cryptoAmount = '';
        this.cryptoDate = '';
      },
      removeCrypto(crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      },
      getHistoricPrice() {
        for (let i = 0; i < this.cryptos.length; i++) {
          let cryptoName = this.cryptos[i].title;
          let cryptoDate = this.cryptos[i].purchaseDate;
          let historicPrice = getPriceForTimestamp(cryptoName, cryptoDate);
          Promise.all([historicPrice]).then((values) => {
            Vue.set(this.cryptos[i], 'purchaseDatePrice', values[0]);
          }).catch(e => console.error(e));
        }
        this.cryptoGrouped = this.cryptos.groupBy('title');
        console.log(this.cryptos.groupBy('title'));
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
          Vue.set(this.cryptos[i], 'purchaseValueInUSD', value);
        }
      },
      getPriceForToday(){
        let priceToday = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let priceTodayPromise = getPrice(this.cryptos[i].title)
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

          let priceYesterdayPromise = getPriceForTimestamp(this.cryptos[i].title, yesterday)
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

<style scoped>

</style>
