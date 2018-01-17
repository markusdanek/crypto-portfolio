<template>
  <div>

    <!-- <pre>{{ $data }}</pre> -->

    <input autofocus autocomplete="off" placeholder="Crypto name" v-model="newcrypto">
    <input autocomplete="off" placeholder="Amount" v-model="cryptoAmount" @keyup.enter="addcrypto">
    <datepicker v-model="cryptoDate" name="cryptoDate" placeholder="Date of purchase"></datepicker>

    <button type="button" name="button" @click="addcrypto">Add</button>

    <section v-show="cryptos.length" v-cloak>
      <ul class="todo-list">
        <li v-for="crypto in filteredcryptos" :key="crypto.id">
          <div>
            <label>{{ crypto.title }} (Amount: {{ crypto.amount }}, Date: {{ crypto.date }})</label>
            <button class="destroy" @click="removecrypto(crypto)"></button>
          </div>
        </li>
      </ul>
    </section>

    <div v-show="cryptos.length" v-cloak></div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import { cryptostorage } from '../api/utils';

  let filters = {
    all: function (cryptos) {
      return cryptos
    }
  }

  export default {
    name: 'Main',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        newcrypto: '',
        cryptoAmount: '',
        cryptoDate: '',
        editedcrypto: null,
        visibility: 'all'
      }
    },
    watch: {
      cryptos: {
        handler: function (cryptos) {
          cryptostorage.save(cryptos)
        },
        deep: true
      }
    },
    computed: {
      filteredcryptos: function () {
        return filters[this.visibility](this.cryptos)
      }
    },
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items'
      }
    },
    methods: {
      addcrypto: function () {
        let title = this.newcrypto && this.newcrypto.trim()
        let amount = this.cryptoAmount && this.cryptoAmount.trim()
        let date = this.cryptoDate
        if (!title) {
          return
        }
        this.cryptos.push({
          id: cryptostorage.uid++,
          title: title,
          amount: amount,
          date: date
        })
        this.newcrypto = ''
        this.cryptoAmount = ''
        this.cryptoDate = ''
      },
      removecrypto: function (crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>
