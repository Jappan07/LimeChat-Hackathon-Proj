<template>
  <v-app>
    <v-row justify="center" wrap>
      <v-col cols="11" class="pa-3">
        <p class="headline mb-3 mt-3 ml-3">Broadcast Analytics Detail</p>
        <v-divider> </v-divider>
        <analytics-card :currentEvent="currentEvent" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import OverallReportTable from '../../components/analytics/OverallReportTable.vue'
import AnalyticsCard from '../../components/analytics/AnalyticsCard.vue'
export default {
  components: { OverallReportTable, AnalyticsCard },
  name: 'AnalyticsPageDetail',

  computed: {
    ...mapGetters({
      currentEvent: 'getCurrentBrdEvent',
    }),
    getCurrentBrdId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.$store.dispatch('fetchSingleBroadcastEvent', this.getCurrentBrdId)
  },
}
</script>
