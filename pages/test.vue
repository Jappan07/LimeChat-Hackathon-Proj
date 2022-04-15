<template>
  <v-app>
      <suggested-time :broadcastSize="200000" :date="'2022-04-20'" />
  </v-app>
</template>

<script>
import SuggestedTime from '../components/common/SuggestedTime.vue'
export default {
  components: { SuggestedTime },

}
</script>

<style>

</style>