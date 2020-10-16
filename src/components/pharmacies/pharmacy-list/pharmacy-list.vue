<template>
  <div class="wrapper">
    <div class="pharmacy"  v-for="(pharmacy, index) in $store.state.pharmacies" :key="index">
      <pharmacy :pharmacy="pharmacy"></pharmacy>
    </div>
  </div>
</template>

<script>
import Pharmacy from '@/components/pharmacies/pharmacy/pharmacy';
export default {
  data() {
    return {
      name: 'pharmacy-list',
      pharmacies: [
        {
          title: 'Talal Pharmacy',
          pharmacist: 'Dr. haneen mustafa',
          location: 'Al-balqa - ahmad st',
          email: 'infopharmacy@email.com',
          phone: '0798654321'
        },
        {
          title: 'Talal Pharmacy',
          pharmacist: 'Dr. haneen mustafa',
          location: 'Al-balqa - ahmad st',
          email: 'infopharmacy@email.com',
          phone: '0798654321'
        },
        {
          title: 'Talal Pharmacy',
          pharmacist: 'Dr. haneen mustafa',
          location: 'Al-balqa - ahmad st',
          email: 'infopharmacy@email.com',
          phone: '0798654321'
        }
      ]
    }
  },
  components: { Pharmacy }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 0 auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .pharmacy {
      margin: 5px;
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      margin: 0 auto;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pharmacy {
        margin: 5px;
      }
    }
  }
</style>
