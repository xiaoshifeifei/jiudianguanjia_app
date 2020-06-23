<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- <Tabbar v-if="$route.meta.showTabbar" /> -->
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
  /*
   * components: {
   *   Tabbar
   * }
   */
}
/*
 * @ is an alias to /src
 * import home from '@/assets/logo.png'
 */
</script>

<style lang="stylus">
@import "./common/css/base.css"

html,body,#app{
	width: 100%;
	height: 100%;
  background: #f9f9f9;
}
</style>
