<template>
  <header>
    <portfolioValue></portfolioValue>
  </header>
</template>

<script>
  import PortfolioValue from '@/components/PortfolioValue';
  export default {
    name: 'Header',
    components: {
      PortfolioValue
    }
  }
</script>

<style lang="scss" scoped>
  header {
    padding: 25px 0;
    background: url("/static/main_bg.jpg") no-repeat;
    background-size: cover;
  }
</style>
