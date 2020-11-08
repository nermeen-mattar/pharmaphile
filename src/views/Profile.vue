<template>
  <div class="profile min-vh-100">
    <div class="container min-vw-100">
      <div class="row min-vw-100">
        <navbar></navbar>
      </div>
      <div class="row justify-content-center m-4">
        <!--        <h2 class="row-title">Search, Connect and <span style="color: #F9A826">Trust!</span></h2>-->
      </div>
      <div class="row min-vw-100 justify-content-center">

        <div class="m-4">
          <input id="pharmacy-image" ref="input1" accept="image/*"
                 class="form-control pharmaInput center-margin small"
                 name="image" type="file" @change="previewImage" hidden>
          <img alt="Profile Image" class="m-4 round-image" height="72" :src="pharmaRegisterForm.imageUrl || '../assets/dummyProfile.png'" width="72" >
          <button @click="$refs['input1'].click()"  class="btn signUpButton center-margin">Upload Image</button>
        </div>

        <div v-if="!$store.getters.getUserProfile.isTrainee">

          <div id="pharmacy-name-div" class="form-group">
            <Label class="form-label" for="pharmacy-name"> Name </Label>
            <input id="pharmacy-name" v-model="pharmaRegisterForm.name" class="form-control pharmaInputGold center-margin small" name="location"
                   type="text">
          </div>

          <div id="manager-name-div" class="form-group">
            <Label class="form-label" for="manager-name"> Manager </Label>
            <input id="manager-name"  v-model="pharmaRegisterForm.manager" class="form-control pharmaInputGold center-margin small" name="location"
                   type="text">
          </div>

          <div id="phone-div" class="form-group" style="display:none;">
            <Label class="form-label" for="phone"> Phone Number </Label>
            <input id="phone" v-model="pharmaRegisterForm.phone" class="form-control pharmaInputGold center-margin small" name="image" type="number">
          </div>

          <div id="email-div" class="form-group">
            <label class="form-label" for="email_reg"> Email </label>
            <input  v-model="pharmaRegisterForm.email" id="email_reg" class="form-control pharmaInputGold center-margin small" name="manager" type="email">
          </div>

          <div id="city-div" class="form-group">
            <Label class="form-label" for="city"> City </Label>
            <select  v-model="pharmaRegisterForm.city" id="city" class="form-control  pharmaInputGold center-margin small" name="city">
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
            <input  v-model="pharmaRegisterForm.address" id="address" class="form-control pharmaInputGold center-margin small" name="manager" type="text">
          </div>

          <div id="students-div" class="form-group">
            <Label class="form-label" for="students"> Number of students </Label>
            <input  v-model="pharmaRegisterForm.noOfStudents" id="students" class="form-control pharmaInputGold center-margin small" max="5" min="2"
                   name="students"
                   type="number">
          </div>

          <div id="password_reg-div" class="form-group">
            <Label class="form-label" for="password_reg"> Password </Label>
            <input  v-model="pharmaRegisterForm.password" id="password_reg" class="form-control pharmaInputGold center-margin small" name="password"
                   type="password">
          </div>

          <div id="password_reg-confirm-div" class="form-group">
            <Label class="form-label" for="password_reg-confirm"> Confirm Password </Label>
            <input  v-model="pharmaRegisterForm.confirmPassword" id="password_reg-confirm" class="form-control pharmaInputGold center-margin small black-text"
                   name="confirm_password"
                   type="password">
          </div>

          <div class="form-group">
            <button class="btn signUpButton center-margin" @click="onSubmitClicked()">Confirm</button>
          </div>
        </div>
        <div v-else>
          <div id="location-div" class="form-group">
            <Label class="form-label" for="location"> Name </Label>
            <input v-model="traineeRegisterForm.name" id="location" class="form-control pharmaInputGold center-margin small" name="location" type="text">

          </div>

          <div id="manager-div" class="form-group">
            <label class="form-label" for="manager"> Email </label>
            <input v-model="traineeRegisterForm.email"  id="manager" class="form-control pharmaInputGold center-margin small" name="manager" type="text">
          </div>

          <div id="image-div" class="form-group" style="display:none;">
            <Label class="form-label" for="image"> Phone Number </Label>
            <input v-model="traineeRegisterForm.phone"  id="image" class="form-control pharmaInputGold center-margin small" name="image" type="number">
          </div>


          <div id="university-div" class="form-group">
            <Label class="form-label" for="university"> University </Label>
            <input v-model="traineeRegisterForm.university"  id="university" class="form-control pharmaInputGold center-margin small" name="university"
                   type="text">
          </div>

          <div id="university_number-div" class="form-group">
            <Label class="form-label" for="university_number"> University number </Label>
            <input  v-model="traineeRegisterForm.university_number"  id="university_number" class="form-control pharmaInputGold center-margin small"
                   name="university_number"
                   type="text">
          </div>


          <div id="university_year-div" class="form-group">
            <Label class="form-label" for="university_year"> Year </Label>
            <input  v-model="traineeRegisterForm.university_year"  id="university_year" class="form-control pharmaInputGold center-margin small"
                   name="university_number"
                   type="text">
          </div>

          <div id="about-you-div" class="form-group">
            <Label class="form-label" for="about-you"> Tell us more about you </Label>
            <textarea  v-model="traineeRegisterForm.about"  id="about-you"
                      aria-multiline="true" class="form-control pharmaInputGold textArea center-margin small"
                      maxlength="250"
                      name="university_number"
                      placeholder="It will help the pharmacy to know you more ( 250 word )"

                      type="text"/>
          </div>

          <div id="password-reg-div" class="form-group">
            <Label class="form-label" for="password-reg"> Password </Label>
            <input  v-model="traineeRegisterForm.password"  id="password-reg" class="form-control pharmaInputGold center-margin small" name="university_number"
                   type="password">
          </div>

          <div id="password-reg-confirm-div" class="form-group">
            <Label class="form-label" for="password-reg-confirm"> Confirm Password </Label>
            <input  v-model="traineeRegisterForm.confirmPassword"  id="password-reg-confirm" class="form-control pharmaInputGold center-margin small black-text"
                   name="university_number"
                   type="password">
          </div>
          <div class="form-group">
            <button class="btn signUpButton center-margin" @click="onSubmitClicked()">Submit</button>
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

