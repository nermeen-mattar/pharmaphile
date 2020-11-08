<template>
  <div class="wrapper login-wrap">
    <h2 class="title">Find the best and nearest pharmacy for your training!</h2>
    <h2 class="title">Login to your account</h2>
    <div class="loginWrapper">
      <form autocomplete="off" @submit.prevent="onLoginClicked">

        <div class="inputWrapper">
          <i class="account"></i>
          <input id="email" v-model="loginForm.email" autocomplete="off" class="pharmaInput email" name="email"
                 placeholder="Email Address"
                 type="email">
        </div>
        <div class="inputWrapper">
          <i class="password"></i>
          <input id="password" v-model="loginForm.password" autocomplete="off" class="pharmaInput email" name="password"
                 placeholder="Password"
                 type="password">
        </div>

      </form>
    </div>
    <button class="btn btn-login" @click="onLoginClicked()">Login</button>
    <button class="btn btn-outline-warning" style="width: 200px; font-weight: bold; color: black; margin: 0 auto" @click="onGuestLoginClicked()">Guest Login</button>
    <p class="dontHaveAnAccount">Don't have account yet? <a class="signUp" @click="onSignUpClicked()">Sign
      up</a></p>
  
    <register></register>
  </div>
</template>

<script>
import firebase from 'firebase';
import Register from '@/components/auth/register';

export default {
  data() {
    return {
      name: 'LoginComponent',
      isTrainee: true,
      img1: '',
      imageData: null,
      uploadValue: 0,
      loginForm: {
        email: '',
        password: '',
        error: null
      },
      pharmaRegisterForm: {
        email: '',
        password: '',
        name: '',
        manager: '',
        phone: '',
        city: '',
        address: '',
        imageUrl: '',
        noOfStudents: '',
        confirmPassword: '',
        error: ''
      },
      traineeRegisterForm: {
        name: '',
        email: '',
        password: '',
        error: '',
        phone: '',
        university_number: '',
        university: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    create() {

      const post = {
        photo: this.img1,
        caption: this.caption
      };
      firebase.database()
        .ref('PhotoGallery')
        .push(post)
        .then((response) => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onGuestLoginClicked() {
      this.$store.dispatch('login', {
        email: "guest@pharmaphile.com",
        password: "1234567"
      });
    },

    onLoginClicked() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },

    onSignUpClicked() {
      this.$modal.show('reg-modal');
    }
  },
  mounted() {
    this.loginForm.error = null;
  },
  components: { Register }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

/*
    Desktops
 */
.wrapper {
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;

  .title {
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    padding: 0;
    text-align: center;
    color: $pharma_white;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.44);
  }

  .loginWrapper {
    padding: 0 !important;
    margin: 10px 0;
    height: 130px;
  }

  .btn-login {
    background: $pharma_white;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 108px;
    height: 44px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
    color: $pharma_yellow;
  }

  .dontHaveAnAccount {
    //border: 1px solid red;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #FDFDFD;

    backdrop-filter: blur(4px);
  }

  .logo-sm {
    width: 300px;
    height: 67px;
  }


  .form-group {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    label {
      margin-left: 20%;
    }
  }

  .label-left {
    margin-left: 10%;
  }

  .loginWrapper {
    input {
      padding-left: 60px;
      color: $pharma_white;
      -webkit-text-fill-color: $pharma_white;
    }
  }

  i {
    position: relative;
    left: 50px;
    top: 14px;

    &.account {
      &:before {
        content: url("../../assets/personIcon.png");
      }

      &.active {
        &:before {
          content: url("../../assets/personIcon.png");
        }
      }
    }

    &.password {
      &:before {
        content: url("../../assets/lockIcon.png");
      }
    }
  }

}

.v--modal-box {
  border-radius: 25px !important;
  background: none !important;
  //padding-bottom: 5px !important;
  overflow: scroll !important;

}


/*
    Tablet
 */
@media only screen and (max-width: 992px) {
}

/*
    Phone
 */
@media only screen and (max-width: 600px) {

  .wrapper {
    margin-top: 15%;
    width: 100%;
    height: 100%;
    display: flex !important;
    flex-direction: column;
    
    .title {
      font-size: 26px;
      line-height: 32px;
      width: 70%;
    }

    .loginWrapper {
      padding: 0 !important;
      margin: 10px 0;
      height: 130px;
    }

    .dontHaveAnAccount {
      //border: 1px solid red;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #FDFDFD;

      backdrop-filter: blur(4px);
    }

    .logo-sm {
      width: 300px;
      height: 67px;
    }

    .form-group {
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      label {
        margin-left: 20%;
      }
    }

    .label-left {
      margin-left: 10%;
    }
    .inputWrapper {
      height: 50px;
    }
    .loginWrapper {
      margin-bottom: 8%;

      input {
        padding-left: 60px;
        width: 100%;
        height: 50px;
        color: $pharma_white;
        -webkit-text-fill-color: $pharma_white;
      }
    }

    i {
      position: relative;
      left: -150px;
      top:  55px;
    }

  }
}

</style>
