<template>
  <v-app>
    <v-row justify="left">
      <v-col cols="3" md="2" lg="1">
        <v-btn nuxt to="/broadcast-event/create/" left>Create Broadcast Event</v-btn>
      </v-col>
    </v-row>
    <calendar />
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
