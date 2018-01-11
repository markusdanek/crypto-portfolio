<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
