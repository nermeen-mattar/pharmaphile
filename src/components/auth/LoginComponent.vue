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
    <p class="dontHaveAnAccount">Don't have account yet? <a class="signUp" @click="onDontHaveAnAccountClick()">Sign
      up</a></p>

    <modal :adaptive="true" height="800" name="reg-modal" width="500">
      <div class="signUpWrapper">
        <img alt="Vue logo" class="logo-sm" src="../../assets/logo.png">

        <div class="form-group">
          <Label class="form-label" for="type">Sign up As</Label>
          <select id="type" class="form-control pharmaInput center-margin small" name="type"
                  v-on:change="onOptionSelect">
            <option value="2"> Pharmacy</option>
            <option selected value="3"> Trainee</option>
          </select>
        </div>

        <div v-if="isTrainee">
          <form @submit.prevent="formSubmitted">

            <div id="location-div" class="form-group">
              <Label class="form-label" for="location"> Name </Label>
              <input id="location" v-model="traineeRegisterForm.name"
                     class="form-control pharmaInput center-margin small" name="location" type="text">

            </div>

            <div id="manager-div" class="form-group">
              <label class="form-label" for="manager"> Email </label>
              <input id="manager" v-model="traineeRegisterForm.email"
                     class="form-control pharmaInput center-margin small" name="manager" type="email">
            </div>

            <div id="image-div" class="form-group" style="display:none;">
              <Label class="form-label" for="image"> Phone Number </Label>
              <input id="image" v-model="traineeRegisterForm.phone" class="form-control pharmaInput center-margin small"
                     name="image" type="text">
            </div>


            <div id="university-div" class="form-group">
              <Label class="form-label" for="university"> University </Label>
              <input id="university" v-model="traineeRegisterForm.university"
                     class="form-control pharmaInput center-margin small" name="university" type="text">
            </div>

            <div id="university_number-div" class="form-group">
              <Label class="form-label" for="university_number"> University number </Label>
              <input id="university_number" v-model="traineeRegisterForm.university_number"
                     class="form-control pharmaInput center-margin small"
                     name="university_number"
                     type="text">
            </div>

            <div id="password-reg-div" class="form-group">
              <Label class="form-label" for="password-reg"> Password </Label>
              <input id="password-reg" v-model="traineeRegisterForm.password"
                     class="form-control pharmaInput center-margin small" name="university_number"
                     type="password">
            </div>

            <div id="password-reg-confirm-div" class="form-group">
              <Label class="form-label" for="password-reg-confirm"> Confirm Password </Label>
              <input id="password-reg-confirm" v-model="traineeRegisterForm.confirmPassword"
                     class="form-control pharmaInput center-margin small black-text"
                     name="university_number"
                     type="password">
            </div>
          </form>
        </div>
        <div v-else>

          <form @submit.prevent="pharmacySignup">

            <div id="pharmacy-name-div" class="form-group">
              <Label class="form-label" for="name"> Pharmacy Name </Label>
              <input id="name" v-model="pharmaRegisterForm.name" class="form-control pharmaInput center-margin small"
                     name="name"
                     type="text">
            </div>

            <div id="manager-name-div" class="form-group">
              <Label class="form-label" for="manager-name"> Manager </Label>
              <input id="manager-name" v-model="pharmaRegisterForm.manager"
                     class="form-control pharmaInput center-margin small" name="location" type="text">
            </div>


            <div id="phone-div" class="form-group" style="display:none;">
              <Label class="form-label" for="phone"> Phone Number </Label>
              <input id="phone" v-model="pharmaRegisterForm.phone" class="form-control pharmaInput center-margin small"
                     name="phone" type="number">
            </div>


            <div id="email-div" class="form-group">
              <label class="form-label" for="email_reg"> Email </label>
              <input id="email_reg" v-model="pharmaRegisterForm.email"
                     class="form-control pharmaInput center-margin small" name="email" type="email">
            </div>

            <div id="city-div" class="form-group">
              <Label class="form-label" for="city"> City </Label>
              <select id="city" v-model="pharmaRegisterForm.city" class="form-control  pharmaInput center-margin small"
                      name="city">
                <option value="">Select City</option>
                <option value="Amman">Amman</option>
                <option value="Aqabah">Aqabah</option>
                <option value="Mafraq">Mafraq</option>
                <option value="At-Tafilah">At-Tafilah</option>
                <option value="Maan">Maan</option>
                <option value="Irbid">Irbid</option>
                <option value="Ajlun">Ajlun</option>
                <option value="Jarash">Jarash</option>
                <option value="Al-Balqa">Al-Balqa</option>
                <option value="Madaba">Madaba</option>
                <option value="Al-Karak">Al-Karak</option>
                <option value="Az-Zarqa">Az-Zarqa</option>
              </select>
            </div>

            <div id="address-div" class="form-group">
              <label class="form-label" for="address"> Pharmacy Address </label>
              <input id="address" v-model="pharmaRegisterForm.address"
                     class="form-control pharmaInput center-margin small" name="manager" type="text">
            </div>

            <div id="pharmacy-image-div" class="form-group" style="display:none;">
              <Label class="form-label" for="pharmacy-image"> Pharmacy Image </Label>
              <input id="pharmacy-image" ref="input1" accept="image/*"
                     class="form-control pharmaInput center-margin small"
                     name="image" type="file" @change="previewImage">
            </div>

            <div v-if="imageData!=null">
              <img :src="img1" class="preview" height="268" width="356">
              <br>
            </div>

            <div id="students-div" class="form-group">
              <Label class="form-label" for="students"> Number of students </Label>
              <input id="students" v-model="pharmaRegisterForm.noOfStudents"
                     class="form-control pharmaInput center-margin small" max="5" min="2" name="students"
                     type="number">
            </div>

            <div id="password_reg-div" class="form-group">
              <Label class="form-label" for="password_reg"> Password </Label>
              <input id="password_reg" v-model="pharmaRegisterForm.password"
                     class="form-control pharmaInput center-margin small" name="password"
                     type="password">
            </div>

            <div id="password_reg-confirm-div" class="form-group">
              <Label class="form-label" for="password_reg-confirm"> Confirm Password </Label>
              <input id="password_reg-confirm" v-model="pharmaRegisterForm.confirmPassword"
                     class="form-control pharmaInput center-margin small black-text"
                     name="confirm_password"
                     type="password">
            </div>
          </form>
        </div>

        <div class="form-group">
          <button class="btn signUpButton center-margin" type="submit" @click="formSubmitted()">SIGN UP</button>
        </div>

      </div>
    </modal>
  </div>
