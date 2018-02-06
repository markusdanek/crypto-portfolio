<template>
  <div>
    <button type="button" name="button" @click="addCryptoToStorage">Set personal coins to storage</button>
  </div>
</template>

<script>
  import { cryptostorage } from '../api/utils';
  import { personalCoins } from '../api/coins';

  export default {
    name: 'Test',
    methods: {
      addCryptoToStorage(){
        cryptostorage.save(personalCoins);
      }
    }
  }
</script>
