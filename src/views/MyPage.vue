<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マイページ</h1>
        <p>{{ userName }}</p>
        <img v-if="photoURL" :src="photoURL" />
        <h3>マイプラン一覧</h3>
        <v-data-iterator :items="myPlans">
          <template v-slot:default="props">
            <v-row>
              <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-card @click="onClickEvent(item)">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.myPlans = this.$store.state.plans.filter(plan => plan.twitter_id == this.$store.getters.login_user_twitter_id);
  },
  data() {
    return {
      myPlans: [],
    }
  },
  computed: {
    ...mapGetters(["userName", "photoURL", "login_user_twitter_id"])
  }
};
</script>
