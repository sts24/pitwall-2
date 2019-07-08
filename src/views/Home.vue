<script>

import constructorstandings from '@/components/constructorsStandings.vue';
import driverstandings from '@/components/driversStandings.vue';
import raceresult from '@/components/raceResult.vue';
import pageHeader from '@/components/pageHeader.vue';
import { mapState } from 'vuex'

export default {
	name: 'home',
	components: {
		constructorstandings,
		driverstandings,
		raceresult,
		pageHeader
	},
	computed: mapState([
		'f1data',
		'viewOptions'
	])
}

</script>




<template>
	<div id="page">
		<pageHeader></pageHeader>

		<main class="content-area">

			<header class="content-header content-block">
				<h1>{{ viewOptions.seasonSelect }} Season</h1>
			</header>
			
			<raceresult :key="'races-'+viewOptions.seasonSelect" v-if="viewOptions.selectedTab == 'races'"></raceresult>
		
			<section class="content-block" v-if="viewOptions.selectedTab == 'drivers'">
				<driverstandings :key="'drivers-'+viewOptions.seasonSelect"></driverstandings>
			</section>

			<section class="content-block" v-if="viewOptions.selectedTab == 'constructors'">
				<constructorstandings :key="'constructors-'+viewOptions.seasonSelect"></constructorstandings>
			</section>

			<section class="overlay" v-if="viewOptions.loading == true">
				<div class="loading-spinner"></div>
			</section>

		</main>

	</div>
</template>
