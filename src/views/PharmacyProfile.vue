<template>
  <div class="wrapper min-vh-100 min-vw-100">
    <div class="min-vw-100">
      <navbar></navbar>
    </div>
    <div>
      <div class="pic"></div>
    </div>
    <div class="profile-container">
      <div v-if="$store.getters.selectedPharmacy" class="pharmacy-info">
        <img :src="$store.getters.selectedPharmacy.imageUrl" alt="" class="info-image">
        <h3 class="info-pharmacy-name">{{ $store.getters.selectedPharmacy.name }}</h3>
        <h4 class="info-pharmacy">Pharmacy</h4>
        <div class="info-box">
          <div class="social-wrapper">
            <p><img alt="" src="../assets/manager.png"></p>
            <p>Manager: {{ $store.getters.selectedPharmacy.manager }}</p>
          </div>
          <div class="social-wrapper">
            <p><img alt="" src="../assets/phone_black.png"></p>
            <p>Pharmacy number: {{ $store.getters.selectedPharmacy.phone }}</p>
          </div>
          <div class="social-wrapper">
            <p><img alt="" src="../assets/email_black.png"></p>
            <p>Email: {{ $store.getters.selectedPharmacy.email }}</p>
          </div>
          <div class="social-wrapper">
            <p><img alt="" src="../assets/city.png"></p>
            <p>City: {{ $store.getters.selectedPharmacy.city }}</p>
          </div>
          <div class="social-wrapper">
            <p><img alt="" src="../assets/address.png"></p>
            <p>Address: {{ $store.getters.selectedPharmacy.address }}</p>
          </div>
          <div class="social-wrapper">
            <p><img alt="" src="../assets/no_students.png"></p>
            <p>Number of students: {{ $store.getters.selectedPharmacy.noOfStudents }}</p>
          </div>
          <div style="grid-column: 1/3" v-if="$store.getters.selectedPharmacy.rate">
            <rate :length="5" :readonly="true" :value="Math.round($store.getters.selectedPharmacy.rate)" style="margin: 0 auto"></rate>
          </div>
        </div>
      </div>
      <div class="training">
        <h3 class="title">Training Positions</h3>
        <div v-if="trainings">
          <table class="table table-hover table-striped table-light">
            <thead>
            <tr>
              <th class="table-col-1" scope="col">Title</th>
              <th class="table-col-2" scope="col">Created at</th>
              <th class="table-col-3" scope="col">Due Date</th>
              <th v-if="$store.getters.getUserProfile.isTrainee" class="table-col-4" scope="col">Apply</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(training, index) in trainings" :key="index">
              <th scope="row">{{ training.name }}</th>
              <td>{{ training.date }}</td>
              <td>{{ training.date }}</td>
              <td class="status-code accepted" v-if="$store.getters.getUserProfile.isTrainee">
                <button class="btn btn-primary" @click="onApplyClicked(training)">Apply</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>There's no trainings!</p>
        </div>
      </div>
      <div class="related">
        <h3 class="title">Related Pharmacies</h3>
        <pharmacy-list></pharmacy-list>
      </div>
      <div v-if="reviews" class="rating">
        <h3 class="title">Ratings and reviews</h3>
        <rating-list :ratings="reviews"></rating-list>
      </div>
      <div class="leave-review">
        <h3 class="title">Leave a review</h3>
        <br>
        <div class="inner">
          <div class="rating-info">
            <div class="ktextarea vBubble">
              <label>Your review</label>
              <textarea ref="text-area" v-model="ratingInfo.description"> </textarea>
            </div>
            <button class="btn btn-rate" @click="submitReview()">Submit your review</button>
          </div>
          <rate v-model="ratingInfo.rate" :length="5" :value="0" class="rate"></rate>
          <img alt="Rate arrow" class="rate-arrow" src="../assets/rate_arrow.png">
        </div>
      </div>
    </div>

    <div class="bottom">
      <footer-component></footer-component>
    </div>

  </div>
</template>

<script>
import PharmacyList from '@/components/pharmacies/pharmacy-list/pharmacy-list';
import bus from '@/services/bus';

import Navbar from '@/components/navigation/NavbarComponent';
import RatingList from '@/components/rating/rating-list/Rating-List';
import FooterComponent from '@/components/footer/FooterComponent';
import { mapActions, mapGetters } from 'vuex';
/* eslint-disable */ 

