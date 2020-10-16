<template>
  <div class="wrapper">
    <img class="image" :src="rating.imageUrl" alt="Image">
    <div class="info">
      <h3 class="name">{{rating.name}}</h3>
      <p class="description">{{rating.description}}</p>
    </div>
    <rate class="rate" :length="5" :readonly="true" :value="rating.rate"></rate>
  </div>
</template>

<script>
export default {
  props: ['rating'],
  data() {
    return {
      name: 'Single-Rating'
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/styles/variables";

  .wrapper {
    border: 2px solid $pharma_yellow;
    padding: 2rem;
    max-width: 700px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
    margin-bottom: 15px;
    .image {
      margin: auto auto;
      max-width: 150px;
      max-height: 150px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 7px solid $pharma_yellow;
    }
    .info {
      text-align: left;
      .name {
        font-size: 22px;
      }
    }

    .rate {
      margin: auto auto;
    }

  }

</style>
