<template>
  <div class="">
    <QrcodeReader
      @decode="onDecode"
      @init="onInit">
      <div class="decoded-content">{{ content }}</div>

      <LoadingIndicator v-show="loading" />
    </QrcodeReader>

    <VueQrcode :value="cryptosQR" :options="{ size: 600 }"></VueQrcode>
  </div>
</template>

<script>
  import { QrcodeReader } from 'vue-qrcode-reader';
  import InitHandler from '@/mixins/InitHandler';
  import VueQrcode from '@xkeshi/vue-qrcode';
  import { cryptostorage } from '../helpers/utils';

  export default {
    components: {
      QrcodeReader,
      VueQrcode
    },
    mixins: [ InitHandler ],
    data () {
      return {
        content: '',
        cryptos: cryptostorage.fetch(),
        cryptosQR : ''
      }
    },
    methods: {
      onDecode (content) {
        this.content = content
      },
      convertCrypto() {
        let test = this.cryptos;
        test.forEach(function(line) {
            delete line['priceToday'];
            delete line['priceYesterday'];
            delete line['purchaseDatePrice'];
            delete line['purchaseValueFiat'];
            delete line['id'];
        });
        this.cryptosQR = JSON.stringify(test);
      }
    },
    mounted() {
      this.convertCrypto();
    }
  }
</script>

<style scoped>
  .decoded-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    padding: 0px 20px;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0,0,0,.5);
  }
</style>
