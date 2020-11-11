<template>
  <div class="about min-vh-100">
    <div class="container min-vw-100 p-0 m-0">
      <div class="min-vw-100" v-if="$store.getters.getUserProfile">
        <navbar></navbar>
      </div>
      <div class="min-vw-100">
        <img alt="" class="slider-logo" src="../assets/logo.png" width="200">
        <image-slider-component></image-slider-component>
      </div>
      <div class="how-section1">
        <div class="row align-items-center">
          <div class="col-md-8 how-img">
            <img alt="" src="../assets/getetoknowus.png"/>
          </div>
          <div class="col-md-4 icon-image">
            <img alt="" src="../assets/gettoknowusicon.png" width="300"/>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4 icon-image">
            <img alt="" src="../assets/outvisionicon.png" width="320"/>
          </div>
          <div class="col-md-8 how-img align-items-center">
            <img alt="" class=" img-fluid" src="../assets/ourvision.png"/>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-8 how-img">
            <img alt="" class=" img-fluid" src="../assets/ourmission.png"/>
          </div>
          <div class="col-md-4 icon-image">
            <img alt="" src="../assets/ourmissionicon.png" width="320"/>
          </div>
        </div>
      </div>
      <div class="row">
        <footer-component></footer-component>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import FooterComponent from '@/components/footer/FooterComponent';
import ImageSliderComponent from '@/components/slider/ImageSliderComponent';
import Navbar from '@/components/navigation/NavbarComponent';

export default {
  components: {
    Navbar,
    ImageSliderComponent,
    FooterComponent
  },
  data() {
    return {
      name: 'AboutUs',
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.slider-logo {
  position: absolute;
  z-index: 20;
  left: 10%;
  top: 12%;
}

.slider {
}

.about {
  background: white;
}

.how-section1 {
  background: white;
  margin-top: -15%;
  padding: 10%;
}

.how-section1 .row {
  margin-top: 10%;
}

.how-img {
  text-align: center;
}

.how-img img {
  width: 60%;
}

.icon-image {
  //border: 1px solid crimson;
}

.icon-image img {
  //border: 1px solid darkgreen;
}

/*
    Phone
 */
@media only screen and (max-width: 992px) {
  .how-img img {
    width: 100%;
  }
}
</style>

