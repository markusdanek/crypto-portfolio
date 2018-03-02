<template>
  <div class="add-cryptos">
    <pre>
      AddCrypto.vue:
      {{ $data }}
    </pre>
    <h4>Add your cryptocoins</h4>
    <b-row>
      <b-col sm="12" md="10" lg="10" offset-md="1">
        <b-form inline>
          <b-input autofocus class="mb-2 mr-sm-2 mb-sm-2" id="cryptoName" placeholder="Name (BTC)" v-model="newcrypto" />
          <b-input class="mb-2 mr-sm-2 mb-sm-2" id="cryptoAmount" placeholder="Amount (0.001)" v-model="cryptoAmount" @keyup.enter="addCrypto" />
          <b-input class="mb-2 mr-sm-2 mb-sm-2" id="cryptoCurrency" placeholder="Currency (USD)" v-model="cryptoCurrency" @keyup.enter="addCrypto" />
          <datepicker input-class="cc-input mb-2 mr-sm-2 mb-sm-2" v-model="cryptoDate" name="cryptoDate" placeholder="Date of purchase"></datepicker>
          <b-button name="addCrypto" variant="primary" @click="addCrypto">Add Coin</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {cryptostorage} from '../helpers/utils';
  import {getPrice, getPriceForTimestamp} from '../api/crypto';
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'AddCryptos',
    data() {
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
        let historicPrice = getPriceForTimestamp(title, new Date(date).toISOString(), currency);
        Promise.all([historicPrice]).then((values) => {
          let cryptoValue = 0;
          let cryptoAmount = amount;
          let cryptoPrice = values[0];
          let value;
          if (cryptoAmount != null && cryptoPrice != null) {
            value = parseInt(cryptoAmount * cryptoPrice);
            cryptoValue += value;
          }

          let priceToday = [];
          let priceTodayPromise = getPrice(title, currency)
            .then((values)=>{
              priceToday.push(values);
            }).catch((err)=>{
                return err;
          });

          this.cryptos.push({
            id: cryptostorage.uid++,
            title: title,
            amount: amount,
            currency: currency,
            purchaseDate: date,
            purchaseDatePrice: values[0],
            purchaseValueFiat: cryptoValue,
            priceToday: priceToday[0]
          });

        }).catch(e => console.error(e));
        this.newcrypto = '';
        this.cryptoAmount = '';
        this.cryptoDate = '';
        this.cryptoCurrency = '';
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
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style lang="scss" scoped>
  .add-cryptos {
    text-align: center;
    padding: 50px 0 25px;
    h4 {
      margin-bottom: 20px;
    }
    .vdp-datepicker {
        display: inline-block;
    }
    @media (max-width: 576px) {
      .vdp-datepicker {
        display: block;
        width: 100%;
      }
    }
    .form-inline {
      button {
        position: relative;
        top: -4px;
        background: #4965C3;
        &:hover {
          background: #4B57A8;
        }
      }
    }
  }
</style>
