<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex mt-5>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ request_complete_text }}
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
                <v-btn
                  v-bind:disabled="requestBtnStatus"
                  color="info"
                  class="ml-2"
                  @click="submit"
                >{{ request_label }}</v-btn>
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
import firebase from "firebase";
import "firebase/firestore";

export default {
  async created() {
    if (!this.$route.params.plan_id) return;
    const plan = this.$store.getters.getPlanById(this.$route.params.plan_id);
    if (plan) {
      this.plan = plan;
    } else {
      this.$router.push({ name: "plans" });
    }
    if (
      await this.existsPlanRequest(
        this.$store.getters.uid,
        this.$route.params.plan_id
      )
    ) {
      this.disableRequestBtn();
    }
  },
  data() {
    return {
      plan: {},
      planRequest: {},
      snackbar: false,
      request_label: "リクエスト",
      request_complete_text: "リクエストが完了しました。",
      timeout: 2000,
      requestBtnStatus: false
    };
  },
  computed: {},
  methods: {
    submit() {
      if (this.$route.params.plan_id) {
        this.addPlanRequest({
          user_id: this.$store.getters.uid,
          plan_id: this.$route.params.plan_id
        });
        this.disableRequestBtn();
        this.snackbar = true;
      }
    },
    async existsPlanRequest(user_id, plan_id) {
      var existsPlanRequest = false;
      await firebase
        .firestore()
        .collection(`plan_requests`)
        .where("user_id", "==", user_id)
        .where("plan_id", "==", plan_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            existsPlanRequest = doc.exists;
          });
        });
      return existsPlanRequest;
    },
    disableRequestBtn() {
      this.requestBtnStatus = true;
      this.request_label = "リクエスト済";
    },
    ...mapActions(["addPlanRequest"]),
    ...mapGetters(["uid"])
  }
};
</script>