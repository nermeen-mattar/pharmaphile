<template>
 <div></div>
</template>

<script>
export default {
  name: 'RegisterModal',
  mounted() {
    console.log('mounted!');
  },
  created() {
    console.log('craetedd!');
  }
};
</script>

<style lang="scss">
.login-reg-modal-wrapper {
  .v--modal-box {
    max-height: 100vh;
    overflow: scroll !important;
  }
}
</style>
