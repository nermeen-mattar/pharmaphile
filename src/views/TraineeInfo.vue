<template>
  <div class="wrapper min-vh-100 min-vw-100">
    <div class="min-vw-100">
      <navbar></navbar>
    </div>
    <div>
      <div class="pic"></div>
    </div>
    <div class="profile-container">
      <div class="info">
        <img class="info-image" :src="$store.getters.selectedTrainee.user.imageUrl || '../assets/dummyProfile.png'" alt="">
        <h3 class="info-pharmacy-name">{{$route.params.id}}</h3>
        <h4 class="info-pharmacy">Trainee</h4>
        <div class="info-box">
          <div class="inner-right">
            <div class="social-wrapper">
              <p><img src="../assets/manager.png" alt=""></p>
              <p>Name: {{ $store.getters.selectedTrainee.user.name }}</p>
            </div>
            <div class="social-wrapper">
              <p><img src="../assets/no_students.png" alt=""></p>
              <p>University: {{$store.getters.selectedTrainee.user.university}}</p>
            </div>
            <div class="social-wrapper">
              <p><img src="../assets/no_students.png" alt=""></p>
              <p>Year: {{$store.getters.selectedTrainee.user.university_year}}</p>
            </div>
            <div class="social-wrapper">
              <p><img src="../assets/university_number.png" alt=""></p>
              <p>University number: {{$store.getters.selectedTrainee.user.university_number}}</p>
            </div>
            <div class="social-wrapper">
              <p><img src="../assets/email_black.png" alt=""></p>
              <p>Email: {{$store.getters.selectedTrainee.user.email}}</p>
            </div>
            <div class="social-wrapper">
              <p><img src="../assets/mobile.png" alt=""></p>
              <p>Phone: {{$store.getters.selectedTrainee.user.phone}}</p>
            </div>
          </div>
          <div class="inner-left">
            <div class="social-wrapper">
              <p><img src="../assets/share.png" alt=""></p>
              <p>Tell us more about you (250 word ):</p>
            </div>
            <p style="text-align: left"> {{$store.getters.selectedTrainee.user.about}} </p>
          </div>
        </div>
        <div>
          <button @click="onAcceptClicked()" class="btn btn-suc">Accept</button>
          <button @click="onDeleteClicked()" class="btn btn-dan">Delete</button>
        </div>
      </div>
    </div>

    <div class="bottom">
      <footer-component></footer-component>
    </div>
  </div>

</template>

<script>
import Navbar from '@/components/navigation/NavbarComponent';
import FooterComponent from '@/components/footer/FooterComponent';
import { mapActions } from 'vuex';

export default {
  name: 'TraineeInfo',
  data() {
    return {
      info: {
        name: 'haneen washah',
        phone: '0797654356',
        email: 'info@pharmacy.com',
        university_number: '078222',
        university: 'university of jordan',
        year: '3',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      }
    }
  },
  components: {
    FooterComponent,
    Navbar,
  },
  mounted() {
    if (this.$store.getters.selectedTrainee === null || this.$store.getters.selectedTrainee.user === undefined || this.$store.getters.selectedTrainee.user === {}) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    ...mapActions(['updateTraining']),

    onAcceptClicked() {
      let training = this.$store.getters.selectedTrainee;
      training.status = 1;
      this.updateTraining(training);
      this.$toast.success("Accepted!");
      this.$router.push('/dashboard');
    },

    onDeleteClicked() {
      let training = this.$store.getters.selectedTrainee;
      training.status = -1;
      this.updateTraining(training);
      this.$toast.error("Deleted!");
      this.$router.push('/dashboard');
    }

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
.wrapper  {
  background: white;
}

.bottom {
  margin-top: 5%;
}

.btn {
  margin: 10px;
}

.btn-suc, .btn-dan {
  color: white;
  padding: 10px;
  width: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.btn-suc {
  background: #0DE03C;
}

.btn-dan {
  background: #FE0E0E;
}

.pic {
  background: url('../assets/profile_bg.png') no-repeat center;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 420px;
  width: 100vw;
}
.inner-right {
  .social-wrapper {
    p {
      img {
        padding: 10px;
        margin: auto 5px;
        width: auto;
        height: auto;
      }
    }
  }

}

.inner-left {
  .social-wrapper {
    p {
      img {
        margin: auto 5px;
        width: auto;
        height: auto;
      }
    }
  }

}

.profile-container {
  .info {

    .info-image {
      margin-top: -130px;
      position: relative;
      max-width: 300px;
      height: 300px;
      width: 300px;
      min-height: 150px;
      max-height: 300px;
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
          margin: auto 0;

          color: #000000;



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

.vBubble{
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

.ktextarea label{
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

.ktextarea textarea{
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
