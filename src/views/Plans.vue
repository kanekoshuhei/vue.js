<template>
  <!-- <v-container text-xs-center justify-center fluid grid-list-md> -->
  <v-container fluid>
    <!-- <v-layout row wrap>
      <v-flex xs12 mt-3 justify-center>
        <v-data-table
          :headers="headers"
          :items="plans"
          :custom-filter="filter"
          @click:row="onClickEvent"
        >
          <template v-slot:item.date="{ item }">
            <span>{{item.date}}</span>
          </template>
          <template v-slot:item.twitter_id="{ item }">
            <a :href="twitter_url + item.twitter_id">
              <v-avatar size="36px">
                <img class="profile_img mr-1" :src="item.profile_image_url" />
              </v-avatar>
              <span>@{{item.twitter_id}}</span>
            </a>
          </template>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'plan', params: { plan_id: item.id }}">
              <v-btn class="mx-2" fab small depressed color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
    </router-link>-->
    <!-- <router-link :to="{ name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
    </router-link>-->
    <!-- <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon> -->
    <!-- </template>
        </v-data-table>
      </v-flex>
    </v-layout>-->
    <v-row justify="space-around">
      <v-switch inset v-model="ll" class="mx-2" label="L"></v-switch>
      <v-switch inset v-model="ss" class="mx-2" label="S"></v-switch>
    </v-row>
    <v-data-iterator :items="plans" :items-per-page.sync="itemsPerPage" hide-default-footer>
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card @click="onClickEvent(item)">
              <v-card-title class="subheading font-weight-bold">
                <a :href="twitter_url + item.twitter_id">
                  <v-avatar>
                    <img class="profile_img" :src="item.profile_image_url" />
                  </v-avatar>
                  <span>{{item.user_name}}</span>
                </a>
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-icon>event_note</v-icon>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-icon>flag</v-icon>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.show }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-icon>mdi-twitter</v-icon>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.twitter_id }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  created() {
    var ll = this.ll;
    var ss = this.ss;
    this.plans = this.$store.state.plans.filter(function(plan) {
      if (ll && ss) {
        return true;
      } else if (ll) {
        return true;
      } else if (ss) {
        return true;
      } else {
        return false;
      }
    });
  },
  data() {
    return {
      headers: [
        { text: "日時", value: "date" },
        { text: "ショー", value: "show" },
        { text: "twitter", value: "twitter_id" },
        { text: "詳細", value: "action", sortable: false }
      ],
      ll: true,
      ss: true,
      plans: [],
      twitter_url: "https://twitter.com/",
      loader: null,
      itemsPerPage: 12
    };
  },
  computed: {
    ...mapGetters(["userName"])
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月DD日 HH:mm");
    }
  },
  methods: {
    filter(val, search) {
      return val === search;
    },
    onClickEvent(data) {
      this.$router.push({ name: "plan", params: { plan_id: data.id } });
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    deleteConfirm(id) {
      if (confirm("削除してよろしいですか？")) {
        this.deletePlan({ id });
      }
    },
    ...mapActions(["deletePlan"])
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>