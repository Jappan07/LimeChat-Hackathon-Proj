<template>
  <div>
    <v-card outlined elevation="0">
      <v-data-table
        :headers="headers"
        :items="contacts"
        item-key="id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search among the contacts"
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
        <template v-slot:item.lead_score="{ item }">
          <v-chip
            :color="item.lead_score < 11 ? colorArray[item.lead_score] : `green`"
            dark
          >
            {{ item.lead_score }}
          </v-chip>
        </template>
        <template v-slot:item.tag.name="{ item }">
          #{{ item.tag.name }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactsTable',
  data() {
    return {
      search: '',
      colorArray: [
        '#809900',
        '#E6B3B3',
        '#E6331A',
        '#4D8000',
        '#4DB3FF',
        '#1AB399',
        '#E666B3',
        '#33991A',
        '#CC9999',
        '#B3B31A',
        '#00E680',
        '#4D8066',
        '#FF4D4D',
        '#99E6E6',
        '#6666FF',
      ],
    }
  },
  mounted() {
    this.$store.dispatch('fetchContacts')
  },
  computed: {
    ...mapGetters({
      contacts: 'getContacts',
    }),
    headers() {
      return [
        {
          text: 'Contact ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Contact Name', value: 'name' },
        {
          text: 'Contact Phone',
          value: 'phone_number',
        },
        { text: 'Currently Active?', value: 'is_active' },
        { text: 'Lead Score', value: 'lead_score' },
        { text: 'Tag name', value: 'tag.name' },
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
