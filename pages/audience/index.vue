<template>
  <v-app>
      <v-row justify="center" wrap>
      <v-col cols="12" md="4" lg="4">
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="8" lg="8">
        <p class="headline mb-3 mt-3">Audiences</p>
        <v-divider>
        </v-divider>
        <audience-table />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import AudienceTable from '../../components/audiences/AudienceTable.vue'
export default {
  components: { AudienceTable },
  name: 'AudiencePage',
}
</script>
