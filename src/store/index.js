import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../http/firebase/firebase';
import router from '../router/index';
import Helpers from '../services/helpers';
import { citiesData } from '../components/map/data/cities-data';

const MAP_DATA = citiesData;
let pharmaciesIndeces = {};
MAP_DATA.forEach((mapObj,index) => pharmaciesIndeces[mapObj.cityName] = index);
/* eslint-disable */ 
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // The user profile
    userProfile: {},
    mapData: [],
    // Pharmacies
    pharmacies: [
    // pharmacies: [
      {
        name: 'My Pharmacy',
        manager: 'Dr. haneen mustafa',
        address: 'Al-balqa - ahmad st',
        email: 'infopharmacy@email.com',
        phone: '0798654321',
        imageUrl: 'https://healthtimes.com.au/administrator/uploads/article_images/How%20To%20Become%20A%20Phar1593396808.jpg'
      },
    //   {
    //     title: 'Talal Pharmacy',
    //     pharmacist: 'Dr. haneen mustafa',
    //     location: 'Al-balqa - ahmad st',
    //     email: 'infopharmacy@email.com',
    //     phone: '0798654321',
    //     imageUrl: 'https://healthtimes.com.au/administrator/uploads/article_images/How%20To%20Become%20A%20Phar1593396808.jpg'
    //   },
    ],
    // Selected Pharmacy
    selectedPharmacy: {},
    // Selected Trainee
    selectedTrainee: {},
    // Selected Pharmacy Reviews
    reviews: [],
    // Selected Pharmacy Trainings
    trainings: [],
    // User Trainings
    userTrainings: [],
    // Pharmacy Students
    students: [],
    // Selected User
    s: ''
  },
  mutations: {

    /**
     *
     * @param state
     * @param val
     */
    setUserProfile(state, val) {
      state.userProfile = val;
    },

    /**
     *
     * @param state
     * @param val
     */
    setUserTrainings(state, val) {
      state.userTrainings = val;
    },
    /**
     *
     * @param state
     * @param pharmacies
     * @returns {*[]}
     */
    filterPharmacies(state, pharmacies) {
      const allPharmacies = pharmacies?.documents;
      let searchValue = pharmacies.payload.value;
      if (allPharmacies) {
        if(!searchValue || searchValue.trim() === '') { // empty search value
          state.pharmacies = allPharmacies;
        }
        state.pharmacies = allPharmacies.filter(pharmacy => {
          const pharmacyName = pharmacy.city;
          return pharmacyName.includes(searchValue) ||
          searchValue.includes(pharmacyName)
          ? pharmacy : '';
        });
      } else {
        return [];
      }
    },

    /**
     *
     * @param state
     * @param pharmacies
     * @returns {*[]}
     */
    searchPharmacies(state, pharmacies) {
      const allPharmacies = pharmacies?.documents;
      const mapDataCopy = JSON.parse(JSON.stringify(MAP_DATA))
      allPharmacies.forEach(pharmacy => {
        const cityIndex = pharmaciesIndeces[pharmacy.city];
        if(cityIndex!== undefined) {
          mapDataCopy[cityIndex].pharmaciesCount++;
        }
      });
      this.state.mapData = mapDataCopy;
      // change above to be called only when needed (on profile changed)
      
      let searchValue = pharmacies.payload;
      if (allPharmacies) {
        if(!searchValue || searchValue.trim() === '') { // empty search value
          state.pharmacies = allPharmacies;
        }
        state.pharmacies = allPharmacies.filter(pharmacy => {
          const pharmacyName = pharmacy.name.toLowerCase().replace(/\s/g, '');
          searchValue = searchValue.toLowerCase().replace(/\s/g, '');
          return pharmacyName.includes(searchValue) ||
          searchValue.includes(pharmacyName)
          ? pharmacy : '';
        });
      } else {
        return [];
      }
    },
        /**
     *
     * @param state
     * @returns {*[]}
     */
    relatedPharmacies(state) {
      state.pharmacies = state.pharmacies.filter(pharmacy => pharmacy.uuid !== state.selectedPharmacy.uuid);
    },

    /**
     *
     * @param state
     * @param students
     */
    setStudents(state, students) {
      state.students = students;
    },

    /**
     *
     * @param state
     * @param pharmacy
     */
    setSelectedPharmacy(state, pharmacy) {
      state.selectedPharmacy = pharmacy;
    },

    /**
     *
     * @param state
     * @param trainee
     */
    setSelectedTrainee(state, trainee) {
      state.selectedTrainee = trainee
    },

    /**
     *
     * @param state
     * @param s
     */
    setAnything(state, s) {
      state.s = s;
    },

    /**
     *
     * @param state
     * @param trainings
     */
    setTrainings(state, trainings) {
      state.trainings = trainings;
    },

    /**
     *
     * @param state
     * @param reviews
     */
    setReviews(state, reviews) {
      state.reviews = reviews;
    }
  },
  actions: {

    /**
     * @description Get pharmacy by pharmacy id
     * @param commit
     * @param id
     * @returns pharmacy object
     */
    async getPharmacyById({ commit }, id) {
      // const data = await fb.pharmaciesCollection.where("uuid", "==", id).get();
      // commit('setSelectedPharmacy', data.docs[0].data());
      // return data.docs[0].data();
      const docRef = await fb.pharmaciesCollection.doc(id).get();
      const pharmacyObj = docRef.data();
      commit('setSelectedPharmacy', pharmacyObj);
      return pharmacyObj;
    },

    /**
     *
     * @param commit
     * @param pharmacy
     * @returns {Promise<void>}
     */
    async getReviews({ commit }, pharmacy) {
      let reviews = [];
      await fb.pharmaciesCollection.doc(pharmacy.uuid)
        .collection('reviews')
        .get()
        .then(querySnapshot => {
          reviews = querySnapshot.docs.map(doc => doc.data());
        });
      commit('setReviews', reviews);
      return reviews;
    },

    /**
     *
     * @param commit
     * @param pharmacy
     * @returns {Promise<void>}
     */
    async getTrainings({ commit }, pharmacy) {
      // Get the trainings - pharmacy trainings
      let trainings = [];
      await fb.pharmaciesCollection.doc(pharmacy.uuid)
        .collection('trainings')
        .get()
        .then(querySnapshot => {
          trainings = querySnapshot.docs.map(doc => {
            console.log(doc);
            return doc.data();
          });
        });
      commit('setTrainings', trainings);
      return trainings;
    },

    /**
     * @description Get the Pharmacy students
     * @param commit
     * @param pharmacy
     * @returns {Promise<void>}
     */
    async getStudents({ commit }) { // , pharmacy
      const uid = fb.auth.currentUser.uid;
      let students = [];
      await fb.pharmaciesCollection.doc(uid) // was pharmacy.uuid ???
        .collection('students')
        .get()
        .then(querySnapshot => {
          students = querySnapshot.docs.map(doc => {
            console.log(doc);
            return doc.data();
          });
        });
      console.log(students);
      commit('setStudents', students);
      return students;
    },

    /**
     * @description Get the user enrolled trainings
     * @param commit
     * @param training
     * @returns {Promise<void>}
     */
    async getUserTrainings({ commit }, training) {
      let userTraining = [];
      // const uid = fb.auth.currentUser.uid;
      await fb.usersCollection.doc(training.userId)
        .collection('trainings')
        .get()
        .then(querySnapShot => {
          userTraining = querySnapShot.docs.map(doc => {
            return doc.data();
          });
        });
      commit('setUserTrainings', userTraining);
    },

    async getUserTrainingByID({commit}, user) {
      let userTraining = [];
      await fb.usersCollection.doc(user.uid)
        .collection('trainings')
        .get()
        .then(querySnapShot => {
          userTraining = querySnapShot.docs.map(doc => {
            return doc.data();
          });
        });
      commit('setUserTrainings', userTraining);
    },

    /**
     * @param dispatch
     * @param commit
     * @param pharmacy
     */
    selectPharmacy({ commit, dispatch }, pharmacy) {
      commit('setSelectedPharmacy', pharmacy);
      dispatch('getReviews', pharmacy);
      dispatch('getTrainings', pharmacy);
      dispatch('search'); /* to set pharmacies in state before filtering related pharmacies*/
      dispatch('getRelatedPharmacies');
    },

    /**
     *
     * @param commit
     * @param trainee
     */
    selectTrainee({commit}, trainee) {
      commit('setSelectedTrainee', trainee)
    },

    /**
     * @param dispatch
     * @param form
     * @returns {Promise<void>}
     */
    async addReview({ dispatch }, payload) {
      const pharmacyDoc = fb.pharmaciesCollection.doc(payload.pharmacyId);
      const docRef = await pharmacyDoc.get();
      const pharmacyObj = docRef.data();
      const reviewsCollection =  pharmacyDoc.collection('reviews');
      const querySnapshot = await reviewsCollection.get();
      pharmacyObj.rate = Helpers.getRate(pharmacyObj.rate, querySnapshot.size, payload.rate);
      pharmacyDoc.set(pharmacyObj);
      await reviewsCollection.doc().set(payload); // may need await so that when getReviews is called it has last update
      // dispatch('getReviews', pharmacyObj); covered in following line
      dispatch('selectPharmacy', pharmacyObj);
    },

    // /**
    //  * @param review
    //  * @param commit
    //  * @returns {Promise<void>}
    //  */
    // async submitReview({ commit }, review) {
    //   await fb.pharmaciesCollection.doc(review.uid) // state.selectedPharmacy.uuid???
    //     .collection('reviews')
    //     .doc(review.uid + review.description.trim())
    //     .set(review);
    //   commit('setAnything', '2'); // why ???
    // },

    /**
     * @description Submits a training in the user model and the pharmacy model
     * @param dispatch
     * @param training
     * @returns {Promise<void>}
     */
    async applyOnTraining({ dispatch }, training) {
      console.log(training);
      await fb.usersCollection.doc(training.userId)
        .collection('trainings')
        .doc(training.id)
        .set(training);

      await fb.pharmaciesCollection.doc(training.pharmacyId)
        .collection('students')
        .doc(training.userId)
        .set(training);

      dispatch('getUserTrainings', training);
    },


    async updateTraining({ dispatch }, training) {

      await fb.usersCollection.doc(training.userId)
        .collection('trainings')
        .doc(training.id)
        .set(training);

      await fb.pharmaciesCollection.doc(training.pharmacyId)
        .collection('students')
        .doc(training.userId)
        .set(training);

      dispatch('getUserTrainings', training);
    },

    /**
     *
     * @param commit
     * @param training
     * @returns {Promise<void>}
     */
    async addNewTraining({ commit }, training) {
      const uid = fb.auth.currentUser.uid;
      await fb.pharmaciesCollection.doc(uid)
        .collection('trainings')
        .doc() // uid + training.name.trim()???
        .set(training);
      commit('setAnything', '2');
    },

    /**
     *
     * @param dispatch
     * @param trainee
     * @returns {Promise<void>}
     */
    async updateUser({ dispatch }, trainee) {
      try {
        const uid = fb.auth.currentUser.uid;
        if (trainee.isTrainee) {
          await fb.usersCollection.doc(uid)
            .set({
              uid,
              isTrainee: true,
              name: trainee.name.toString(),
              password: trainee.password.toString(),
              email: trainee.email.toString(),
              phone: trainee.phone.toString(),
              university_number: trainee.university_number.toString(),
              university: trainee.university.toString(),
              about: trainee.about,
              university_year: trainee.university_year,
              imageUrl: trainee.imageUrl
            });
        } else {
          await fb.pharmaciesCollection.doc(uid)
            .set({
              uuid: uid,
              isTrainee: false,
              email: trainee.email,
              name: trainee.name,
              password: trainee.password,
              phone: trainee.phone,
              manager: trainee.manager,
              imageUrl: trainee.imageUrl,
              city: trainee.city,
              noOfStudents: trainee.noOfStudents,
              address: trainee.address
            });
        }
        Vue.$toast.success("Updated!");
        dispatch('fetchUserProfile', fb.auth.currentUser);
      } catch (e) {
        Vue.$toast.error(e.message);
      }
    },

    /**
     * @param dispatch
     * @param form
     * @returns {Promise<void>}
     */
    async login({ dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
        dispatch('fetchUserProfile', user);
      } catch (e) {
        // if(e.code === 'auth/user-not-found') {
        //   e.message = 'The username or password is incorrect.';
        // }
        Vue.$toast.error('The username or password is incorrect.'); // was e.message
      }
    },

    /**
     * @param commit
     * @param user
     * @returns {Promise<void>}
     */
    async fetchUserProfile({ commit, dispatch }, user) {
      // fetch user profile
      const userProfileData = await fb.usersCollection.doc(user.uid)
        .get();

      let userProfile = userProfileData.data();

      if (userProfile === null || userProfile === undefined) {
        console.log('Fetching Pharmacies');
        dispatch('fetchPharmacyProfile', user);
        return;
      }

      if (fb.usersCollection.doc(user.uid)
        .collection('trainings')) {
        fb.usersCollection.doc(user.uid)
          .collection('trainings')
          .get()
          .then(querySnapshot => {
            userProfile.trainings = querySnapshot.docs.map(doc => doc.data());
          });
      }

      // set user profile in state
      commit('setUserProfile', userProfile);
      sessionStorage.setItem('user', JSON.stringify(userProfile));

      // change route to dashboard
      router.push('/home');
    },

    /**
     *
     * @param commit
     * @param user
     * @returns {Promise<void>}
     */
    async fetchPharmacyProfile({ commit }, user) {
      /* eslint-disable */  debugger;
      // fetch user profile
      const userProfileData = await fb.pharmaciesCollection.doc(user.uid)
        .get();

      let userProfile = userProfileData.data();

      if (fb.pharmaciesCollection.doc(user.uid)
        .collection('trainings')) {
        fb.pharmaciesCollection.doc(user.uid)
          .collection('trainings')
          .get()
          .then(querySnapshot => {
            userProfile.trainings = querySnapshot.docs.map(doc => doc.data());
          });
      }

      // set user profile in state
      commit('setUserProfile', userProfile);
      sessionStorage.setItem('user', JSON.stringify(userProfile));

      // change route to dashboard
      router.push('/home');
    },

    /**
     * @param dispatch
     * @param form
     * @returns {Promise<void>}
     */
    async signup({ dispatch }, form) {
      try {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);

      if (form.isTrainee) {

        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid)
          .set({
            isTrainee: true,
            name: form.name.toString(),
            password: form.password.toString(),
            email: form.email.toString(),
            phone: form.phone.toString(),
            university_number: form.university_number.toString(),
            university: form.university.toString(),
            uid: user.uid
          });
        dispatch('fetchUserProfile', user);

      } else {
        await fb.pharmaciesCollection.doc(user.uid)
          .set({
            isTrainee: false,
            email: form.email,
            name: form.name,
            password: form.password,
            phone: form.phone,
            manager: form.manager,
            imageUrl: form.imageUrl,
            city: form.city,
            noOfStudents: form.noOfStudents,
            address: form.address,
            uuid: user.uid
          });
        dispatch('fetchPharmacyProfile', user);

      }
    } catch(e) {
      Vue.$toast.error(e.message);
    }

      // fetch user profile and set in state
    },

    /**
     *
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async search({ commit }, payload) {
      debugger;
      console.log('search');

      await fb.pharmaciesCollection.get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          console.log('xxxxx', documents);
          commit('searchPharmacies', {
            documents,
            payload
          });
        });
    },

    /**
     *
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async filter({ commit }, payload) {
      await fb.pharmaciesCollection.get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          commit('filterPharmacies', {
            documents,
            payload
          });
        });
    },
  
    /**
     *
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async getRelatedPharmacies({ commit }) {
      await fb.pharmaciesCollection.get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          commit('relatedPharmacies', {
            documents
          });
        });
    }
  },
  modules: {},
  getters: {

    /**
     * User Profile
     * @param state
     * @returns {string|any}
     */
    getUserProfile: (state) => {
      let jsonParsed = sessionStorage.getItem('user') === 'undefined' ? '' : JSON.parse(sessionStorage.getItem('user'));
      return state.userProfile === {} ? {} : jsonParsed;
    },

    /**
     * Selected Pharmacy
     * @param state
     * @returns {{}}
     */
    selectedPharmacy: (state) => {
      console.log(state.selectedPharmacy);
      return state.selectedPharmacy;
    },

    /**
     * Selected Trainee
     * @param state
     * @returns {{}}
     */
    selectedTrainee: (state) => {
      return state.selectedTrainee;
    },

    /**
     * Selected Pharmacy Trainings
     * @param state
     * @returns {[]}
     */
    selectedTrainings: (state) => {
      return state.trainings;
    },

    /**
     * Selected Pharmacy Reviews
     * @param state
     * @returns {[]}
     */
    selectedReviews: (state) => {
      return state.reviews;
    },

    /**
     * Selected Pharmacy Students
     * @param state
     * @returns {[]}
     */
    selectedStudent: (state) => {
      return state.students;
    },

    /**
     * Student Trainings
     * @param state
     * @returns {[]}
     */
    userTrainings: (state) => {
      return state.userTrainings;
    },

  },
});
