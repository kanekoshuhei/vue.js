<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>test</h1>
      </v-flex>

      <v-flex mt-5>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-card>
          <v-card-text>
            <v-form>
              <p>{{ plan.date }}</p>
              <p>{{ plan.show }}</p>
              <p>{{ plan.twitter_id }}</p>
              <div class="text-center mt-5">
                <v-btn @click="$router.push({ name: 'plans' })">キャンセル</v-btn>
                <v-btn color="info" class="ml-2" @click="submit">リクエスト</v-btn>
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

export default {
  created() {
    if (!this.$route.params.plan_id) return;

    const plan = this.$store.getters.getPlanById(this.$route.params.plan_id);
    if (plan) {
      this.plan = plan;
    } else {
      this.$router.push({ name: "plans" });
    }
  },
  data() {
    return {
      plan: {},
      planRequest: {},
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000
    };
  },
  methods: {
    submit() {
      if (this.$route.params.plan_id) {
        this.addPlanRequest({
          user_id: this.$store.getters.uid,
          plan_id: this.$route.params.plan_id
        });
        snackbar = true;
      }
      this.plan = {};
    },
    ...mapActions(["addPlanRequest"]),
    ...mapGetters(["uid"])
  }
};
</script>