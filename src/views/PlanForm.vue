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
              <v-select :parks="(value, key) in parks" v-model="selectedKey" v-on:change="selected" label="パーク"></v-select>
              <v-select v-model="plan.show" v-if="selectedItem" :shows="shows" label="ショー">
                {{ item.name }}
              </v-select>
              <p class="title">日付</p>
              <v-date-picker
                v-model="plan.date"
                full-width
                locale="jp-ja"
                :day-format="date => new Date(date).getDate()"
                label="日付">
              </v-date-picker>
              <div class="text-center">
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
import prefs from "../mixins/PrefsMixin.js";

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
      selectedKey: '',
      selectedItem:'',
      parks: {
          Toyota: [
              { name: 'Aqua' },
              { name: 'Prius' },
              { name: 'Collora' },
              { name: 'Vitz' },
              { name: 'Crown' },
          ],
          Honda: [
              { name: 'N-BOX' },
              { name: 'Freed' },
              { name: 'VEZEL' },
              { name: 'N-WGN' },
              { name: 'Fit' },
          ],
      }
    };
  },
  mixins: [prefs],
  methods: {
    submit() {
      if (this.$route.params.plan_id) {
        this.updatePlan({
          id: this.$route.params.plan_id,
          plan: this.plan
        });
      } else {
        this.addPlan(this.plan);
      }
      this.$router.push({ name: "planes" });
      this.plan = {};
    },
    selected() {
      this.selectedItem = this.items[this.selectedKey];
    },
    ...mapActions(["addPlan", "updatePlan"])
  }
};
</script>