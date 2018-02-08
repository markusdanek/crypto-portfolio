<template>
  <b-container class="computed-crypto" v-show="cryptos.length" v-cloak>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <h5>Your cryptocurrencies:</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12" offset="1">
        <ul class="todo-list">
          <li v-for="crypto in cryptos" :key="crypto.id">
            <div>
              <label>{{ crypto.title }} (Amount: {{ crypto.amount }})</label>
              <button class="destroy" @click="removeCrypto(crypto)">Delete</button>
            </div>
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

  import Vue from 'vue';
  import { getPrice, getPriceForTimestamp } from '../api/crypto';
  import { cryptostorage } from '../helpers/utils';
  import bContainer from 'bootstrap-vue/es/components/layout/container';
  import bRow from 'bootstrap-vue/es/components/layout/row';
  import bCol from 'bootstrap-vue/es/components/layout/col';

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
      'b-container': bContainer,
      'b-row': bRow,
      'b-col': bCol
    }
  }
</script>

<style lang="scss" scoped>
  .computed-crypto {
    padding: 30px 0;
    h5 {
      text-align: left;
    }
    ul {
      text-align: left;
      padding: 0;
      li {
        list-style-type: none;
      }
    }
  }
</style>
