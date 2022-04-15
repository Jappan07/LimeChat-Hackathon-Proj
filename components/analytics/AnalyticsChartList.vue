<template>
  <v-row justify="space-around" class="mb-5 mt-5 pa-3" wrap>
    <v-col cols="12">
      <v-row wrap>
        <v-btn small @click="fill = !fill">{{
        fill ? `Filled View` : `Basic View`
      }}</v-btn>
      <v-alert
      outlined
      class="ml-3"
      border="right"
      type="info"
    >
      These metrics depict the visual representation of data related to last broadcast events.
    </v-alert>
      </v-row>
    </v-col>
    <v-col cols="3" v-for="item in chartsList" :key="item.value">
      <v-card class="pa-4 mx-auto text-center">
        <v-card-text>
          <v-sheet>
            <v-sparkline
              :value="analytics[item.value]"
              :gradient="gradients[chartsList.indexOf(item)]"
              height="100"
              padding="24"
              :smooth="radius || false"
              :fill="fill"
              auto-draw
              stroke-linecap="round"
            >
              <template v-slot:label="item">
                {{ item.value }}
              </template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="subtitle-2 font-weight-bold">
            {{ item.title }}
          </div>
        </v-card-text>
        <!-- <v-card-text>
          <v-sparkline
            :value="analytics[item.value]"
            :gradient="gradients[chartsList.indexOf(item)]"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>
        </v-card-text> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AnalyticsChartList',
  data() {
    return {
      width: 4,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradients: [
        ['#222'],
        ['#42b3f4'],
        ['red', 'orange', 'yellow'],
        ['purple', 'violet'],
        ['#00c6ff', '#F0F', '#FF0'],
        ['red', 'orange', 'yellow'],
        ['#42b3f4'],
        ['#f72047', '#ffd200', '#1feaea'],
      ],
      gradientDirection: 'top',
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      chartsList: [
        {
          title: 'Total Messages',
          value: 'total_messages',
        },
        {
          title: 'Scheduled Messages',
          value: 'scheduled_messages',
        },
        {
          title: 'Sent Messages',
          value: 'sent_messages',
        },
        {
          title: 'Read messages',
          value: 'read_messages',
        },
        {
          title: 'Success Percent',
          value: 'success_percent',
        },
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
