import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    getData: function(loadYear){				
console.log(loadYear);
			const apiEndpoints = [
				'results',
				'driverStandings',
				'constructorStandings'
			];

			apiEndpoints.forEach((apiData) => {

				axios.get('https://ergast.com/api/f1/' + loadYear + '/' + apiData + '.json?limit=1000')
					.then(function(response){
						let ajax_data = response.data.MRData;
						
						if(apiData == 'results'){
							this.commit('setRaces', ajax_data.RaceTable.Races );
						}

						if(apiData == 'driverStandings'){
							let driversData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].DriverStandings : [];
							this.commit('setDrivers', driversData);
						}
						
						if(apiData == 'constructorStandings'){
							let constructorsData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].ConstructorStandings : [];
							this.commit('setConstructors', constructorsData);
						}

					})
					.catch(function(){
						//router.push({ name: 'error' });
					});
			});
			
			
		}
  },
})