export default {
  data() {
    return {
      name: 'PharmacyProfile',
      ratingInfo: {
        name: this.$store.getters.getUserProfile.name,
        description: '',
        imageUrl: this.$store.getters.getUserProfile.imageUrl ? this.$store.getters.getUserProfile.imageUrl : this.$store.getters.selectedPharmacy.imageUrl,
        rate: 5,
      }
    };
  },
  components: {
    FooterComponent,
    RatingList,
    Navbar,
    PharmacyList
  },
  computed: {
    ...mapGetters({
      selectedPharmacy: 'selectedPharmacy',
      trainings: 'selectedTrainings',
      reviews: 'selectedReviews'
    })
  },
  methods: {
    ...mapActions(['getTrainings', 'getReviews', 'getPharmacyById', 'applyOnTraining', 'selectPharmacy', 'addReview']),

    /**
     * @event onclick
     */
    submitReview() {
      // this.$store.dispatch('submitReview', this.ratingInfo);
      this.$store.dispatch('addReview', {...JSON.parse(JSON.stringify(this.ratingInfo)), 
      pharmacyId: this.$store.getters.selectedPharmacy.uuid});
      this.$toast.success('Submitted!');
      this.ratingInfo.description = '';
      this.ratingInfo.rate = 5;
      this.getReviews(this.$store.state.selectedPharmacy)
        .then(() => {
          // this.info = this.$store.state.selectedPharmacy;
          // this.info.reviews = data;
          console.log('Trainings', this.$store.state.selectedPharmacy);
        });
    },

    /**
     *
     * @event onclick
     * @param training
     */
    onApplyClicked(training) {
      training.userId = this.$store.getters.getUserProfile.uid;
      training.pharmacyId = this.$store.state.selectedPharmacy.uuid;
      training.id = this.$store.state.selectedPharmacy.uuid + training.name.replace(/\s/g, '_');
      training.user = this.$store.getters.getUserProfile;
      training.pharmacyName = this.$store.getters.selectedPharmacy.name;
      training.pharmacyLocation = this.$store.getters.selectedPharmacy.city + ', ' + this.$store.getters.selectedPharmacy.address;
      training.status = 0;
      training.dateApplied = this.getDate();
      console.log('training', training);
      console.log('this.$store.getters.selectedPharmacy', this.$store.getters.selectedPharmacy);
      this.applyOnTraining(training);
      this.$toast.success('Applied!');
    },

    getDate() {
      let today = new Date();
      let dd = String(today.getDate())
        .padStart(2, '0');
      let mm = String(today.getMonth() + 1)
        .padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return mm + '/' + dd + '/' + yyyy;

    }

  },
  created() {

    this.getPharmacyById(this.$route.params.id).then(pharmacyObj => {
              this.info = pharmacyObj;
        this.selectPharmacy(pharmacyObj);
      });
    /* followin gare covered in selectPharmacy */
    // this.$store.dispatch('search'); /* to set pharmacies in state before filtering related pharmacies*/
    // this.$store.dispatch('getRelatedPharmacies');

    /* old code */
    // this.getReviews(this.$store.state.selectedPharmacy)
    //   .then((data) => {
    //     this.info = this.$store.state.selectedPharmacy;
    //     this.info.reviews = data;
    //     console.log('Trainings', this.$store.state.selectedPharmacy);
    //   });
    // this.getTrainings(this.$store.state.selectedPharmacy)
    //   .then((data) => {
    //     console.log('Trainings', this.$store.state.selectedPharmacy);
    //     this.info.trainings = data;
    //   });
  },
  mounted() {
    // this.info = {}; // this.$store.getters.selectedPharmacy;  undefined when refresh
    bus.$on('pharmacy_data', (payload) => {
      console.log(payload);
    });

  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/variables";

table {
  margin: 0 auto;
  max-width: 70%;
  margin-top: 10px !important;

  thead {
    max-height: 50px !important;
    height: 50px !important;
    min-height: 50px !important;

    th {
      max-height: 55px !important;
      height: 55px !important;
      min-height: 55px !important;
    }
  }

  tr {
    th {
      font-weight: normal;
    }
  }
}

.title {
  font-weight: bold;
}

.wrapper {
  background: white;
}

.bottom {
  margin-top: 5%;
}

.pic {
  background: url('../assets/profile_bg.png') no-repeat center;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 420px;
  width: 100vw;
}

.profile-container {
  .pharmacy-info {

    .info-image {
      max-width: 300px;
      height: 300px;
      min-height: 150px;
      max-height: 300px;
      image-resolution: snap;
      margin-top: -130px;
      position: relative;
      z-index: 10;
      border-radius: 50%;
      border: 9px solid #FFD400;
    }

    .info-box {
      margin: 0 auto;
      background: rgba(209, 209, 209, 0.93);
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 40%;
      padding: 2rem;


      .social-wrapper {
        justify-content: left;
        display: flex;
        flex-direction: row;
        margin: 5px;

        p {
          font-family: Roboto;
          font-style: normal;
          font-weight: 300;
          font-size: 16px;

          color: #000000;

          img {
            margin-right: 5px;
          }
        }

      }

    }
  }
}

.training {
  margin-top: 70px;
  margin-bottom: 70px;
}

.rating, .leave-review {

  margin-top: 70px;
  margin-left: 50px;
  text-align: left;
}

.leave-review {
  .inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .rate, .rate-arrow {
      margin: auto auto;
    }

  }
}

.vBubble {
  margin: 10px 0px;
}

.btn-rate {
  background: #FFD400;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
}

.ktextarea {
  position: relative;
  background-color: #fff;
  border: 2px solid #FFD400;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 500px;
  height: 140px;
}

.ktextarea label {
  left: -10px;
  padding: 0.5rem;
  color: white;
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  background: #FFD400;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: scale(.75) translateY(-30px);
}

.ktextarea textarea {
  background-color: white;
  border: none;
  width: 99%;
  padding: 25px;
  height: 130px;
  min-height: 130px;
  min-width: 88%;
  max-height: 130px;
}

</style>
