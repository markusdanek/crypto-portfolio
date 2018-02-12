<template>
  <div class="add-cryptos">
    <h4>Add your cryptocoins</h4>
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <input autofocus autocomplete="off" placeholder="Name (BTC)" v-model="newcrypto">
        <input autocomplete="off" placeholder="Amount (0.001)" v-model="cryptoAmount" @keyup.enter="addCrypto">
        <input autocomplete="off" placeholder="Currency (USD)" v-model="cryptoCurrency" @keyup.enter="addCrypto">
        <datepicker input-class="cc-input" v-model="cryptoDate" name="cryptoDate" placeholder="Date of purchase"></datepicker>
        <button type="button" name="button" @click="addCrypto">Add</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import { cryptostorage } from '../helpers/utils';
  import Datepicker from 'vuejs-datepicker';
  import bContainer from 'bootstrap-vue/es/components/layout/container';
  import bRow from 'bootstrap-vue/es/components/layout/row';
  import bCol from 'bootstrap-vue/es/components/layout/col';

  export default {
    name: 'AddCryptos',
    data () {
      return {
        cryptos: cryptostorage.fetch(),
        newcrypto: '',
        cryptoAmount: '',
        cryptoDate: '',
        cryptoCurrency: ''
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
      }
    },
    components: {
      Datepicker,
      'b-container': bContainer,
      'b-row': bRow,
      'b-col': bCol
    }
  }
</script>

<style lang="scss" scoped>
  .add-cryptos {
    text-align: center;
    padding-top: 25px;
    h4 {
      margin-bottom: 20px;
    }
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
    }
  }
</style>
