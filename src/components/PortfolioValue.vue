<template>
  <div>
    <section>
      Purchase portfolio value: {{ portfolioValuePurchase }}
      <br>
      Portfolio value today: {{ portfolioValueToday }}
        <span v-if="portfolioValueTodayPercent > 0">
          (-{{ portfolioValueTodayPercent }})
        </span>
        <span v-else>
          (+{{ portfolioValueTodayPercent }})
        </span>
      <br>
      Portfolio value yesterday: {{ portfolioValueYesterday }}
        <span v-if="portfolioValueYesterdayPercent > 0">
          (-{{ portfolioValueYesterdayPercent }})
        </span>
        <span v-else>
          (+{{ portfolioValueYesterdayPercent }})
        </span>
    </section>
  </div>
</template>

<script>
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'PortfolioValue',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        portfolioValuePurchase: '',

        portfolioValueToday: '',
        portfolioValueTodayPercent: '',

        portfolioValueYesterday: '',
        portfolioValueYesterdayPercent: ''
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
        let valueFiat = this.portfolioValuePurchase - this.portfolioValueToday;
        this.portfolioValueTodayPercent = (valueFiat / this.portfolioValueToday) * 100;
      },
      valuePortfolioYesterday(){
        this.portfolioValueYesterday = 0;
        for (let i = 0; i < this.cryptos.length; i++) {
          let amountYesterdayDollar = this.cryptos[i].priceYesterday * this.cryptos[i].amount;
          this.portfolioValueYesterday+=amountYesterdayDollar;
        }
        let valueFiat = this.portfolioValueToday - this.portfolioValueYesterday;
        this.portfolioValueYesterdayPercent = (valueFiat / this.portfolioValueYesterday) * 100;
      }
    },
    mounted() {
      this.valuePortfolioPurchase();
      this.valuePortfolioToday();
      this.valuePortfolioYesterday();
    }
  }
</script>

<style scoped>

</style>
