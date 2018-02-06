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
  input.cc-input {
    font-size: 1rem;
    font-weight: 400;
    color: #005db4;
    padding-top: 0;
    padding-right: 10px;
    padding-bottom: 0;
    padding-left: 10px;
    box-sizing: border-box;
    width: 200px;
    min-height: 40px;
    border: 2px solid #ccc;
    outline: 0;
  }
</style>
