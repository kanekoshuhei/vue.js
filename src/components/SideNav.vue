<template>
  <v-navigation-drawer v-model="$store.state.drawer" :right="true" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="photoURL" :src="photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "プラン一覧", icon: "mdi-menu", link: { name: "plans" } }
      ]
    };
  },
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["userName", "photoURL"])
  }
};
</script>