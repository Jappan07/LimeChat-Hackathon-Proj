<template>
  <v-card outlined flat rounded="0" class="mb-4">
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
      <template v-slot:item.actions="{ item }">
        <v-btn small depressed outlined color="primary" class="mr-2" @click="viewDetail(item.id)"> View Detail </v-btn>
      </template>
      <template v-slot:item.color="{ item }">
        <v-chip :color="item.color" dark>
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
        { text: 'Actions', value: 'actions', sortable: false}
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
  methods: {
    viewDetail(id) {
      this.$router.push(`/analytics/${id}/`)
    }
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
