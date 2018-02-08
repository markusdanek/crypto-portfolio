<template>
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
