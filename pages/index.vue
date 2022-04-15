<template>
  <v-app>
    <v-spacer></v-spacer>
    <v-row justify="center" wrap>
      <v-col cols="12" md="4" lg="4">
        <upcoming-events />
      </v-col>
      <v-col cols="12" md="7" lg="7">
        <p class="headline mb-3 mt-3">Schedule Event</p>
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
