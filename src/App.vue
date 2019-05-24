<template>
	<router-view></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	router,
	created: function(){

			let seasons_list = function(){
				let currentYear = new Date().getFullYear();
				let yearList = [];
				for(let year = 1950; year <= currentYear; year++){
					yearList.push(year);
				}
				return yearList.reverse();
			}

			this.$store.commit('setSeasons', seasons_list());

			let newYear = (Object.keys(this.$route.params).length > 0) ? this.$route.params.year : this.$store.state.f1data.seasons[0];
				this.$store.commit('setSeasonSelect', newYear);

	},
	methods: {
		getData: function(loadYear){				

			let store = this.$store;

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
							store.commit('setRaces', ajax_data.RaceTable.Races );
						}

						if(apiData == 'driverStandings'){
							let driversData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].DriverStandings : [];
							store.commit('setDrivers', driversData);
						}
						
						if(apiData == 'constructorStandings'){
							let constructorsData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].ConstructorStandings : [];
							store.commit('setConstructors', constructorsData);
						}

					})
					.catch(function(){
						router.push({ name: 'error' });
					});
			});
			
			
		}

	},
	
	computed: {
		...mapState(['f1data','viewOptions']),
		seasonsInit(){
			return this.viewOptions.seasonSelect
		}
	},

	watch: {
		'seasonsInit': function(data){
			router.push({ name: 'season', params: { 'year': data } });
			this.$store.commit('setLoading', true);
			this.getData(data);
		},
		'f1data.races': function(newData){
			if(newData.length == 0){
				this.$store.commit('setLoading', false);
			}
		},
		'$route': function(newData){
			if(newData.name !== 'error'){
				this.$store.commit('setSeasonSelect', this.$route.params.year);
			}
		}
	}
}
</script>
