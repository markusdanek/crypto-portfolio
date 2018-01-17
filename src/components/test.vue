<template>
  <div>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
  import { getPrice } from '../api/crypto';
  export default {
    name: 'test',
    data () {
      return {
        cryptoPrice: []
      }
    },
    created() {
      getPrice('ETH').then((res)=>{
          this.cryptoPrice = res;
        }).catch((err)=>{
            return err;
        });
    }
  }
</script>

<style scoped>
</style>
