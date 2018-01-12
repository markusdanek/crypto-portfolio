<template>
  <div>
    <h1>crypto-portfolio</h1>

    <div v-for="coin in cryptocurrency">
      <input v-model="coin.name">
      <input v-model="coin.value">
    </div>
    <button @click="addCrypto">
      New Cryptocurreny
    </button>
    <pre>{{ $data }}</pre>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      cryptocurrency: [],
    }
  },
  methods: {
  	set_data() {
      localStorage.setItem( 'cryptocurrencies', JSON.stringify(this.cryptocurrency) );
      this.cryptocurrency = this.get_data();
  	},
    get_data(){
      return localStorage.getItem('cryptocurrencies');
    },
    addCrypto() {
      localStorage.setItem( 'cryptocurrencies', JSON.stringify(this.cryptocurrency) );
      this.cryptocurrency.push({ name: '', value: ''});
    }
  }
}
</script>

<style scoped>

</style>
