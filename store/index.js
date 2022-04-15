// IMports
import axios from 'axios'

// Modules

// States
const state = {
  broadcastEvents: [],
  templates: [],
  goals: [],
  cohorts: [],
  analytics: {},
  currentBrdEvent: {},
  contacts: [],
  contactTags: [],
}

// Getters
const getters = {
  getBroadcastEvents: (state) => state.broadcastEvents,
  getTemplates: (state) => state.templates,
  getGoals: (state) => state.goals,
  getUserCohorts: (state) => state.cohorts,
  getAnalytics: (state) => state.analytics,
  getCurrentBrdEvent: (state) => state.currentBrdEvent,
  getContacts: (state) => state.contacts,
  getContactTags: (state) => state.contactTags,
}

// Actions
const actions = {
  addNewBroadcast({ commit }, broadcastEvent) {
    console.log('--- Adding new broadcast Event to the scheduler ---')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/broadcast-event/create/`,
        method: 'POST',
        data: broadcastEvent,
      })
        .then(() => {
          axios({
            url: `${process.env.baseUrl}/core/broadcast-event/?size=20`,
            method: 'GET',
          })
            .then((response) => {
              if (response.data.count > 0) {
                commit('FETCH_BROADCAST_EVENTS', response.data.results)
                resolve(response.data.results)
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  fetchBroadcastEvents({ commit }) {
    console.log('--- fetching broadcast events - 20 at the moment--- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/broadcast-event/?size=20`,
        method: 'GET',
      })
        .then((response) => {
          response.data.results.map((result) => {
            let raw_date_obj = new Date(result.schedule_time)
            result['details'] = result.content
            result['start'] = `${raw_date_obj.getFullYear()}-${
              raw_date_obj.getMonth() < 10
                ? '0' + raw_date_obj.getMonth()
                : raw_date_obj.getMonth()
            }-${raw_date_obj.getDate()}`
          })
          commit('FETCH_BROADCAST_EVENTS', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateBroadcastEvent({ commit }, completeData) {
    console.log('UPDATING BROADCAST EVENT --- ', completeData['data'])
    let eventId = completeData['id']
    let data = completeData['data']
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/broadcast-event/update/${eventId}/`,
        method: 'PATCH',
        data: data,
      })
        .then(() => {
          axios({
            url: `${process.env.baseUrl}/core/broadcast-event/?size=20`,
            method: 'GET',
          })
            .then((response) => {
              commit('FETCH_BROADCAST_EVENTS', response.data.results)
              resolve(response.data.results)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => reject(err))
    })
  },
  deleteFolder({ commit }, eventId) {
    console.log('DELETING BROADCAST EVENT --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/broadcast-event/update/${eventId}/`,
        method: 'DELETE',
      })
        .then(() => {
          axios({
            url: `${process.env.baseUrl}/core/broadcast-event/?size=20`,
            method: 'GET',
          })
            .then((response) => {
              commit('FETCH_BROADCAST_EVENTS', response.data.results)
              resolve(response.data.results)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => reject(err))
    })
  },
  fetchTemplates({ commit }) {
    console.log('--- FETCHING TEMPLATES --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/template/?size=10`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_TEMPLATES', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => reject(err))
    })
  },
  fetchGoals({ commit }) {
    console.log('--- FETCHING GOALS (10 at a time) --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/goal/?size=10`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_GOALS', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => reject(err))
    })
  },
  fetchUserCohorts({ commit }) {
    console.log('--- FETCHING USER COHORTS (10 at a time) --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/user-cohort/?size=10`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_USER_COHORTS', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => reject(err))
    })
  },
  fetchContacts({ commit }, tag=null) {
    console.log('--- FETCHING CONTACTS (10 at a time) --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/contact/?size=10&tag=${tag ? tag : ''}`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_CONTACTS', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => reject(err))
    })
  },
  fetchContactTags({ commit }) {
    console.log('--- FETCHING CONTACT TAGS (10 at a time) --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/contact-tag/?size=10`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_CONTACT_TAGS', response.data.results)
          resolve(response.data.results)
        })
        .catch((err) => reject(err))
    })
  },
  fetchAnalytics({ commit }) {
    console.log('--- FETCHING ANALYTICS --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/analytics/`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_ANALYTICS', response.data)
          resolve(response.data)
        })
        .catch((err) => reject(err))
    })
  },
  fetchSingleBroadcastEvent({ commit }, eventId) {
    console.log('FETCHING SINGLE BROADCAST EVENT --- ')
    new Promise((resolve, reject) => {
      axios({
        url: `${process.env.baseUrl}/core/broadcast-event/update/${eventId}/`,
        method: 'GET',
      })
        .then((response) => {
          commit('FETCH_SINGLE_BROADCAST_EVENT', response.data)
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

// Mutations
const mutations = {
  FETCH_BROADCAST_EVENTS(state, broadcastEvents) {
    state.broadcastEvents = broadcastEvents
  },
  FETCH_TEMPLATES(state, templates) {
    console.log(templates)
    state.templates = templates
  },
  FETCH_GOALS(state, goals) {
    state.goals = goals
  },
  FETCH_USER_COHORTS(state, cohorts) {
    state.cohorts = cohorts
  },
  FETCH_ANALYTICS(state, analytics) {
    state.analytics = analytics
  },
  FETCH_SINGLE_BROADCAST_EVENT(state, brdEvent) {
    state.currentBrdEvent = brdEvent
  },
  FETCH_CONTACTS(state, contacts) {
    state.contacts = contacts
  },
  FETCH_CONTACT_TAGS(state, contactTags) {
    state.contactTags = contactTags
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