</template>

<script>
import firebase from 'firebase';

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
    onUpload() {
      this.img1 = null;
      const storageRef = firebase.storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(`state_changed`, snapshot => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL()
            .then((url) => {
              this.img1 = url;
              this.pharmaRegisterForm.imageUrl = this.img1;
              console.log(this.img1);
            });
        }
      );
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
      console.log('Preview Image');
    },
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
        password: this.loginForm.password
      });
    },

    formSubmitted() {
      this.pharmaRegisterForm.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/pharmaphile-dca83.appspot.com/o/user.png?alt=media&token=cad4580e-a9c9-4007-8373-0470e44b8ec6';
      if (this.isTrainee) {
        if (this.traineeRegisterForm.password === this.traineeRegisterForm.confirmPassword) {
          this.$store.dispatch('signup', {
            isTrainee: true,
            email: this.traineeRegisterForm.email,
            name: this.traineeRegisterForm.name,
            password: this.traineeRegisterForm.password,
            phone: this.traineeRegisterForm.phone,
            university_number: this.traineeRegisterForm.university_number,
            university: this.traineeRegisterForm.university,
            toastObject: this.$toast
          });
        } else {
          this.$toast.error('Password not matched!');
        }
      } else {
        if (this.pharmaRegisterForm.password === this.pharmaRegisterForm.confirmPassword) {
          this.$store.dispatch('signup', {
            isTrainee: false,
            email: this.pharmaRegisterForm.email,
            name: this.pharmaRegisterForm.name,
            password: this.pharmaRegisterForm.password,
            phone: this.pharmaRegisterForm.phone,
            manager: this.pharmaRegisterForm.manager,
            imageUrl: this.pharmaRegisterForm.imageUrl,
            city: this.pharmaRegisterForm.city,
            noOfStudents: this.pharmaRegisterForm.noOfStudents,
            address: this.pharmaRegisterForm.address,
            toastObject: this.$toast
          });
        } else {
          this.$toast.error('Password not matched!');
        }
      }
    },

    pharmacySignup() {
      if (this.traineeRegisterForm.password === this.traineeRegisterForm.confirmPassword) {
        this.$store.dispatch('signup', {
          email: this.traineeRegisterForm.email,
          name: this.traineeRegisterForm.name,
          password: this.traineeRegisterForm.password,
          phone: this.traineeRegisterForm.phone,
          university_number: this.traineeRegisterForm.university_number,
          university: this.traineeRegisterForm.university,
          toastObject: this.$toast
        });
      } else {
        this.$toast.error('Password not matched!');
      }
    },

    onOptionSelect(event) {
      event.target.value === '2' ? this.isTrainee = false : this.isTrainee = true;
    },
    onDontHaveAnAccountClick() {
      this.$modal.show('reg-modal');
    },

    onSignUpClicked() {
      //TODO: SignUp
    }
  },
  mounted() {
    this.loginForm.error = null;
  }
};
</script>

<style lang="scss">

.login-wrap {
  .vm--modal {
    overflow: auto !important;
  }
}

</style>

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

      &.active {
        &:before {
          content: url("../../assets/lockIcon.png");
        }
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


.login-reg-modal-wrapper {
  overflow-y: scroll !important;

  div:first-child {
    border: 4px solid green;
    border-radius: 25px;
  }


  .signUpWrapper {
    overflow-y: scroll !important;

    padding-top: 5px;
    max-height: 100vh;
    display: flex;
    padding-bottom: 15px;

    .form-control {
      padding: 5px !important;
    }


    select {
      padding: 5px;
      background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right #ddd;
      -webkit-appearance: none;
      background-position-x: 95%;
    }

  }

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
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 32px;
      width: 70%;
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

        &.active {
          &:before {
            content: url("../../assets/lockIcon.png");
          }
        }
      }
    }

  }


  .login-reg-modal-wrapper {
    overflow-y: scroll !important;

    div:first-child {
      border: 4px solid green;
      border-radius: 25px;
    }


    .signUpWrapper {
      overflow-y: scroll !important;

      padding-top: 5px;
      max-height: 100vh;
      display: flex;
      padding-bottom: 15px;

      .form-control {
        padding: 5px !important;
      }


      select {
        padding: 5px;
        background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right #ddd;
        -webkit-appearance: none;
        background-position-x: 95%;
      }

    }

  }

}

</style>
