<template>
  <v-app>
      <v-row justify="center" wrap>
      <v-col cols="12" md="4" lg="4">
        <upcoming-events />
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <calendar />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import UpcomingEvents from '../components/common/UpcomingEvents.vue'
export default {
  components: { UpcomingEvents },
  name: 'IndexPage',
}
</script>
