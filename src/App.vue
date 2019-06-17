<template>
	<router-view></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'
import { mapState, mapActions } from 'vuex'

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

		// prefill seasons list with all years since 1950
		this.$store.commit('setSeasons', seasons_list());

		// get current season data on first call
		this.$store.dispatch('getData', '2019');
	},

	watch: {
		'$route': function(newData){
			if(newData.name !== 'error'){
				this.$store.commit('setSeasonSelect', this.$route.params.year);
			}
		}
	}
}
</script>
