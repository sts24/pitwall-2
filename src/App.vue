<template>
	<router-view></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'
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

			this.$store.dispatch('getData', 2019);
	},
	
	computed: {
		...mapState(['f1data','viewOptions']),
		seasonsInit(){
			return this.viewOptions.seasonSelect
		}
	},

	methods: {
		//...mapActions(),
	},

	watch: {
		'seasonsInit': function(data){
			router.push({ name: 'season', params: { 'year': data } });
			//this.$store.commit('setLoading', true);
			
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
