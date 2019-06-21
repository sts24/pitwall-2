import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

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
    },
    getData({ commit }, loadYear) {

      const currentYear = new Date().getFullYear();
      
      router.push({ name: 'season', params: { 'year': loadYear } });
      commit('setLoading', true);

      function getRaceData(loadYear) {
        if (loadYear < currentYear) {
          return axios.get('/data-cache/' + loadYear + '-races.json')
            .then(response => { return response.data; });
        } else {
          return axios.get('https://ergast.com/api/f1/' + loadYear + '/results.json?limit=1000')
            .then(response => {
              let races = response.data.MRData.RaceTable.Races;
              return races;
            });
        }
      }

      function getDriversData(loadYear) {
        if (loadYear < currentYear) {
          return axios.get('/data-cache/' + loadYear + '-drivers.json')
            .then(response => { return response.data; });
        } else {
          return axios.get('https://ergast.com/api/f1/' + loadYear + '/driverStandings.json?limit=1000')
            .then(response => {
              let driversData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings : [];
              return driversData;
            });
        }
      }

      function getConstructorsData(loadYear) {
        if (loadYear < currentYear) {
          return axios.get('/data-cache/' + loadYear + '-constructors.json')
            .then(response => { return response.data; });
        } else {
          return axios.get('https://ergast.com/api/f1/' + loadYear + '/constructorStandings.json?limit=1000')
            .then(response => {
              let constructorsData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings : [];
              return constructorsData;
            });
        }
      }

      axios.all([
        getRaceData(loadYear),
        getDriversData(loadYear),
        getConstructorsData(loadYear)
      ])
        .then(axios.spread(function (raceData, driversData, constructorsData) {
          commit('setRaces', raceData);
          commit('setDrivers', driversData);
          commit('setConstructors', constructorsData);
        }))
        .then(function () {
          commit('setSeasonSelect', loadYear);
          commit('setLoading', false);
        });

		}
  },
})
