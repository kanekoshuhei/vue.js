<template>
  <v-app>
    <v-app-bar app dark depressed>
      <!-- <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon> -->
      <v-toolbar-title>test</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'plan_edit' }" class="ml-2">
        <v-btn small depressed color="secondary">
          <v-icon>mdi-pencil</v-icon>追加
        </v-btn>
      </router-link>
      <v-menu v-model="ntf_open" :close-on-click="true" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge color="red" class="ml-2" content="3" overlap>
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-menu>
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

    <v-footer dark absolute padless>
      <v-card flat tile width="100%" class="text-center">
        <v-card-text>
          <router-link :to="{ name: 'plans' }">
            <v-btn class="mx-8" icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'plan_edit' }">
            <v-btn class="mx-8" icon>
              <v-icon>mail</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'mypage' }">
            <v-btn class="mx-8" icon>
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
    ntf_open: false
  }),
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
