<template>
  <v-app>
    <v-row justify="center" wrap>
      <v-col cols="11" class="pa-3">
        <p class="headline mb-3 mt-3 ml-3">Broadcast Analytics Detail</p>
        <v-divider> </v-divider>
        <analytics-card />
        <overall-report-table />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import OverallReportTable from '../../components/analytics/OverallReportTable.vue'
import AnalyticsCard from '../../components/analytics/AnalyticsCard.vue'
export default {
  components: { OverallReportTable, AnalyticsCard },
  name: 'AnalyticsPageDetail',
}
</script>
