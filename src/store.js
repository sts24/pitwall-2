import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		data : {
			races: '',
			seasons: '',
			seasonSelect: '',
			driverStandings: '',
			constructorStandings: '',
			selectedTab: 'races',
			sortOrder: {
				direction: 'normal',
			}
		}
	},
	mutations: {
		setSeasons(state, seasons) {
			state.data.seasons = seasons;
		},
		seasonSelect(state, seasonSelect){
			state.data.seasonSelect = seasonSelect;
		}
	},
	actions: {
		getData ({ commit }, params) {
			//console.log(context, params);
			
			axios.get('https://ergast.com/api/f1/'+ params.api_endpoint +'?limit=1000')
			.then(function(response){
				var ajax_data = response.data;

				
				if(params.dataCat == 'races'){
					//this.$store.state.races = ajax_data.MRData.RaceTable.Races;
				}
				
				if(params.dataCat == 'seasons'){
					console.log('seasons');
					let all_seasons = ajax_data.MRData.SeasonTable.Seasons;

					commit('setSeasons', all_seasons);
					commit('seasonSelect', all_seasons[all_seasons.length-1].season);
				}
		
				
				if(params.dataCat == 'drivers'){
					this.$store.state.driverStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				}
				
				if(params.dataCat == 'constructors'){
					this.$store.state.constructorStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
				}

		});
		
	}
	}
});


export default store
