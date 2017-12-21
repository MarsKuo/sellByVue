<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--3 使用組件 -->
    <HelloWorld/>
    <Test />
  </div>
</template>

<script>
  //1 先導入組件
  import HelloWorld from './components/HelloWorld'
  import Test from './components/test'
  //2 註冊組件
  export default {
    name: 'app',
    components: {
      HelloWorld,
      Test
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
