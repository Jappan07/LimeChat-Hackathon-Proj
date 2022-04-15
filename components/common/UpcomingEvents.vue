<template>
  <v-card class="mx-auto" flat outlined rounded="0">
    <v-card dark flat>
      <!-- <v-btn absolute bottom color="pink" right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        height="200px"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container class="fill-height">
          <v-row align="center" style="flex-direction: column">
            <p class="text-h3 font-weight-light">Upcoming</p>
            <p class="text-uppercase font-weight-light">Broadcast Events</p>
          </v-row>
        </v-container>
      </v-img>
    </v-card>
    <v-card-text class="py-0" v-if="broadcastEvents.length > 0 && !isLoading" style="overflow-y: scroll; max-height: 520px">
      <v-timeline align-top dense >
        <v-timeline-item
          :color="item.color"
          class="px-3"
          small
          v-for="item in broadcastEvents"
          :key="item.id"
        >
          <v-row class="pt-1">
            <v-col cols="10">
              <strong>{{ item.name }}</strong>
              <p class="body">
                {{
                  item.content.length > 50
                    ? item.content.slice(0, 50) + '...'
                    : item.content
                }}
              </p>
              <div class="text-caption">
                <v-icon small class="mr-4">mdi-clock</v-icon
                >{{ new Date(Date.parse(item.schedule_time)).toUTCString() }}
              </div>
            </v-col>
            <v-col cols="2">
              <v-avatar size="32">
                <v-img :src="avatarItems[parseInt(item.id % 3)]"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
    <v-card-text v-if="isLoading">
      <v-row justify="center">
        <v-progress-circular
          :width="3"
          color="red"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UpcomingEvents',
  data() {
    return {
      avatarItems: [
        'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown',
        'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned',
        'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale',
      ],
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      broadcastEvents: 'getBroadcastEvents',
    }),
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
