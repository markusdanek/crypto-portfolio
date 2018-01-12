<template>
  <div>
      <input
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newcrypto"
        @keyup.enter="addcrypto">

      <section v-show="cryptos.length" v-cloak>
        <!-- <input type="checkbox" v-model="allDone"> -->
        <ul class="todo-list">
          <li v-for="crypto in filteredcryptos"
              :key="crypto.id"
              :class="{ completed: crypto.completed, editing: crypto == editedcrypto }">

            <div>
              <label @dblclick="editcrypto(crypto)">{{ crypto.title }}</label>
              <button class="destroy" @click="removecrypto(crypto)"></button>
            </div>
            <input class="edit" type="text" v-model="crypto.title" v-crypto-focus="crypto == editedcrypto" @blur="doneEdit(crypto)" @keyup.enter="doneEdit(crypto)" @keyup.esc="cancelEdit(crypto)">
          </li>
        </ul>
      </section>

      <div class="footer" v-show="cryptos.length" v-cloak></div>

  </div>
</template>

<script>

var STORAGE_KEY = 'cryptoCurrencies'
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
  },
  active: function (cryptos) {
    return cryptos.filter(function (crypto) {
      return !crypto.completed
    })
  },
  completed: function (cryptos) {
    return cryptos.filter(function (crypto) {
      return crypto.completed
    })
  }
}

export default {
  name: 'Main',

  data () {
    return {
    cryptos: cryptostorage.fetch(),
    newcrypto: '',
    editedcrypto: null,
    visibility: 'all'
  }
  },

  // watch cryptos change for localStorage persistence
  watch: {
    cryptos: {
      handler: function (cryptos) {
        cryptostorage.save(cryptos)
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredcryptos: function () {
      return filters[this.visibility](this.cryptos)
    },
    remaining: function () {
      return filters.active(this.cryptos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.cryptos.forEach(function (crypto) {
          crypto.completed = value
        })
      }
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
      if (!value) {
        return
      }
      this.cryptos.push({
        id: cryptostorage.uid++,
        title: value
      })
      this.newcrypto = ''
    },

    removecrypto: function (crypto) {
      this.cryptos.splice(this.cryptos.indexOf(crypto), 1)
    },

    editcrypto: function (crypto) {
      this.beforeEditCache = crypto.title
      this.editedcrypto = crypto
    },

    doneEdit: function (crypto) {
      if (!this.editedcrypto) {
        return
      }
      this.editedcrypto = null
      crypto.title = crypto.title.trim()
      if (!crypto.title) {
        this.removecrypto(crypto)
      }
    },

    cancelEdit: function (crypto) {
      this.editedcrypto = null
      crypto.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.cryptos = filters.active(this.cryptos)
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
  [v-cloak] { display: none; }
  .todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: 506px;
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle:after {
	content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
}

.todo-list li .toggle:checked:after {
	content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 60px 15px 15px;
	margin-left: 45px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}
  h1,
  h2 {
    font-weight: normal;
  }
</style>
