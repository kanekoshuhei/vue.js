<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マイページ</h1>
        <p>{{ userName }}</p>
        <img v-if="photoURL" :src="photoURL" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userName", "photoURL"])
  }
};
</script>
