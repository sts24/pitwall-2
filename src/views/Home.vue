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
	
		<ul class="data-switcher">
			<li><button class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'races' }]" v-on:click="viewOptions.selectedTab = 'races'">Races</button></li>
			<li><button class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'standings' }]" v-on:click="viewOptions.selectedTab = 'standings'">Standings</button></li>
		</ul>
	
		<main class="content-area" v-show="viewOptions.loading == false && f1data.races.length > 0" >
			<div class="races" v-show="viewOptions.selectedTab == 'races'">
				<raceresult :item="race" v-for="race in f1data.races" :key="race.date"></raceresult>
			</div>

			<div class="standings" v-show="viewOptions.selectedTab == 'standings'">
				<driverstandings></driverstandings>
				<constructorstandings></constructorstandings>
			</div>
	
		</main>

		<main class="content-area" v-show="f1data.races.length == 0">
			<p class="message">No data available for this season.</p>
		</main>
		
	</div>
</template>
