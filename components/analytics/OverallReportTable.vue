<template>
  <v-card>
    <v-card-title>
      Broadcast Events
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="broadcastEvents"
      :sort-by="sortBy"
      :search="search"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
    <template v-slot:item.color="{ item }">
      <v-chip
        :color="item.color"
        dark
      >
        {{ item.color }}
      </v-chip>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OverallReportTable',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Broadcast Title',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Goal', value: 'goal.name' },
        { text: 'Color', value: 'color' },
        { text: 'Template', value: 'template.short_code' },
        { text: 'User Cohort', value: 'user_cohort.name' },
        { text: 'Total Messages', value: 'total_messages' },
        { text: 'Scheduled Messages', value: 'scheduled_messages' },
        { text: 'Sent Messages', value: 'sent_messages' },
        { text: 'Read Messages', value: 'read_messages' },
        { text: 'Success Percent', value: 'success_percent' },
      ],
      sortBy: [
        'goal.name',
        'template.short_code',
        'user_cohort.name',
        'total_messages',
        'scheduled_messages',
        'sent_messages',
        'read_messages',
        'success_percent',
      ],
    }
  },
  computed: {
    ...mapGetters({
      broadcastEvents: 'getBroadcastEvents',
    }),
  },
  created() {
    this.isLoading = true
    this.$store
      .dispatch('fetchBroadcastEvents')
      .then(() => {
        this.isLoading = false
      })
      .catch((err) => {
        console.log(err)
        this.isLoading = false
      })
  },
}
</script>

<style></style>
