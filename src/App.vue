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

<style>
  html {
    overflow-x: hidden;
    overflow-y: auto;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
    font-size: 14px;
    line-height: 1.42857143;
    color: #000;
  }
</style>
