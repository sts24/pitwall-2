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

			
			<raceresult :key="'races-'+viewOptions.seasonSelect" v-show="viewOptions.selectedTab == 'races'"></raceresult>
		
			<section class="content-block" v-show="viewOptions.selectedTab == 'drivers'">
				<driverstandings :key="'drivers-'+viewOptions.seasonSelect"></driverstandings>
			</section>

			<section class="content-block" v-show="viewOptions.selectedTab == 'constructors'">
				<constructorstandings :key="'constructors-'+viewOptions.seasonSelect"></constructorstandings>
			</section>



			<section class="overlay" v-show="viewOptions.loading == true">
				<div class="loading-spinner is-loading"></div>
			</section>

			<!-- <section class="overlay" v-show="f1data.races.length == 0">
				<p class="message">No data available for this season.</p>
			</section> -->

		</main>

		
		
	</div>
</template>
