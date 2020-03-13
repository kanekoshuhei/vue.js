<template>
  <v-app>
    <v-app-bar app dark depressed>
      <!-- <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon> -->
      <v-toolbar-title>test</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'plan_edit' }">
        <v-btn small depressed color="secondary">
          <v-icon small>{{ icons.mdiPencil }}</v-icon>追加
        </v-btn>
      </router-link>
      <v-avatar size="36px" class="ml-2" @click.stop="toggleSideMenu">
        <img v-if="photoURL" :src="photoURL" />
      </v-avatar>
      <!-- <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>-->
    </v-app-bar>
    <SideNav />

    <v-content>
      <v-container fluid fill-height align-start>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import SideNav from "./components/SideNav";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mdiAccount, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";

export default {
  name: "App",
  components: {
    SideNav
  },
  created() {
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
  data: () => ({
    icons: {
      mdiAccount,
      mdiPencil,
      mdiShareVariant,
      mdiDelete
    }
  }),
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
    ...mapGetters(["userName", "photoURL"])
  }
};
</script>
