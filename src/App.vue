<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  html {
    overflow-x: hidden;
    overflow-y: auto;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
    font-size: 14px;
    line-height: 1.42857143;
    background: #f9f9f9;
    color: #000000;
  }
  input.cc-input {
    font-size: 1rem;
    font-weight: 400;
    color: #005DB4;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    width: 200px;
    min-height: 40px;
    border: 2px solid #CCCCCC;
    outline: 0;
  }
  .container {
    background: #FFFFFF;
  }
</style>
