<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>test</h1>
      </v-flex>

      <v-flex mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-date-picker
                v-model="plan.date"
                full-width
                locale="jp-ja"
                :day-format="date => new Date(date).getDate()"
                class="mb-5"
                label="日付">
              </v-date-picker>
              <v-select :items="parks" v-model="selectedPark" v-on:change="changedPark" label="PARK" required></v-select>
              <v-select :items="shows" v-model="plan.show" item-text="name" item-value="id" v-on:change="changedShow" label="SHOW" required></v-select>
              <!-- <v-select :items="shows" v-model="plan.show" item-text="name" item-value="id" label="TIME" required></v-select> -->
              <div class="text-center mt-5">
                <v-btn @click="$router.push({ name: 'plans' })">キャンセル</v-btn>
                <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import prefs from "../mixins/PrefsMixin.js";
// import schedules from '../assets/show_schedule.json'

export default {
  created() {
    if (!this.$route.params.plan_id) return;

    const plan = this.$store.getters.getPlanById(
      this.$route.params.plan_id
    );
    if (plan) {
      this.plan = plan;
    } else {
      this.$router.push({ name: "plans" });
    }
  },
  data() {
    return {
      plan: {},
      selectedPark: 'a',
      selectedShow: 'iOS',
      parks: ['a','b'],
      shows: [],
      // schedules: schedules
    };
  },
  mixins: [prefs],
  methods: {
    submit() {
      console.log(this.$store.state);
      this.$set(this.plan, 'twitter_id', this.$store.state.login_user_twitter_id);
      if (this.$route.params.plan_id) {
        this.updatePlan({
          id: this.$route.params.plan_id,
          plan: this.plan
        });
      } else {
        this.addPlan(this.plan);
      }
      this.$router.push({ name: "plans" });
      this.plan = {};
    },
    changedPark() {
      var tmp_shows = [];
      if (this.selectedPark == 'a') {
        tmp_shows = [
          {id: 1, name: 'iOS'},
          {id: 2, name: 'Android'},
          {id: 3, name: 'FrontEnd'},
          {id: 4, name: 'BackEnd'},
          {id: 5, name: 'Server'},
        ]
      } else if (this.selectedPark == 'b') {
        tmp_shows = [
          {id: 6, name: 'UI / UX'},
          {id: 7, name: 'Tools'},
        ]
      }
      this.shows = tmp_shows;
    },
    changedShow() {

    },
    ...mapActions(["addPlan", "updatePlan"]),
    ...mapGetters(["login_user_twitter_id"])
  }
};
</script>