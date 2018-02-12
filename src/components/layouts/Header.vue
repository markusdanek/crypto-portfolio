<template>
  <header>
    <h1>Your portfolio balance</h1>
    <portfolioValue></portfolioValue>
  </header>
</template>

<script>
  import PortfolioValue from '@/components/PortfolioValue';
  import bContainer from 'bootstrap-vue/es/components/layout/container';
  export default {
    name: 'Header',
    components: {
      PortfolioValue,
      'b-container': bContainer,
    }
  }
</script>

<style lang="scss" scoped>
  header {
    padding: 25px 0;
    // background: url("/static/main_bg.jpg") no-repeat;
    // background-size: cover;
    h1 {
      color: #FFF;
      text-align: center;
      font-size: 16px;
      // text-transform: uppercase;
      font-family: "Droid Sans";
    }
  }
</style>