import Navbar from '@/components/navigation/NavbarComponent';
import FooterComponent from '@/components/footer/FooterComponent';
import firebase from 'firebase';
import Helpers from '../services/helpers';

export default {
  components: {
    FooterComponent,
    Navbar
  },
  data() {
    return {
      name: 'Profile',
      pharmacy: false,
      img1: '',
      imageData: null,
      uploadValue: 0,
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
        confirmPassword: ''
      },
      traineeRegisterForm: {
        name: '',
        email: '',
        password: '',
        imageUrl: '',
        about: '',
        phone: '',
        university_year: '',
        university_number: '',
        university: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    onSubmitClicked() {
      const formValue = this.$store.getters.getUserProfile.isTrainee ? this.traineeRegisterForm : this.pharmaRegisterForm;
      if(Helpers.validateForm(formValue)) {
        this.$store.dispatch('updateUser', formValue);
        this.$toast.success("Updated!");
      }
    },
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
              this.traineeRegisterForm.imageUrl = this.img1;
              console.log(this.img1);
            });
        }
      );
    },
    previewImage(event) {
      if (event.target.files[0].size/1000 > 5500) { // image should be less than 5.5 MB
        this.$toast.error('Image is too big, please upload smaller image.')
        return;
      }
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      // this.pharmaRegisterForm.imageUrl = event.target.value; didn't work
      this.onUpload(); // ??? should remove this, image should only be uploaded to firebase when the user submits
    }
  },
  created() {
    const userProfile = Object.assign({}, this.$store.getters.getUserProfile);
    if (this.$store.getters.getUserProfile.isTrainee) {
      this.traineeRegisterForm = userProfile;
    } else {
      this.pharmaRegisterForm = userProfile;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.round-image {
  border-radius: 50%;
}
.profile {
  background: white;
}

.textArea {
  min-height: 100px;
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

.form-label {
  display: block;
  text-align: left;
  justify-content: left;
}

.pharmaInputGold {
  font-family: Roboto, sans-serif;
  width: 419px;
  height: 40px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding: 5px;
  border: 1px solid $pharma_yellow;
  //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  //background-color: rgba(0, 0, 0, 0.15) !important;
  //box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  //-webkit-box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 5px;
}

</style>
