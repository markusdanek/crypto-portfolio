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
    background: #F9F9F9;
    color: #000000;
  }
  input.cc-input {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  @media (max-width: 576px) {
    input.cc-input {
      width: 100%;
    }
  }
</style>
