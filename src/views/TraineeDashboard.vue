<template>
  <div class="d-flex flex-column h-100">

    <div class="container min-vw-100 p-0 mb-5 h-100">
      <div class=" min-vw-100">
        <navbar></navbar>
      </div>

      <div v-if="$store.getters.getUserProfile.isTrainee" class="trainee-dashboard">
        <div class="top-wrapper">
          <img alt="Profile Picture" style="border-radius: 50%" class="round-image" :src="$store.getters.getUserProfile.imageUrl || '../assets/roundDummy.png' ">
          <div class="mid-wrap">
            <p class="title">{{ $store.getters.getUserProfile.name }}</p>
            <p class="mid-text">{{ $store.getters.getUserProfile.isTrainee ? 'Trainee' : 'Pharmacy' }}</p>
            <p class="mid-text">{{ $store.getters.getUserProfile.university }}</p>
          </div>
          <div class="reg-wrap">
            <button @click="onProfileClicked" class="btn editButton">Edit Profile</button>
          </div>
        </div>

        <hr>
        <div class="bottom-row min-vw-100">
          <h3 class="title">Applied Training Positions</h3>

          <table v-if="studentTrainings !== undefined"
                 class="table table-hover table-striped table-light">
            <thead>
            <tr>
              <th class="table-col-1" scope="col">Pharmacy</th>
              <th class="table-col-1" scope="col">Position</th>
              <th class="table-col-2" scope="col">Location</th>
              <th class="table-col-3" scope="col">Applied Date</th>
              <th class="table-col-4" scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(training ,index) in studentTrainings" :key="index">
              <th scope="row">{{ training.pharmacyName }}</th>
              <td>{{ training.name }}</td>
              <td>{{ training.pharmacyLocation }}</td>
              <td>{{ training.dateApplied }}</td>
              <td v-if="training.status > -1" class="status-code" :class="training.status === 0 ? 'inprogress' : 'accepted'">{{ training.status === 0 ? 'in progress' : 'Accepted' }}</td>
              <td v-else class="status-code not-matched">Not Matched</td>
            </tr>
            </tbody>
          </table>
          <div v-else>
            <p>There's no training positions applied</p>
          </div>
        </div>
      </div>
      <!--    Table Begin-->
      <div v-else class="pharmacy-dashboard">
        <modal :adaptive="true" :resizable="true" name="add-training">
          <div class="modal-wrapper">
            <img alt="Logo" src="../assets/logo.png">
            <label for="title">Title</label>
            <input id="title" v-model="newTraining.name" class="form-group" type="text">
            <label for="date">Due Date</label>
            <input id="date" v-model="newTraining.date" class="form-group" type="date">
            <button @click="onAddTrainingClicked()" class="btn editButton">Add</button>
          </div>
        </modal>
        <div class="container min-vw-100 p-0 m-0">
          <div class="top-wrapper">
            <img alt="Profile Picture" style="border-radius: 50%" class="round-image" :src="$store.getters.getUserProfile.imageUrl || '../assets/roundDummy.png' ">
            <div class="mid-wrap">
              <p class="title">{{ $store.getters.getUserProfile.name }}</p>
              <p class="mid-text">Pharmacy</p>
              <p class="mid-text">{{ $store.getters.getUserProfile.manager }}</p>
              <p class="mid-text">{{ $store.getters.getUserProfile.phone }}</p>
            </div>
            <div class="reg-wrap">
              <button @click="onProfileClicked" class="btn editButton">Edit Profile</button>
            </div>
          </div>

          <hr>
          <div class="bottom-row min-vw-100">
            <h3 class="title">Applied Training Positions</h3>
            <div v-if="students !== undefined && students.length > 0">
              <table class="table table-hover table-striped table-light">
                <thead>
                <tr>
                  <th class="table-col-1" scope="col">Name</th>
                  <th class="table-col-3" scope="col">Applied Date</th>
                  <th class="table-col-4" scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(student, index) in students" :key="index">
                  <th scope="row">{{ student.user.name }}</th>
                  <td>{{ student.dateApplied }}</td>
                  <td class="status-code" v-if="student.status === 0">
                    <button @click="onReviewClicked(student)" class="btn btn-primary">Review</button>
                  </td>
                  <td v-else class="status-code" :class="student.status === -1 ? 'not-matched' : 'accepted'">{{ student.status === -1 ? 'Not Matched' : 'Accepted' }}</td>


                </tr>

                </tbody>
              </table>
            </div>
            <div v-else>
              There's no trainers!
            </div>
            <button class="btn btn-primary" style="max-width: 400px; width: 350px;margin: 10px auto;"
                    @click="onAddNewTrainingClicked()">Add new training position
            </button>
          </div>
          <!--    Table Begin-->

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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    FooterComponent,
    Navbar
  },
  data() {
    return {
      name: 'TraineeDashboard',
      newTraining: {
        name: '',
        date: ''
      }
    };
  },
  computed: {
    ...mapGetters({ studentTrainings: 'userTrainings', students: 'selectedStudent' })
  },
  mounted() {
      if (this.$store.getters.getUserProfile.isTrainee) {
          this.getUserTrainingByID(this.$store.getters.getUserProfile);
      } else {
          this.getStudents(this.$store.getters.getUserProfile);
      }
  },
  created() {
    if (this.$store.getters.getUserProfile.isTrainee) {
      this.getUserTrainingByID(this.$store.getters.getUserProfile);
    } else {
      this.getStudents(this.$store.getters.getUserProfile);
    }
  },
  methods: {

    ...mapActions(['getStudents', 'getUserTrainingByID', 'selectTrainee']),

    onProfileClicked() {
      this.$router.push('/profile');
    },
    /**
     *
     */
    onAddNewTrainingClicked() {
      this.$modal.show('add-training');
    },

    onReviewClicked(trainee) {
      this.selectTrainee(trainee);
      this.$router.push(`/trainee/${trainee.user.name}`)
    },

    /**
     *
     */
    onAddTrainingClicked() {
      this.$store.dispatch('addNewTraining', this.newTraining);
      this.$toast.success("Added!");
      this.$modal.hide('add-training');
    }
  }
};
</script>

