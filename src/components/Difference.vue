<template>
  <div>

    <pre>{{ $data }}</pre>

  </div>
</template>

<script>
  import { cryptostorage } from '../api/utils';

  export default {
    name: 'Difference',

    data () {
      return {
        cryptos: cryptostorage.fetch(),
        differenceToday: '',
        differenceYesterday: ''
      }
    },
    methods: {
      getPercentageChange(oldNumber, newNumber) {
        let decreaseValue = oldNumber - newNumber;
        return (decreaseValue / oldNumber) * 100;
      },
      differenceForToday() {
        let decreaseValue = [];
        let decreaseValuePct = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let purchaseDatePrice = this.cryptos[i].purchaseDatePrice;
          let todayValue = this.cryptos[i].priceToday;
          let valueUSD = purchaseDatePrice - todayValue;
          let diffInPct = (valueUSD / todayValue) * 100;
          decreaseValue.push(valueUSD);
          decreaseValuePct.push(diffInPct);
        }
        console.log("today", decreaseValue);
        console.log("today pct", decreaseValuePct);
        this.differenceToday = decreaseValue.reduce((pv, cv) => pv+cv, 0);
      },
      differenceForYesterday() {
        let decreaseValue = [];
        let decreaseValuePct = [];
        for (let i = 0; i < this.cryptos.length; i++) {
          let purchaseDatePrice = this.cryptos[i].purchaseDatePrice;
          let yesterdayValue = this.cryptos[i].priceYesterday;
          let valueUSD = purchaseDatePrice - yesterdayValue;
          let diffInPct = (valueUSD / yesterdayValue) * 100;
          decreaseValue.push(valueUSD);
          decreaseValuePct.push(diffInPct);
        }
        // console.log("yesterday", decreaseValue);
        // console.log("yesterday pct", decreaseValuePct);
        // this.differenceToday = decreaseValue.reduce((pv, cv) => pv+cv, 0);
      }
    },
    mounted() {
      this.differenceForToday();
      this.differenceForYesterday();
    }
  }
</script>

<style scoped>

</style>
