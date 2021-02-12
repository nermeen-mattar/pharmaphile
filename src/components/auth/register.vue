<template>
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

          <form>
          <!--  @submit.prevent="pharmacySignup"-->

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

</template>

<script>
import firebase from 'firebase';
import Helpers from '../../services/helpers';


/* eslint-disable */ 

export default {
  data() {
    return {
      name: 'register',
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
      },
      traineeRegisterForm: {
        name: '',
        email: '',
        password: '',
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
    formSubmitted() {
      this.pharmaRegisterForm.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/pharmaphile-dca83.appspot.com/o/user.png?alt=media&token=cad4580e-a9c9-4007-8373-0470e44b8ec6';
      const formValue = this.isTrainee ? this.traineeRegisterForm : this.pharmaRegisterForm;
      if(!Helpers.validateForm(formValue)) {
        return;
      }
      if (this.isTrainee) {
          this.$store.dispatch('signup', {
            isTrainee: true,
            email: formValue.email,
            name: formValue.name,
            password: formValue.password,
            phone: formValue.phone,
            university_number: formValue.university_number,
            university: formValue.university
          });
        } 
        else {
          this.$store.dispatch('signup', {
            isTrainee: false,
            email: formValue.email,
            name: formValue.name,
            password: formValue.password,
            phone: formValue.phone,
            manager: formValue.manager,
            imageUrl: formValue.imageUrl,
            city: formValue.city,
            noOfStudents: formValue.noOfStudents,
            address: formValue.address
          });
      }
    },
    onOptionSelect(event) {
      event.target.value === '2' ? this.isTrainee = false : this.isTrainee = true;
    }
  },
  mounted() {
    this.loginForm.error = null;
  }
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
  }

}

</style>
