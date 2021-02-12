<template>
  <div id="app">
  <Banner> </Banner>
    <router-view />
  </div>
</template>


<script>
import Banner from '@/components/banner/BannerComponent';

export default {
  name: 'App',
  data() {
    return {
      // key: value
    }
  },
  props: [],
  computed: {
  },
components: { Banner }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height:100%;
}

body {
  height: 100%;
  //background: url("~@/assets/bg.png") no-repeat center;
  background-size: cover;
}

#app {
  height:100%;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: margin-left 0.5s;
}

#app.guest {
button:not(.Rate__star):not(.contactButton):not(.applyButton):not(.signUpButton) { // input:not(.Rate__star)
        background:#bbb;
        // cursor: not-allowed!important;
        pointer-events: none;
  }
}

#app:not(.guest) {
  .signup-banner {
    display:none;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
