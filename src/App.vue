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
					sortOrder: 'normal'
				}
			}
		},
		created: function(){
			this.getData('seasons.json','seasons');
		},

		methods: {
			getData: function(api_endpoint,dataCat){
				let $this = this;

				axios.get('https://ergast.com/api/f1/'+ api_endpoint +'?limit=1000')
				.then(function(response){
					var ajax_data = response.data;

					if(dataCat == 'races'){
							$this.f1data.races = ajax_data.MRData.RaceTable.Races;
						}

						if(dataCat == 'seasons'){
							let all_seasons = ajax_data.MRData.SeasonTable.Seasons;

							$this.f1data.seasons = all_seasons;
							$this.viewOptions.seasonSelect = all_seasons[all_seasons.length-1].season;
						}


						if(dataCat == 'drivers'){
							$this.f1data.driverStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
						}

						if(dataCat == 'constructors'){
							$this.f1data.constructorStandings = ajax_data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
						}
				});
			}

		},

		watch: {
			'viewOptions.seasonSelect': function(newYear){
				this.getData(newYear+'/results.json','races');
				this.getData(newYear+'/driverStandings.json','drivers');
				this.getData(newYear+'/constructorStandings.json','constructors');
			}
		}
	}
</script>
