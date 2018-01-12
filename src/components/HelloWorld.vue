<template>
  <div>
    <h1>crypto-portfolio</h1>
    <!-- <input v-model="crypto" v-on:input="set_data" > -->

    <div v-for="coin in cryptocurrency">
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
      // cryptoStorage: localStorage.getItem('cryptocurrencies'),
      cryptocurrency: []
    }
  },
  methods: {
  	set_data() {
      localStorage.setItem( 'cryptocurrencies', this.cryptocurrency );
      this.cryptocurrency = this.get_data();
  	},
    get_data(){
      return localStorage.getItem( 'cryptocurrencies' );
    },
    addCrypto() {
      this.cryptocurrency.push({ coin: '' });
      localStorage.setItem( 'cryptocurrencies', JSON.stringify(this.cryptocurrency));
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
