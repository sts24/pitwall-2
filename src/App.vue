<template>
	<router-view></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'
import axios from 'axios'
import { state,mapState } from 'vuex'
import { close, closeSync } from 'fs';

	export default {
		router,
		created: function(){
				let store = this.$store;

				axios.get(process.env.VUE_APP_API_SOURCE+'/api/seasons', {
				})
				.then(function(response){
					let all_seasons = response.data.MRData.SeasonTable.Seasons.reverse();
					store.commit('setSeasons', all_seasons);
				})
				.catch(function(error){
					console.log(error);
					//router.push({ name: 'error' });
				});

				// watch for change on season list loading
				this.$store.watch(
				(state)=>{
					return this.$store.state.f1data.seasons
				},
				(newValue, oldValue)=>{
					let newYear = (Object.keys(this.$route.params).length > 0) ? this.$route.params.year : this.$store.state.f1data.seasons[0].season;
					this.$store.commit('setSeasonSelect', newYear);
				});
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

					axios.get(process.env.VUE_APP_API_SOURCE+'/api/'+ apiData + '/' + loadYear)
						.then(function(response){
							let ajax_data = response.data;

							if(apiData == 'results'){
								store.commit('setRaces', ajax_data.MRData.RaceTable.Races );
							}

							if(apiData == 'driverStandings'){
								store.commit('setDrivers', ajax_data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
							}
							
							if(apiData == 'constructorStandings'){
								store.commit('setConstructors', ajax_data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
							}

						})
						.catch(function(error){
							console.log(error);
							//router.push({ name: 'error' });
						});
				});
				
				
			}

		},
		
		computed: {
			...mapState(['f1data','viewOptions']),
			seasonsInit(data){
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
			'$route': function(newData,oldData){
				if(newData.name !== 'error'){
					// set new season year on router change
					this.$store.commit('setSeasonSelect', this.$route.params.year);
				}
			}
		}
	}
</script>
