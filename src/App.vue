<template>
  <el-container style="height: 100%;">
    <el-aside style="width: 280px; height: 100%;">
      <aside-area></aside-area>
    </el-aside>
    <el-main>
      <router-view></router-view>
      <!--<test-area></test-area>-->
    </el-main>
  </el-container>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AsideArea from './components/AsideArea.vue'

export default {
  name: 'App',
  components: {
    "aside-area": AsideArea,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
