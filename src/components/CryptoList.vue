<template>
  <div class="computed-crypto" v-show="cryptos.length" v-cloak>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <h5>Your cryptocurrencies:</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <b-row v-for="crypto in cryptos" :key="crypto.id" class="crypto-item">
          <b-col sm="3" md="3" lg="1">{{ crypto.title }}</b-col>
          <b-col sm="3" md="3" lg="1">{{ crypto.amount }}</b-col>
          <b-col sm="3" md="3" lg="1"><button class="destroy" @click="removeCrypto(crypto)">Delete</button></b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import Vue from 'vue';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../helpers/utils';

  export default {
    name: 'CryptoList',
    data () {
      return {
        cryptos: cryptostorage.fetch(),
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
      removeCrypto(crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      }
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  .computed-crypto {
    padding: 30px 0;
    h5 {
      text-align: left;
    }
    .crypto-item {
      padding: 0 0 0 50px;
      text-align: left;
    }
  }
</style>
