<template>
	<router-view></router-view>
</template>

<style lang="scss">
    @import '@/assets/css/pitwall.scss';
</style>


<script>

import router from './router'

export default {
	router,
	created: function(){
		const currentYear = new Date().getFullYear();

		let loadYear = Object.keys(this.$route.params).length > 0 ? this.$route.params.year : currentYear;

		let seasons_list = function(){
			let yearList = [];
			for(let year = 1950; year <= currentYear; year++){
				yearList.push(year);
			}
			return yearList.reverse();
		}

		// prefill seasons list with all years since 1950
		this.$store.commit('setSeasons', seasons_list());

		// get current season data on first call
		this.$store.dispatch('getData', loadYear);
	}
}
</script>
