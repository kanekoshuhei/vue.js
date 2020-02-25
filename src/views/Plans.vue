<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'plan_edit' }">
          <v-btn color="info">
            追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers='headers' :items='plans'>
          <template v-slot:item.date="{ item }">
            <span>{{item.date}}</span>
          </template>
          <template v-slot:item.twitter_id="{ item }">
            <span>@{{item.twitter_id}}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

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
        { text: "操作", value: "action", sortable: false }
      ],
      plans: []
    };
  },
  filters: {
    moment: function (date) {
        return moment(date).format('YYYY年MM月DD日 HH:mm');
    }
  },
  methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deletePlan({ id })
      }
    },
    ...mapActions(['deletePlan'])
  }
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>