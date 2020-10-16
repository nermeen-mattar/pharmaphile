<template>
  <div class="search-wrapper">
    <i class="icon-label"></i>
    <input ref="search"  @change="doSearch" v-on:keypress="doSearch" v-model="payload" class="form-control" type="text" id="search" name="search" placeholder="Search...">
    <p style="text-align: right; padding: 8px; cursor: pointer">need help ?</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'SearchComponent',
      payload: ''
    }
  },
  methods: {
    doSearch() {
      console.log(this.payload);
      this.$store.dispatch('search', this.payload);
    }
  },
  watch() {
    this.$refs('search').on('type', (data) => {
      console.log('data', data);
    })
  }
};
</script>

<style lang="scss" scoped>

  .search-wrapper {
    top: -20px;
    position: relative;
    z-index: 1000;
    background: none;
    margin: 0 auto;
    width: 50%;

    .icon-label {
      content: url("../../assets/searchicon.png");
      width: 20px;
      height: 20px;
      position: absolute;
      top: 10px;
      left: 15px;
    }

    .form-control {
      margin-top: 5px;
      padding: 1.3rem 1.8rem 1.3rem 3rem;
      font-size: 16px;
      color: black;
      background: #FDFDFD;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      line-height: 21px;
    }
  }
</style>