<style lang="scss">
.pharmacy-dashboard {
  .vm--modal {
    background: rgba(253, 253, 253, 1);
    border-radius: 30px;
    width: auto !important;
    max-width: 500px;
    height: auto !important;
    max-height: 600px;
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables";

.trainee-dashboard {
  tr, tbody, table, thead, .table-striped {
    border-color: #FFC200;
  }

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

  .wrapper, .container {
    background: white;
  }

  .top-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .round-image {
      width: 150px;
      height: 150px;
    }

    .mid-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 15px;

      .title {
        margin: 5px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;

        color: #000000;
      }

      .mid-text {
        text-align: left;
        margin: 0px;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;

        color: #000000;
      }

    }


    .editButton {
      margin-top: 20px;
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


  }

  hr {
    color: $pharma_yellow;
    border-color: $pharma_yellow;
  }

}

.pharmacy-dashboard {

  .modal-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 60%;
    margin: 0 auto;
    padding: 10px;

    img {
      width: 300px;
      margin-bottom: 20px;
    }

    label {
      display: block;
      text-align: left;
    }

    input {
      background: #FFFFFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      border: none;
      height: 40px;
      padding: 10px;
    }

    .editButton {
      margin-top: 20px;
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


  }

  tr, tbody, table, thead, .table-striped {
    border-color: #FFC200;
  }

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

  .wrapper, .container {
    background: white;
  }

  .top-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .round-image {
      width: 150px;
      height: 150px;
    }

    .mid-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 15px;

      .title {
        margin: 5px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;

        color: #000000;
      }

      .mid-text {
        text-align: left;
        margin: 0px;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;

        color: #000000;
      }

    }


    .editButton {
      margin-top: 20px;
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


  }

  .bottom-row {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-weight: bold;

    }
  }

  hr {
    color: $pharma_yellow;
    border-color: $pharma_yellow;
  }
}

.bottom-row {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-weight: bold;

  }
}

.bottom {
  margin-top: 20px;
  position: relative;
  bottom: 0%;
}


</style>
