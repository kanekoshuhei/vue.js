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
            </router-link> -->
            <!-- <router-link :to="{ name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>-->
            <!-- <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon> -->
          <!-- </template>
        </v-data-table>
      </v-flex>
    </v-layout> -->
    <v-data-iterator
      :items="plans"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card @click="onClickEvent(item)">
              <v-card-title class="subheading font-weight-bold">
                <a :href="twitter_url + item.twitter_id">
                  <v-avatar>
                    <img class="profile_img mr-1" :src="item.profile_image_url" />
                  </v-avatar>
                  <span>@{{item.twitter_id}}</span>
                </a>
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>日時:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.date }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>ショー:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.show }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>twitter_id:</v-list-item-content>
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

export default {
  created() {
    this.plans = this.$store.state.plans;
  },
  data() {
    return {
      headers: [
        { text: "日時", value: "date" },
        { text: "ショー", value: "show" },
        { text: "twitter", value: "twitter_id" },
        { text: "詳細", value: "action", sortable: false }
      ],
      plans: [],
      twitter_url: "https://twitter.com/",
      loader: null,
      itemsPerPage: 12,
    };
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