<template>
  <div class="wrapper">
    <div class="rating"  v-for="(rating, index) in ratings" :key="index">
      <single-rating :rating="rating"></single-rating>
    </div>
  </div>
</template>

<script>
import SingleRating from '@/components/rating/single-rating/Single-Rating';
export default {
  name: 'rating-list',
  props: ['ratings'],
  data(){
    return {
    }
  },
  components: { SingleRating }
};
</script>

<style scoped>

</style>
