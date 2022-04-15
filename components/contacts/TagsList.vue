<template>
  <v-card max-width="600" class="mx-auto" flat outlined rounded="0">
    <v-list subheader two-line>
      <v-subheader inset class="subtitle-2">User Tags <v-btn x-small depressed outlined color="primary" class="ml-4" @click="fetchAllContacts()">Show all contacts</v-btn></v-subheader>

      <v-list-item v-for="tag in contactTags" :key="tag.name">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-tag </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="tag.name"></v-list-item-title>

          <v-list-item-subtitle v-text="tag.description"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="fetchNewContacts(tag.id)">mdi-reload</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TagsList',
  data: () => ({}),
  mounted() {
    this.$store.dispatch('fetchContactTags')
  },
  methods: {
      fetchNewContacts(tagId) {
          this.$store.dispatch('fetchContacts', tagId)
      },
      fetchAllContacts() {
          this.$store.dispatch('fetchContacts')
      }
  },
  computed: {
    ...mapGetters({
      contactTags: 'getContactTags',
    }),
  },
}
</script>
