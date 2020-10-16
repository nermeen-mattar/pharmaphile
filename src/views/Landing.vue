<template>
  <div class="main vh-100 vw-100">
    <div class="wrapper row min-vh-100">
      <img alt="Vue logo" class="logo" src="../assets/logo.png">
      <div class="login">
        <login-component></login-component>
      </div>

      <div class="buttons">
        <div @click="onAboutUsClicked" class="aboutUs floatButton">About Us</div>
        <div @click="onContactUsClicked" class="contactUs floatButton">Contact Us</div>
      </div>

      <div class="footer">
        <p class="copyright">Copyright © 2020 PharmaPhile. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/auth/LoginComponent';

export default {
  components: { LoginComponent },
  data() {
    return {
      name: 'Landing',
    };
  },
  methods: {
    onAboutUsClicked(){
      this.$router.push('/about');
    },
    onContactUsClicked() {
      this.$router.push('/contactus');
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.main {
  background: url("~@/assets/bg.png") no-repeat center;
  background-size: cover;
}

.wrapper {
  padding: 10px;
  //border: 1px solid red;

  display: grid;

  .logo {
    justify-self: left;
    position: fixed;
    left: 2%;
    width: 357px;
    height: 73px;
    margin-top: 20px;
  }

  .login {

    margin: 15% auto;
    //border: 1px solid darkblue;
    display: grid;
    //justify-content: center;
    //align-content: center;
    //align-items: center;
  }

  .buttons {
    position: fixed;
    top: 25vw;
    left: 0vw;
    display: flex;
    flex-direction: column;
    height: auto !important;
    //border: 1px solid red;
    padding: 0;
    justify-content: flex-start;

    .floatButton {

      position: relative; left: -53px;


      transform: rotateZ(-90deg);
      background: #E6BD43;
      width: auto !important;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      color: $pharma_white;
      padding: 1rem;
      padding-bottom: 0.2rem;
      margin-bottom: 90%;
      text-align: end;
      cursor: pointer;
      font-family: Roboto,serif;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;

    }
  }

  .copyright {
    position: fixed;
    bottom: 0;
    left: 40%;
    text-align: center;
    margin: auto auto;
    justify-self: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #FDFDFD;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.56);
  }

}


@media screen and (max-width: 600px) {

  .wrapper {
    padding: 10px;
    display: grid;

    .logo {
      justify-self: left;
      position: fixed;
      left: 12%;
      width: 220px;
      height: 50px;
      margin-top: 20px;
    }

    .login {
      margin: 5% auto;
      //border: 1px solid darkblue;
      display: grid;
      //justify-content: center;
      //align-content: center;
      //align-items: center;
    }

    .buttons {
      position: fixed;
      top: 20vw;
      left: 0vw;
      display: flex;
      flex-direction: column;
      height: auto !important;
      //border: 1px solid red;
      padding: 0;
      justify-content: flex-start;

      .floatButton {

        position: relative; left: -53px;

        transform: rotateZ(-90deg);
        background: #E6BD43;
        width: auto !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        color: $pharma_white;
        padding: 1rem;
        padding-bottom: 0.2rem;
        margin-bottom: 90%;
        text-align: end;
        cursor: pointer;
        font-family: Roboto,serif;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;

      }
    }

    .copyright {
      position: fixed;
      bottom: 0;
      left: 0%;
      text-align: center;
      margin: 10px 10px;
      justify-self: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: #FDFDFD;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.56);
    }

  }

}

</style>
