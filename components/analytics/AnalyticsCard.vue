<template>
  <v-row justify="space-around" class="mb-5 mt-5 pa-3" wrap>
    <v-col cols="12">
      <v-alert outlined class="ml-3" border="right" type="info">
        These metrics depict the visual representation of data related to last
        broadcast events.
      </v-alert>
    </v-col>
    <v-col cols="6">
      <v-card
        outlined
        flat
        rounded="0"
        height="500"
        :class="`${currentEvent.color} lighten-2`"
      >
        <v-card-text>
          <div>
            <v-chip>{{
              currentEvent.goal ? currentEvent.goal.name : ''
            }}</v-chip>
          </div>
          <p class="mt-4 text-h4 text--primary">{{ currentEvent.name }}</p>
          <p>{{ currentEvent.content }}</p>
          <div class="text--primary">
            <p>
              <strong>Template used: </strong>
              {{ currentEvent.template ? currentEvent.template.name : 'N/A' }}
            </p>
            <p>
              <strong>Audience: </strong>
              {{ currentEvent.cohort ? currentEvent.cohort.name : 'N/A' }}
            </p>
            <p>
              <strong>Scheduled Time: </strong>
              {{ new Date(Date.parse(currentEvent.schedule_time)) }}
            </p>
            <p>
              <strong>Completion Time: </strong
              >{{ new Date(Date.parse(currentEvent.est_time_of_completion)) }}
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            :color="`${currentEventProgress !== 0 ? 'green' : 'red'} accent-4`"
          >
            {{ currentEventProgress !== 0 ? `In Progress` : `Failed` }} ({{
              currentEventProgress
            }}
            %)
          </v-btn>
          <v-progress-linear
            :color="`${currentEventProgress !== 0 ? 'green' : 'red'} accent-4`"
            :buffer-value="currentEventProgress"
            stream
          ></v-progress-linear>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card outlined flat rounded="0" height="500">
        <v-card-title>Broadcast Speed</v-card-title>
        <v-card-text>
          <v-sheet>
            <v-sparkline
              :value="[
                10, 100, 1000, 2000, 3000, 5000, 8000, 10000, 12000, 15000,
                18000, 20000,
              ]"
              :gradient="gradients[7]"
              :padding="padding"
              :line-width="width"
              height="180"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            >
              <template v-slot:label="item">
                {{ item.value }}
              </template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
    <div class="mb-3 mt-2">
      <v-divider></v-divider>
    </div>
    <v-col cols="3" v-for="item in chartsList" :key="item.value">
      <v-card class="pa-4 mx-auto text-center" min-height="150">
        <v-card-text class="headline primary--text text--darken-3">
          {{
            item.value === 'success_percent' ? currentEventProgress + '%' : currentEvent[item.value]
          }}
          {{
            item.value === 'conversion_rate'
              ? Math.floor(Math.random() * 80 + 1) + '%'
              : ''
          }}
          {{
            item.value === 'read_rate'
              ? Math.floor(Math.random() * 80 + 1) + '%'
              : ''
          }}
          {{
            item.value === 'reply_rate'
              ? Math.floor(Math.random() * 80 + 1) + '%'
              : ''
          }}
        </v-card-text>
        <v-card-text>
          <div class="subtitle-2 font-weight-bold">
            {{ item.title }}
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AnalyticsChartList',
  props: {
    currentEvent: {
      type: Object,
      required: true,
      default: {},
    },
  },
  computed: {
    currentEventProgress() {
      return Math.floor(Math.random() * 90 + 1)
    },
  },
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
          title: 'Click Rates',
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
}
</script>

<style></style>
