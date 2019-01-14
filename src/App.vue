<template>
	<router-view :f1data="f1data" :viewOptions="viewOptions"></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'
import axios from 'axios'

	export default {
		router,
		data: function () {
			return {
				f1data: {
					races: '',
					seasons: '',
					driverStandings: '',
					constructorStandings: ''
				},
				viewOptions: {
					seasonSelect: '',
					selectedTab: 'races',
					loading: false
				}
			}
		},
		created: function(){
			let $this = this;
			axios.get('https://ergast.com/api/f1/seasons.json?limit=1000')
				.then(function(response){
					let all_seasons = response.data.MRData.SeasonTable.Seasons.reverse();
					$this.f1data.seasons = all_seasons;	
				});
		},

		methods: {
			getData: function(loadYear){
				console.log('loading');
				

				let $this = this;
				
				this.viewOptions.loading = true;

				const apiEndpoints = [
					'results',
					'driverStandings',
					'constructorStandings'
				];

				apiEndpoints.forEach((apiData) => {

					axios.get('https://ergast.com/api/f1/'+ loadYear + '/' + apiData +'.json?limit=1000')
						.then(function(response){
							let ajax_data = response.data;

							if(apiData == 'results'){
								$this.f1data.races = ajax_data.MRData.RaceTable.Races;
							}

							if(apiData == 'driverStandings'){
								$this.f1data.driverStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
							}
							
							if(apiData == 'constructorStandings'){
								$this.f1data.constructorStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
							}

						})
						.then(function(){
							$this.viewOptions.loading = false;
							console.log('done');
							
						});
				});
				
				
			}

		},

		watch: {
			'f1data.seasons': function(){
				// set default year on load. Season list will only be set on first load
				let newYear = (Object.keys(this.$route.params).length > 0) ? this.$route.params.year : this.f1data.seasons[0].season;
				this.viewOptions.seasonSelect = newYear;
			},
			'viewOptions.seasonSelect': function(newYear,oldYear){
				
				// only chnage URL if it was selected by menu or URL param. Home will default to blank URL
				if(this.$route.name == 'home' && oldYear == ''){
					router.replace({ name: 'home', params: { 'year': '' } });
				} else {
					router.push({ name: 'season', params: { 'year': newYear } });
				}

				// ajax call to API
				this.getData(newYear);
			},
			'$route': function(newData,oldData){
				// set new season year on router change
				this.viewOptions.seasonSelect = this.$route.params.year;				
			}
		}
	}
</script>
