<template>
  <div>
    <section class="portfolio-value">
      <div v-if="portfolioValueToday > 0">
        <div class="portfolio-value--today">
          <p>
            € {{ portfolioValueToday }}
            <span class="percentage" v-bind:class="{ positive: isPositivToday }">{{ portfolioValueTodayPercent }}% </span>
          </p>
        </div>
        <div class="portfolio-stats">
          <div class="portfolio-stats--purchase">
            <p>
              Purchase value: {{ portfolioValuePurchase }}
              <!-- <span>Purchase value</span> -->
            </p>
          </div>
          <div class="portfolio-stats--yesterday">
            <p>
              Yesterday: {{ portfolioValueYesterday }}
              <!-- <span>{{ portfolioValueYesterdayPercent }}% yesterday</span> -->
              <span>{{ portfolioValueYesterdayPercent }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Please add a cryptocurrency!</h1>
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
        portfolioValuePurchase: '',

        portfolioValueToday: '',
        portfolioValueTodayPercent: '',
        isPositivToday: true,

        portfolioValueYesterday: '',
        portfolioValueYesterdayPercent: '',
        isPositivYesterday: false,
      }
    },
    props: ['portfolio'],
    methods: {
      valuePortfolioPurchase(){
        this.portfolioValuePurchase = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          this.portfolioValuePurchase+=this.cryptos[i].purchaseValueFiat;
        }
      },
      valuePortfolioToday(){
        this.portfolioValueToday = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          let amountTodayDollar = this.cryptos[i].priceToday * this.cryptos[i].amount;
          this.portfolioValueToday+=amountTodayDollar;
        }
        this.portfolioValueToday = this.portfolioValueToday.toFixed(2);
        let valueFiat = this.portfolioValuePurchase - this.portfolioValueToday;
        this.portfolioValueTodayPercent = (valueFiat / this.portfolioValueToday) * 100;
        this.portfolioValueTodayPercent = this.portfolioValueTodayPercent.toFixed(2);
        this.portfolioValueTodayPercent = this.portfolioValueTodayPercent * -1;
        if(this.portfolioValueTodayPercent > 0) {
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
    font-family: Droid Sans;
    text-align: center;
    h1 {
      font-size: 40px;
      text-align: center;
    }
    h1, p, span {
      color: #FFF;
    }

    &--today {
      display: inline-block;
      p {
        margin: 0;
        font-size: 50px;
        span {
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
      }
    }

    .portfolio-stats {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-gap: 0px;
      &--purchase {
        text-align: right;
        margin-right: 20px;
        p {
          font-size: 20px;
          span {
            position: relative;
            top: -3px;
            background: #4B57A8;
            padding: 5px;
            font-size: 15px;
          }
        }
      }
      &--yesterday {
        text-align: left;
        margin-left: 20px;
        p {
          font-size: 20px;
          span {
            position: relative;
            top: -3px;
            background: #4B57A8;
            padding: 5px;
            font-size: 15px;
          }
        }
      }
    }
  }
</style>
