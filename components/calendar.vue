<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn
            depressed
            color="primary"
            class="mr-4"
            @click="openDialog"
            dark
          >
            New Event
          </v-btn>
          <v-btn
            depressed
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn depressed fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            depressed
            fab
            text
            small
            color="grey darken-2"
            class="mr-4"
            @click="next"
          >
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <!-- add modal -->
        <v-row v-if="!currentlyEditing" justify="center">
          <event-create-form
            :dialog="dialog"
            @toggleDialog="dialog = !dialog"
            @getBroadcastEvents="getBroadcastEvents()"
          />
        </v-row>
        <v-row v-else justify="center">
          <event-edit-form
            :dialog="dialog"
            :color="selectedEvent.color"
            :selected-event-id="selectedEvent.id"
            @toggleDialog="dialog = !dialog"
            @getBroadcastEvents="getBroadcastEvents()"
          />
        </v-row>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="broadcastEvents"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

import eventCreateForm from './forms/eventCreatForm.vue'
import eventEditForm from './forms/eventEditForm.vue'

export default {
  components: { eventCreateForm, eventEditForm },
  data() {
    return {
      isNewEvent: false,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,
      dialogDate: false,
      selectedTemplate: '',
    }
  },
  computed: {
    ...mapGetters({
      broadcastEvents: 'getBroadcastEvents',
      currentEvent: 'getCurrentBrdEvent',
    }),
    title() {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      })
    },
  },
  mounted() {
    this.getBroadcastEvents()
  },
  methods: {
    async getBroadcastEvents() {
      this.$store.dispatch('fetchBroadcastEvents')
    },
    async updateEvent() {
      // patch request
      // (this.currentlyEditing)=>{}
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    openDialog() {
      this.currentlyEditing = false
      this.dialog = true
    },
    handleSelectedTemplate(templateId) {
      this.selectedTemplateId = templateId
    },
    toggleInput(selected, current) {
      if (selected.includes(current)) {
        const newSelectedFlags = selected.filter((flag) => flag !== current)
        return newSelectedFlags
      }
      return [...selected, current]
    },
    getEventColor(e) {
      return e.color
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    editEvent(e) {
      this.currentlyEditing = e.id
    },
    async showEvent({ nativeEvent, event }) {
      this.currentlyEditing = true
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.dialog = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      this.start = start
      this.end = end
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
  },
}
</script>
<style lang="scss" scoped></style>
