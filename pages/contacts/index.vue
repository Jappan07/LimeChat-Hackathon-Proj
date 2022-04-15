<template>
  <v-app>
      <v-row justify="center" wrap>
      <v-col cols="12" md="4" lg="4">
        <tags-list />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="8" lg="8">
        <p class="headline mb-3 mt-3">Contacts/Users</p>
        <v-divider>
        </v-divider>
        <contacts-table />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import ContactsTable from '../../components/contacts/ContactsTable.vue'
import TagsList from '../../components/contacts/TagsList.vue'
export default {
  components: { ContactsTable, TagsList },
  name: 'ContactsPage',
}
</script>
