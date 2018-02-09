<template>
  <header>
    <h1>Your Portfolio Balance</h1>
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
    h1 {
      color: #FFF;
      text-align: center;
      font-size: 16px;
      text-transform: uppercase;
      font-family: "Droid Sans";
    }
  }
</style>
