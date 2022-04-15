<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn depressed icon dark @click="$emit('toggleDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create an Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn depressed dark text @click="addEvent">
            SCHEDULE BROADCAST
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
              label="Schedule Date (required)"
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
      <!-- choose template -->
      <v-list>
        <v-container>
          <br />
          <h3>Choose a Template</h3>
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
      <!-- choose audience -->
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
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: null,
      description: null,
      start: null,
      timePickerDialog: false,
      color: '',
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
    }),
  },
  mounted() {
    this.$store.dispatch('fetchTemplates')
    this.$store.dispatch('fetchGoals')
    this.$store.dispatch('fetchUserCohorts')
  },
  methods: {
    handleSelectedTemplate(templateId) {
      this.selectedTemplateId = templateId
    },
    handleSelectedCohort(cohortId) {
      this.selectedCohortId = cohortId
    },
    async addEvent() {
      if (this.name && this.start) {
        let data = {
          name: this.name,
          content: this.description,
          goal: this.selectedGoal,
          color: this.color,
          user_cohort: selectedCohortId,
          template: selectedTemplateId,
          schedule_time: this.start,
        }

        //   post request
        this.$store
          .dispatch('addNewBroadcast', data)
          .then((response) => {
            this.name = ''
            this.description = ''
            this.start = ''
            this.end = ''
            this.color = ''
            this.time = ''
            this.goals = ''
            this.$emit('getBroadcastEvents')
            $emit('toggleDialog')
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        alert('You missed some input fields')
      }
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
