<template>
  <v-row justify="space-around" class="mb-5 mt-5 pa-3" wrap>
    <v-col cols="3" v-for="item in chartsList" :key="item.value">
      <v-card class="pa-4">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text>
          <v-sparkline
            :value="analytics[item.value]"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]
export default {
  name: 'AnalyticsChartList',
  data() {
    return {
      width: 4,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      chartsList: [
        {
          title: 'Conversion Rates',
          value: 'conversion_rate',
        },
        {
          title: 'Read Rates',
          value: 'read_rate',
        },
        {
          title: 'Reply Rates',
          value: 'reply_rate',
        },
        {
          title: 'Success Percent',
          value: 'success_percent',
        },
        {
          title: 'Read messages',
          value: 'read_messages',
        },
        {
          title: 'Sent Messages',
          value: 'sent_messages',
        },
        {
          title: 'Scheduled Messages',
          value: 'scheduled_messages',
        },

        {
          title: 'Total Messages',
          value: 'total_messages',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      analytics: 'getAnalytics',
    }),
  },
  mounted() {
    this.$store.dispatch('fetchAnalytics')
  },
}
</script>

<style></style>
