<template>
  <v-app>
    <v-app-bar app dark depressed>
      <v-toolbar-title>test</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$store.state.login_user">
        <router-link :to="{ name: 'plan_edit' }" class="ml-2">
          <v-btn small depressed color="secondary">
            <v-icon>mdi-pencil</v-icon>追加
          </v-btn>
        </router-link>
        <v-menu v-model="showMenu" absolute offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-badge color="red" class="ml-2" content="3" overlap>
                <v-icon>mdi-bell-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-avatar size="36px" class="ml-2" @click.stop="toggleSideMenu">
          <img v-if="photoURL" :src="photoURL" />
        </v-avatar>
      </template>
    </v-app-bar>
    <SideNav />

    <v-content class="mb-10">
      <v-container fluid fill-height align-start>
        <router-view />
      </v-container>
    </v-content>

    <v-footer dark fixed padless>
      <v-card flat tile width="100%" class="text-center">
        <v-card-text>
          <router-link :to="{ name: 'plans' }">
            <v-btn class="mx-9" icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'plan_edit' }">
            <v-btn class="mx-9" icon>
              <v-icon>mail</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'mypage' }">
            <v-btn class="mx-9" icon>
              <v-icon>person</v-icon>
            </v-btn>
          </router-link>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import SideNav from "./components/SideNav";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    SideNav
  },
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    showMenu: false
  }),
  created() {
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
        this.fetchAddresses();
        this.fetchPlans();
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "plans" });
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" });
      }
    });
  },
  methods: {
    ...mapActions([
      "toggleSideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "fetchAddresses",
      "fetchPlans"
    ])
  },
  computed: {
    ...mapGetters(["photoURL"])
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
