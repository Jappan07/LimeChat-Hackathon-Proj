<template>
  <v-app dark>
    <v-navigation-drawer mini-variant fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed elevation="0" app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>limeChat @{{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Plan Now',
          to: '/',
          icon: 'mdi-home',
        },
        {
          title: 'Analytics',
          to: '/analytics',
          icon: 'mdi-chart-areaspline',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lime Planner',
    }
  },
}
</script>
