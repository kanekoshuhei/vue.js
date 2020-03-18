import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: [],
    plans: [],
    login_user_twitter_id: ''
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    setTwitterLoginUser(state, twitter_id) {
      state.login_user_twitter_id = twitter_id
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    addAddress(state, { id, address }) {
      address.id = id
      state.addresses.push(address)
    },
    updateAddress(state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses[index] = address
    },
    deleteAddress(state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses.splice(index, 1)
    },
    clearPlan(state) {
      state.plans = []
    },
    addPlan(state, { id, plan }) {
      plan.id = id
      state.plans.push(plan)
    },
    updatePlan(state, { id, plan }) {
      const index = state.plans.findIndex(plan => plan.id === id)
      state.plans[index] = plan
    },
    deletePlan(state, { id }) {
      const index = state.plans.findIndex(plan => plan.id === id)
      state.plans.splice(index, 1)
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    fetchAddresses({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress', { id: doc.id, address: doc.data() }))
      })
    },
    fetchPlans({ commit }) {
      commit('clearPlan')
      firebase.firestore().collection(`plans`).get().then(snapshot => {
        snapshot.forEach(doc => {
          var doc_data = doc.data();
          axios.get('http://localhost:5000/tsukkomi-de7ed/us-central1/user?screen_name=' + doc.data().twitter_id)
            .then(response => {
              Vue.set(doc_data, 'user_name', response.data.name);
              Vue.set(doc_data, 'profile_image_url', response.data.profile_image_url);
              commit('addPlan', { id: doc.id, plan: doc_data });
            })
            .catch(response => console.log(response));
        })
      })
    },
    login({ commit }) {
      const twitter_auth_provider = new firebase.auth.TwitterAuthProvider()
      // const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(twitter_auth_provider).then((userCredential) => {
        // Get the Twitter screen name.
        commit('setTwitterLoginUser', userCredential.additionalUserInfo.username);
      }).catch((error) => {
        // An error occurred.
        console.log(error);
      });
    },
    logout() {
      firebase.auth().signOut()
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress({ getters, commit }, address) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc => {
          commit('addAddress', { id: doc.id, address })
        })
      }
    },
    updateAddress({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
          commit('updateAddress', { id, address })
        })
      }
    },
    deleteAddress({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress', { id })
        })
      }
    },
    addPlan({ getters, commit }, plan) {
      if (getters.uid) {
        firebase.firestore().collection(`plans`).add(plan).then(doc => {
          commit('addPlan', { id: doc.id, plan })
        })
      }
    },
    deletePlan({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`plans`).doc(id).delete().then(() => {
          commit('deletePlan', { id })
        })
      }
    },
    addPlanRequest({ getters }, plan_request) {
      if (getters.uid) {
        firebase.firestore().collection(`plan_requests`).add(plan_request)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    },
  },

  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    login_user_twitter_id: state => state.login_user ? state.login_user_twitter_id : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id),
    getPlanById: state => id => state.plans.find(plan => plan.id === id),
  },
  plugins: [createPersistedState()]
})
