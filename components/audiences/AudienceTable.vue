<template>
  <div>
    <v-card outlined elevation="0">
      <v-data-table
        :headers="headers"
        :items="audiences"
        item-key="id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search among the audience set"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.is_active="{ item }">
          <v-chip
            :color="item.is_active ? `green lighten-2` : `red lighten-2`"
            dark
          >
            {{ item.is_active ? `Yes` : `No` }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AudienceTable',
  data() {
    return {
      search: '',
    }
  },
  mounted() {
    this.$store.dispatch('fetchUserCohorts')
  },
  computed: {
    ...mapGetters({
      audiences: 'getUserCohorts',
    }),
    headers() {
      return [
        {
          text: 'Audience ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Audience Title', value: 'name' },
        {
          text: 'Audience Size',
          value: 'no_of_people',
        },
        { text: 'Currently Active?', value: 'is_active' },
        { text: 'Description', value: 'description' },
      ]
    },
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      )
    },
  },
}
</script>

<style></style>
