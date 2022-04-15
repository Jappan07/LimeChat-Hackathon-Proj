<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark :color="color">
        <v-btn depressed icon dark @click="$emit('toggleDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn depressed dark text @click="updateEvent(currentEvent.id)">
            UPDATE EVENT
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-container>
          <br />
          <h3>Edit Broadcast Details</h3>
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
              <v-time-picker v-if="timePickerDialog" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  text
                  color="primary"
                  @click="timePickerDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  depressed
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
              item-text="name"
              item-value="id"
              label="Select your goal"
              dense
              outlined
            ></v-select>
          </v-form>
        </v-container>
      </v-list>
      <v-divider></v-divider>
      <!-- change template -->
      <v-list>
        <v-container>
          <br />
          <h3>Change a Template</h3>
          <br />
          <v-list class="template-selector-box" two-line>
            <template v-for="(template, index) in templates">
              <v-list-item
                @click="handleSelectedTemplate(template.id)"
                :key="template.id"
                :class="
                  selectedTemplateId === template.id ? 'pink--text' : null
                "
              >
                <v-list-item-content>
                  <v-list-item-title v-text="template.name"></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="template.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="template.short_code"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text
                  v-text="template.service_temp_id"
                ></v-list-item-action-text>
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
      <!-- change audience -->
      <v-list>
        <v-container>
          <br />
          <h3>Audience</h3>
          <br />
          <v-list class="template-selector-box" two-line>
            <template v-for="(cohort, index) in audience">
              <v-list-item
                @click="handleSelectedCohort(cohort.id)"
                :key="cohort.id"
                :class="selectedCohortId === cohort.id ? 'blue--text' : null"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="cohort.name"></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="cohort.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="cohort.short_code"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text
                  v-text="cohort.service_temp_id"
                ></v-list-item-action-text>
              </v-list-item>
              <v-divider
                v-if="index < cohort.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-container>
        <v-layout justify-center>
          <v-btn
            class="mb-8"
            depressed
            color="error"
            @click="deleteEvent(currentEventData.id)"
          >
            Delete Event
          </v-btn>
        </v-layout>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    color: { type: String, default: '' },
    dialog: {
      type: Boolean,
      default: false,
    },
    selectedEventId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      name: null,
      description: null,
      start: null,
      timePickerDialog: false,
      time: '',
      selectedGoal: '',
      selectedTemplateId: '',
      selectedCohortId: '',
    }
  },
  computed: {
    ...mapGetters({
      templates: 'getTemplates',
      goals: 'getGoals',
      audience: 'getUserCohorts',
      currentEventData: 'getCurrentBrdEvent',
    }),
  },
  mounted() {
    this.$store.dispatch('fetchSingleBroadcastEvent', this.selectedEventId).then(() => this.assignValues())
  },
  methods: {
    async deleteEvent(e) {
      console.log(this.currentEventData)
      // delete request
      this.$store.dispatch('deleteFolder', this.currentEventData.id)
      this.$emit('getBroadcastEvents')
      this.$emit('toggleDialog')
    },
    handleSelectedTemplate(templateId) {
      this.selectedTemplateId = templateId
    },
    handleSelectedCohort(cohortId) {
      this.selectedCohortId = cohortId
    },
    assignValues(){
      this.name = this.currentEventData.name
      this.description = this.currentEventData.content
      this.start = this.currentEventData.start
      this.selectedGoal = this.currentEventData.goal
      this.selectedTemplateId = this.currentEventData.template ? this.currentEventData.template.id : null
      this.selectedCohortId = this.currentEventData.cohort ? this.currentEventData.cohort.id : null
    },
    updateEvent() {
      console.log(
        this.name,
        this.description,
        this.start,
        this.timePickerDialog,
        this.color,
        this.time,
        this.selectedGoal,
        this.selectedTemplateId,
        this.selectedCohortId
      )
      // this.$store.dispatch('updateBroadcastEvent')
      //   this.$emit('getBroadcastEvents')
    },
  },
}
</script>
<style lang="scss" scoped>
.v-sheet.v-card {
  border-radius: 0;
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
.blue--text {
  background: #009dc03b;
}
.v-list {
  padding: 0;
}
</style>
