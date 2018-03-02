<template>
  <div>
    <!-- <pre>
      PortfolioValue.vue:
      {{ $data }}
    </pre> -->
    <section class="portfolio-value">
      <div v-if="portfolioValueToday > 0">
        <div class="portfolio-value--today">
          <p class="main">
            € {{ portfolioValueToday }}
            <!-- <span class="percentage" v-bind:class="{ positive: isPositivToday }">{{ portfolioValueTodayPercent }}% </span> -->
          </p>
          <p v-if="portfolioValueToday - portfolioValuePurchase > 0">
            <span class="portfolioPositive">
              {{ portfolioValueToday - portfolioValuePurchase }} (+{{ portfolioValueTodayPercent }}%)
            </span>
          </p>
          <p v-else>
            <span class="portfolioNegative">
              {{ portfolioValueToday - portfolioValuePurchase | round(2) }} ({{ portfolioValueTodayPercent }}%)
            </span>
          </p>
        </div>
      </div>
      <div class="intro" v-else>
        <img src="static/logo.png" alt="" width="50">
        <h1>MyCryptoCoins</h1>
      </div>
    </section>
  </div>
</template>

<script>
  import { cryptostorage } from '../helpers/utils';

  export default {
    name: 'PortfolioValue',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        portfolioValuePurchase: 0,
        portfolioValueToday: 0,
        portfolioValueTodayPercent: 0,
        isPositivToday: false,
        portfolioValueYesterday: 0,
        portfolioValueYesterdayPercent: 0,
        isPositivYesterday: false
      }
    },
    props: ['portfolio'],
    filters: {
      round: function(value, decimals){
        if(!value) {
          value = 0;
        }
        if(!decimals) {
          decimals = 0;
        }
        value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value;
      }
    },
    methods: {
      valuePortfolioPurchase(){
        let tempSum = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          tempSum+=this.cryptos[i].purchaseValueFiat;
        }
        this.portfolioValuePurchase = tempSum.toFixed(2);
      },
      valuePortfolioToday(){
        let tempSumToday = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          let amountTodayDollar = this.cryptos[i].priceToday * this.cryptos[i].amount;
          tempSumToday+=amountTodayDollar;
        }
        this.portfolioValueToday = tempSumToday;

        let valueFiat = this.portfolioValuePurchase - tempSumToday;
        let tempPctToday = 0;
        tempPctToday = (valueFiat / tempSumToday) * 100;
        tempPctToday = tempPctToday.toFixed(2);
        tempPctToday = tempPctToday * -1;
        this.portfolioValueTodayPercent = tempPctToday;

        if(tempPctToday > 0) {
          this.isPositivToday = true;
        } else {
          this.isPositivToday = false;
        }
      },
      valuePortfolioYesterday(){
        this.portfolioValueYesterday = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          let amountYesterdayDollar = this.cryptos[i].priceYesterday * this.cryptos[i].amount;
          this.portfolioValueYesterday+=amountYesterdayDollar;
        }
        this.portfolioValueYesterday = this.portfolioValueYesterday.toFixed(2);
        let valueFiat = this.portfolioValueToday - this.portfolioValueYesterday;
        this.portfolioValueYesterdayPercent = (valueFiat / this.portfolioValueYesterday) * 100;
        this.portfolioValueYesterdayPercent = this.portfolioValueYesterdayPercent.toFixed(2);
        this.portfolioValueYesterdayPercent = this.portfolioValueYesterdayPercent * -1;

        if(this.portfolioValueYesterdayPercent > 0) {
          this.isPositivYesterday = true;
        } else {
          this.isPositivYesterday = false;
        }
      }
    },
    mounted() {
      this.valuePortfolioPurchase();
      this.valuePortfolioToday();
      this.valuePortfolioYesterday();
    }
  }
</script>

<style lang="scss">
  .portfolio-value {
    font-family: "Droid Serif";
    text-align: center;
    .intro {
      img, h1 {
        display: inline;
      }
      h1 {
        position: relative;
        top: 8px;
        left: 20px;
      }
    }
    h1 {
      font-family: "Droid Sans";
      color: #FFF;
    }
    &--today {
      display: inline-block;
      p {
        color: #FFFFFF;
        &.main {
          margin: 0;
          font-size: 50px;
          font-weight: bold;
        }
        span {
          font-size: 20px;
          &.percentage {
            font-family: "Droid Serif";
            position: relative;
            top: -10px;
            background: #4B57A8;
            padding: 5px;
            font-size: 20px;
            color: #FF140C;
            &.positiv {
              color: #7BEB6E;
            }
          }
          &.portfolioPositive {
            color: #7BEB6E;
          }
          &.portfolioNegative {
            color: #FF140C;
          }
        }
      }
    }
  }
</style>
