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
        cryptocurrency: getPrice('ETH')
      }
    }
  }
</script>

<style scoped>
</style>
