<template>
  <nav class="navbar navbar-expand-lg navbar-light min-vw-100">

    <!--  Show this only on mobile to medium screens  -->
    <a class="navbar-brand d-lg-none" href="#"><img width="120" src="../../assets/logo.png" alt=""></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
      <span @click="isOpen = !isOpen" class="navbar-toggler-icon"></span>
    </button>

    <!--  Use flexbox utility classes to change how the child elements are justified  -->
    <div :class="isOpen ? 'show' : ''" class="collapse navbar-collapse justify-content-center open" id="navbarToggle">

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" @click="onHomeClicked()">HOME <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" @click="onDashboardClicked()">DASHBOARD</router-link>
        </li>
      </ul>


      <!--   Show this only lg screens and up   -->
      <a class="navbar-brand d-none d-lg-block" href="#"><img width="220" src="../../assets/logo.png" alt=""></a>


      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/about" class="nav-link"  @click="onAboutUsClicked()">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contactus" class="nav-link" @click="onContactUsClicked()">CONTACT US</router-link>
        </li>
        <li class="nav-item" v-if="$store.getters.getUserProfile">
          <router-link to="/profile" class="nav-link" @click="onProfileClicked()" href="#"><img width="42" style="border-radius: 50%" :src="$store.getters.getUserProfile.imageUrl" alt=""></router-link>
        </li>

        <li class="nav-item">
          <a to="/" class="nav-link" @click="onLogoutPressed()" href="#"><img width="25" src="../../assets/logout_icon.png" alt=""></a>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
import * as firebase from 'firebase/app';
import  'firebase/auth';
export default {
  name: 'Navbar',

  data() {
    return {
      name: 'Navbar',
      isOpen: false
    }
  },
  methods: {
    async onLogoutPressed() {
      try {
        const response = await firebase.auth()
          .signOut();
        console.log(response);
        this.$router.replace('/');
      } catch (error) {
        console.log(error);
      }
    },
    onProfileClicked() {
      this.$router.push('/profile');
    },
    onAboutUsClicked(){
      this.$router.push('/about');
    },
    onContactUsClicked() {
      this.$router.push('/contactus');
    },
    onDashboardClicked() {
      this.$router.push('/dashboard');
    },
    onHomeClicked() {
      this.$router.push('/home');
    },
  }
};
</script>

<style lang="scss" scoped>
  nav {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
    align-items: center;
    justify-content: center;

    .nav-item, .navbar-brand{
      margin-left: 5px;
      margin-right: 5px;
      a {
        line-height: 28px;
        margin: 0 auto;
      }
    }

    .router-link-active {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 28px;

      color: #F9A826 !important;
    }

  }
</style>
