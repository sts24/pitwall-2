import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    f1data: {
      races: [],
      seasons: [],
      driverStandings: [],
      constructorStandings: []
    },
    viewOptions: {
      seasonSelect: '',
      selectedTab: 'races',
      loading: true,
      error: false
    }
  },
  mutations: {
    setSeasons(state,payload){ state.f1data.seasons = payload; },
    setRaces(state,payload){ state.f1data.races = payload; },
    setDrivers(state,payload){ state.f1data.driverStandings = payload; },
    setConstructors(state,payload){ state.f1data.constructorStandings = payload; },
    setSeasonSelect(state,payload){ state.viewOptions.seasonSelect = payload; },
    setLoading(state,payload){ state.viewOptions.loading = payload; },
    setTab(state,payload){ state.viewOptions.selectedTab = payload; },
  },
  actions: {
    reverseSort(state) {
      state.state.f1data.races.reverse();
    }
  },
})
