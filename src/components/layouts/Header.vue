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
    background: linear-gradient(135deg, #4965C3 0%,#4B57A8 100%);
    h1 {
      color: #FFF;
      text-align: center;
      font-size: 16px;
      font-family: "Droid Sans";
    }
  }
</style>
