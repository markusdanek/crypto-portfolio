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

    <section>
      Portfolio value in USD: {{ portfolioValue }}
    </section>

  </div>
</template>

<script>
  import Vue from 'vue';
  import Datepicker from 'vuejs-datepicker';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'Main',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        newcrypto: '',
        cryptoAmount: '',
        cryptoDate: '',
        portfolioValue: ''
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
          Vue.set(this.cryptos[i], 'valueInUSD', value);
        }
      },
      calcCryptoValue(){
        this.portfolioValue = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          this.portfolioValue+=this.cryptos[i].valueInUSD;
        }
      },
      getPriceForYesterday(){
        let yesterdayUSD = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let cryptoName = this.cryptos[i].title;
          let timestamp = new Date(this.cryptos[i].purchaseDate);
          timestamp.setDate(timestamp.getDate() - 1);
          timestamp = timestamp.toISOString();
          let priceYesterday = getPriceForTimestamp(cryptoName, timestamp);
          Promise.all([priceYesterday]).then((values) => {
            yesterdayUSD.push(values[0]);
            return yesterdayUSD;
          }).catch(e => console.error(e));
        }
        console.log(yesterdayUSD);
      }
    },
    components: {
      Datepicker
    },
    mounted() {
      this.getHistoricPrice();
      this.getPriceForAmount();
      this.calcCryptoValue();
      this.getPriceForYesterday();
    }
  }
</script>

<style scoped>

</style>
