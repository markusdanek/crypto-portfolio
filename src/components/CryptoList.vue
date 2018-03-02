<template>
  <div class="computed-crypto" v-show="cryptos.length" v-cloak>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <h5>Your cryptocurrencies:</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <div v-for="crypto in cryptoGrouped" :key="crypto.id" class="crypto-item">
          <b-row v-for="coin in crypto" :key="coin.id">
            <b-col sm="3" md="3" lg="1">{{ coin.title }}</b-col>
            <b-col sm="3" md="3" lg="1">{{ coin.amount }}</b-col>
            <b-col sm="3" md="3" lg="1"><button class="destroy" @click="removeCrypto(crypto)">Delete</button></b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
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

  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../helpers/utils';

  export default {
    name: 'CryptoList',
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
      removeCrypto(crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      }
    },
    mounted() {
      this.cryptoGrouped = this.cryptos.groupBy('title');
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
