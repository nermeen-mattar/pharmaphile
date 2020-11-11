<template>
  <div class="home min-vh-100">
    <div class="container min-vw-100">
      <div class="row min-vw-100">
        <navbar></navbar>
      </div>
      <div class="row justify-content-center m-4">
        <h2 class="row-title">Search, Connect and <span style="color: #F9A826">Trust!</span></h2>
      </div>
      <div class="row min-vw-100 justify-content-center">
        <div class="map">
<!--          <map-component></map-component>-->
          <MapComponentssss></MapComponentssss>
        </div>
      </div>
      <br>
      <br>
      <br>
      <div class="row justify-content-center" v-if="searched">
        <pharmacy-list></pharmacy-list>
      </div>
      <br>

      <div class="row bottom">
        <footer-component></footer-component>
      </div>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */

import Navbar from '@/components/navigation/NavbarComponent';
import FooterComponent from '@/components/footer/FooterComponent';
import MapComponentssss from '@/components/map/Map2Component';
import PharmacyList from '@/components/pharmacies/pharmacy-list/pharmacy-list';

export default {
  data() {
    return {
      name: 'Home',
      searched: true,
      data: [],
    };
  },
  components: {
    PharmacyList,
    FooterComponent,
    MapComponentssss,
    Navbar
  },
  created() {

  }
};
</script>

<style lang="scss" scoped>
.bottom {
  position: relative;
  bottom: 0px;
}
.home {
  border: #1DC2F6 1px solid;
  background:  white;


  .row-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    text-align: center;

    color: #000000;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.44);
  }

}

</style>
