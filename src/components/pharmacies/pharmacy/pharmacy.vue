<template>
  <div @click="onPharmacyClick" class="pharmacy-wrapper">
    <img alt="Pharmacy Image" class="pharmacy-image" :src="pharmacy.imageUrl">
    <div class="innerWrapper">
      <h3 class="pharmacy-title">{{ pharmacy.name }}</h3>
      <div class="pharmacy-info">
        <p class="icon-person info">{{ pharmacy.manager }}</p>
      </div>
      <div class="pharmacy-info">
        <p class="icon-location info">{{pharmacy.address}}</p>
      </div>
      <div class="pharmacy-info">
        <p class="icon-email info">{{ pharmacy.email }}</p>
      </div>
      <div class="pharmacy-info">
        <p class="icon-phone info">{{ pharmacy.phone }}</p>
      </div>
      <div class="rating">
        <rate :length="5" :value="2"/>
      </div>
    </div>
  </div>
</template>

<script>

// import bus from '@/services/bus';
import { mapActions } from 'vuex';

export default {
  props: ['pharmacy'],
  name: 'pharmacy',
  methods: {
    ...mapActions(['selectPharmacy']),
    onPharmacyClick() {
      this.selectPharmacy(this.pharmacy);
      // bus.$emit('pharmacy_data', this.pharmacy);
      this.$router.push(`/pharmacy/${this.pharmacy.uuid}`).catch(()=>{}); 
      /* followin gare covered in selectPharmacy */
      // this.$store.dispatch('search');  /* to reset the pharmacies state */
      // this.$store.dispatch('getRelatedPharmacies'); /* to update the related pharmacies */
    }
  }
};
</script>

<style lang="scss" scoped>

.pharmacy-wrapper {
  cursor: pointer;
  background: #FFFFFF;
  border: 2px solid #FFC200;
  box-sizing: border-box;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
  width: auto;

  .icon-person::before {
    width: 25px;
    height: 25px;
    margin-right: 10px;

    content: url('../../../assets/pharmacy_person.png')
  }

  .icon-email::before {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    content: url('../../../assets/pharmacy_email.png');
  }

  .icon-location::before {
    width: 25px;
    margin-right: 10px;
    height: 25px;
    content: url('../../../assets/pharmacy_location.png');
  }

  .icon-phone::before {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    content: url('../../../assets/pharmacy_phone.png');
  }

  .innerWrapper {
    text-align: left;
    padding: 16px;
  }

  .pharmacy-image {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    max-width: 300px;
    min-width: 300px;
    min-height: 150px;
    height: 170px;
  }

  .pharmacy-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    color: #000000;
  }

  .pharmacy-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .info {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 18px;
      color: #000000;
    }
  }

}
</style>
