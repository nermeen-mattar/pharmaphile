<template>
  <div class="contactus min-vh-100">
    <div class="container min-vw-100 p-0 m-0">
      <div class="min-vw-100" v-if="$store.getters.getUserProfile">
        <navbar></navbar>
      </div>

      <div class="row wrapper min-vh-100 justify-content-center align-content-center">
        <div class="yellow-div">
          <h3 class="title">Contact Us</h3>
          <div class="social-wrapper">
            <p><img src="../assets/phone_white.png" alt=""></p>
            <p>+962 9825367222</p>
          </div>
          <div class="social-wrapper">
            <p><img src="../assets/email_white.png" alt=""></p>
            <p>@pharmaphilie</p>
          </div>
          <div class="social-wrapper">
            <p><img src="../assets/linkedin_white.png" alt=""></p>
            <p>@pharmaphilie</p>
          </div>
          <div class="social-wrapper">
            <p><img src="../assets/facebook_white.png" alt=""></p>
            <p>@pharmaphilie</p>
          </div>
          <div class="social-wrapper">
            <p><img src="../assets/instagram_white.png" alt=""></p>
            <p>@pharmaphilie</p>
          </div>
        </div>
        <div class="white-div">
          <div class="innerWrapper">
            <img alt="" class="logo" src="../assets/logo.png" width="250">
            <p>Feel free to contact us ! Submit your question here and we will get back to you soon.</p>
            <div id="students-div" class="form-group">
              <Label class="form-label" for="students"> Name </Label>
              <input id="students" class="form-control pharmaInputGold center-margin small" max="5" min="2"
                     name="students"
                     type="text">
            </div>


            <div id="password_reg-div" class="form-group">
              <Label class="form-label" for="password_reg"> Email </Label>
              <input id="password_reg" class="form-control pharmaInputGold center-margin small" name="password"
                     type="email">
            </div>

            <div id="password_reg-confirm-div" class="form-group">
              <Label class="form-label" for="password_reg-confirm"> Message </Label>
              <input id="password_reg-confirm" class="form-control pharmaInputGold center-margin small black-text"
                     name="confirm_password"
                     type="text">
            </div>
            <div class="form-group">
              <button class="btn signUpButton center-margin" @click="onSignUpClicked()">SEND</button>
            </div>
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
import FooterComponent from '@/components/footer/FooterComponent';
import Navbar from '@/components/navigation/NavbarComponent';

export default {
  name: 'ContactUs',
  components: {
    Navbar,
    FooterComponent
  }
};
</script>

<style lang="scss" scoped>
.contactus {
  background: url("../assets/contactusbg.png") no-repeat center;
  background-size: cover;
}

.wrapper {


  .signUpButton {
    background: #FFC200;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    padding: 8px 35px;
    color: #FFFFFF;
    text-align: left;
    justify-content: left;
    display: block;
  }

  .white-div {
    background-color: white;
    padding: 4%;
    width: 40%;
    max-height: 50%;
    height: 40%;

    .innerWrapper {
      //border: 1px solid black;
      max-width: 60%;
      margin: 0 0 0 40% ;
    }

    .form-label {
      text-align: left;
      justify-content: left;
      display: block;
    }

    .pharmaInputGold {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      border-bottom: 1px solid black;
      padding: 5px;
      max-width: 80%;
    }

  }

  .yellow-div {

    position: relative;
    z-index: 10;
    left: 10%;
    margin-top: 5.5%;

    padding: 1.2rem;
    width: 30%;
    max-height: 40%;
    min-height: 30%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFC200;
    color: white;

    .title {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 48px;
      line-height: 56px;
      text-align: center;

      color: #FDFDFD;

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .social-wrapper {
      display: flex;
      flex-direction: row;
      margin: 5px;

      p:nth-child(2) {
        margin-left: 15px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;

        color: #FDFDFD;

      }
    }

  }
}

@media screen and (max-width: 600px) {
  .wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;

    padding: 10px;
    .signUpButton {
      background: #FFC200;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      padding: 8px 35px;
      color: #FFFFFF;
      text-align: left;
      justify-content: left;
      display: block;
    }

    .white-div {
      background-color: white;
      width: 100%;
      margin-left: 90px;
      justify-items: center;
      justify-self: center;

      .innerWrapper {
        //border: 1px solid black;
        margin: auto auto;
        padding: 0;
        min-width: 100%;
      }

      .form-label {
        text-align: left;
        justify-content: left;
        display: block;
      }

      .pharmaInputGold {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        border-bottom: 1px solid black;
        padding: 5px;
        max-width: 80%;
      }

    }

    .yellow-div {
      margin: auto auto;
      z-index: 10;

      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #FFC200;
      color: white;

      .title {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        text-align: center;

        color: #FDFDFD;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .social-wrapper {
        display: flex;
        flex-direction: row;
        margin: 5px;

        p:nth-child(2) {
          margin-left: 15px;
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 21px;

          color: #FDFDFD;

        }
      }

    }
  }

}

</style>
