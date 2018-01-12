<template>
  <div>
    <input autofocus autocomplete="off" placeholder="Cryptocurreny" v-model="newcrypto">
    <input autocomplete="off" placeholder="How much?" v-model="newcrypto2" @keyup.enter="addcrypto">
    <button type="button" name="button" @click="addcrypto">Add</button>

    <section v-show="cryptos.length" v-cloak>
      <ul class="todo-list">
        <li v-for="crypto in filteredcryptos" :key="crypto.id">
          <div>
            <label>{{ crypto.title }} - {{ crypto.amount }}</label>
            <button class="destroy" @click="removecrypto(crypto)"></button>
          </div>
        </li>
      </ul>
    </section>

    <div v-show="cryptos.length" v-cloak></div>
  </div>
</template>

<script>
  var STORAGE_KEY = 'cryptocurrency'
  var cryptostorage = {
    fetch: function () {
      var cryptos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      cryptos.forEach(function (crypto, index) {
        crypto.id = index
      })
      cryptostorage.uid = cryptos.length
      return cryptos
    },
    save: function (cryptos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cryptos))
    }
  }

  var filters = {
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
        newcrypto2: '',
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
        var value = this.newcrypto && this.newcrypto.trim()
        var amount = this.newcrypto2 && this.newcrypto2.trim()
        if (!value) {
          return
        }
        this.cryptos.push({
          id: cryptostorage.uid++,
          title: value,
          amount: amount
        })
        this.newcrypto = ''
      },
      removecrypto: function (crypto) {
        this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
      }
    },
    directives: {
      'crypto-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>
