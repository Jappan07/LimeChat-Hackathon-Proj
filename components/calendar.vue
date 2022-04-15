<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn color="primary" class="mr-4" @click="dialog = true" dark>
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
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
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
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
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Create an Event</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="addEvent">
                    INITIATE BROADCAST
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                <v-container>
                  <br />
                  <h3>Broadcast Details</h3>
                  <br />
                  <v-form>
                    <v-text-field
                      v-model="name"
                      type="text"
                      label="Event Name (required)"
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model="description"
                      type="text"
                      label="Description"
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model="start"
                      type="date"
                      label="Start (required)"
                      outlined
                      dense
                    ></v-text-field>
                    <!-- time picker -->
                    <v-dialog
                      ref="dialog"
                      v-model="timePickerDialog"
                      :return-value.sync="time"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="Pick a time"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timePickerDialog"
                        v-model="time"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="timePickerDialog = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                    <v-text-field
                      v-model="color"
                      type="color"
                      label="Color (click to open color menu)"
                      outlined
                      dense
                    ></v-text-field>
                    <v-select
                      v-model="selectedGoal"
                      :items="goals"
                      label="Select your goal"
                      dense
                      outlined
                    ></v-select>
                  </v-form>
                </v-container>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-container>
                  <br />
                  <h3>Choose a Template</h3>
                  <br />
                  <v-list class="template-selector-box" two-line>
                    <template v-for="(template, index) in templates">
                      <v-list-item
                        @click="handleSelectedTemplate"
                        :key="template"
                        :class="
                          selectedTemplate === template ? 'pink--text' : null
                        "
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="template"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider
                        v-if="index < templates.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list>
                </v-container>
              </v-list>
              <br />
              <v-divider></v-divider>
              <v-list>
                <v-container>
                  <br />
                  <h3>Audience</h3>
                  <br />
                </v-container>
              </v-list>
            </v-card>
          </v-dialog>
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
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon @click="deleteEvent(selectedEvent.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{ selectedEvent.details }}
              </form>
              <form v-else>
                <textarea></textarea>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Close
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Edit
              </v-btn>
              <v-btn text v-else @click.prevent="updateEvent(selectedEvent)">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      name: null,
      description: null,
      start: null,
      end: null,
      color: '#1976D2', // default event color
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,
      timePickerDialog: false,
      dialogDate: false,
      selectedGoal: 'Awareness',
      goals: ['Awareness', 'Sales'],
      time: '',
      templates: [
        'woifbnwioufbfbwfwf',
        'jawhfowiuefnwoff',
        'wfkhbweaifuwab',
        'woifbnwioufbfbwfwfd',
        'woifbnwioufbfbwfwfw',
        'woifbnwioufbfbwfwfr',
      ],
      selectedTemplate: '',
    }
  },
  computed: {
    ...mapGetters({
      broadcastEvents: 'getBroadcastEvents',
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
    // this.$store
    //   .dispatch('fetchBroadcastEvents')
    //   .then((resp) => console.log(this.broadcastEvents))
    this.getBroadcastEvents()
  },
  methods: {
    async getBroadcastEvents() {
      this.$store
        .dispatch('fetchBroadcastEvents')
        .then((resp) => console.log(this.broadcastEvents))
      //   axios.get('').then((response) => response.data)
      //   this.events.push(data)
      this.events = [
        {
          id: 1,
          color: '#1976D2',
          details: 'some description',
          start: '2022-04-25',
          name: 'Some Title',
        },
        {
          id: 2,
          color: '#000',
          details: 'some description',
          start: '2022-04-25',
          end: '2022-04-25',
          name: 'Some Title',
        },
        {
          id: 3,
          color: '#c00c00',
          details: 'some description',
          start: '2022-04-26',
          end: '2022-04-26',
          name: 'Some Title',
        },
        {
          id: 4,
          color: '#c00c00',
          details: 'some description',
          start: '2022-04-04',
          name: 'Some Title',
        },
        {
          id: 4,
          color: '#efdefe',
          details: 'some description',
          start: '2022-04-11',
          name: 'Some Title',
        },
      ]
    },
    async addEvent() {
      if (this.name && this.start) {
        let data = {
          name: this.name,
          content: this.description,
          goal: 1,
          color: this.color,
          user_cohort: 1,
          template: 1,
          schedule_time: this.start,
        }
        console.log(this.name, this.color, this.description, this.selectedGoal)

        //   post request
        this.$store
          .dispatch('addNewBroadcast', data)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })

        this.getBroadcastEvents()
        this.name = ''
        this.details = ''
        this.start = ''
        this.end = ''
        this.color = '#1976D2'
        this.time = ''
      } else {
        alert('Name and start date are required')
      }
    },
    async updateEvent() {
      // patch request
      // (this.currentlyEditing)=>{}
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    async deleteEvent(e) {
      // delete request
      // axios.delete
      this.selectedOpen = false
      this.getBroadcastEvents()
    },
    handleSelectedTemplate(e) {
      this.selectedTemplate = e.target.innerText
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
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
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
<style lang="scss" scoped>
.v-sheet.v-card {
  border-radius: 0;
}
.v-text-field input {
  padding: 0;
}
.template-selector-box {
  height: 12rem;
  overflow: scroll;
  border: 0.5px solid grey;
  border-radius: 8px;
}
.pink--text {
  background: #c00d003b;
}
.v-list {
  padding: 0;
}
</style>
