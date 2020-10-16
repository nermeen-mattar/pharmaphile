<template>
  <div class="wrapper pharma min-vh-100 min-vw-100 p-0 m-0">
    <modal :adaptive="true" :resizable="true" name="add-training">
      <div class="modal-wrapper">
        <img alt="Logo" src="../assets/logo.png">
        <label for="title">Title</label>
        <input id="title" class="form-group" type="text">
        <label for="date">Due Date</label>
        <input id="date" class="form-group" type="date">
        <button class="btn editButton">Add</button>
      </div>
    </modal>
    <div class="container min-vw-100 p-0 m-0">
      <div class=" min-vw-100">
        <navbar></navbar>
      </div>
      <div class="top-wrapper">
        <img alt="Profile Picture" class="round-image" src="../assets/roundDummy.png">
        <div class="mid-wrap">
          <p class="title">Al-taleb Pharmacy</p>
          <p class="mid-text">Pharmacy</p>
          <p class="mid-text">Mohammad jaber</p>
          <p class="mid-text">0786542310</p>
        </div>
        <div class="reg-wrap">
          <button class="btn editButton">Edit Profile</button>
        </div>
      </div>

      <hr>
      <div class="bottom-row min-vw-100">
        <h3 class="title">Applied Training Possitions</h3>
        <table class="table table-hover table-striped table-light">
          <thead>
          <tr>
            <th class="table-col-1" scope="col">Name</th>
            <th class="table-col-3" scope="col">Applied Date</th>
            <th class="table-col-4" scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">Ahmad</th>
            <td>12/3/2020</td>
            <td class="status-code">
              <button class="btn btn-primary">Review</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Ahmad</th>
            <td>12/3/2020</td>
            <td class="status-code">
              <button class="btn btn-primary">Review</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Ahmad</th>
            <td>12/3/2020</td>
            <td class="status-code">
              <button class="btn btn-primary">Review</button>
            </td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" style="max-width: 400px; width: 350px;margin: 10px auto;"
                @click="onAddNewTrainingClicked()">Add new training position
        </button>
      </div>
      <!--    Table Begin-->

    </div>
    <div class="bottom">
      <footer-component></footer-component>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navigation/NavbarComponent';
import FooterComponent from '@/components/footer/FooterComponent';

export default {
  components: {
    FooterComponent,
    Navbar
  },
  name: 'PharmacyDashboard',
  methods: {
    onAddNewTrainingClicked() {
      this.$modal.show('add-training');
    }
  }
};
</script>

<style lang="scss">
.pharma {
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
.bottom {
  position: fixed;
  bottom: 0%;
}



</style>

