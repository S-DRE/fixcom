<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <navbar msg = "Navbar"/>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue"

export default {
  name: 'App',
  data: function () {
    return {
      user: null
    }
  },
  components: {
    navbar
  }
}
</script>
