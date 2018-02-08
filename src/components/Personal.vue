<template>
  <div>
    <button type="button" name="button" @click="addCryptoToStorage">Set personal coins to storage</button>
  </div>
</template>

<script>
  import { cryptostorage } from '../helpers/utils';
  import { personalCoins } from '../helpers/coins';

  export default {
    name: 'Test',
    methods: {
      addCryptoToStorage(){
        cryptostorage.save(personalCoins);
      }
    }
  }
</script>
