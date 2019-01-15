<script>

import constructorstandings from '@/components/constructorsStandings.vue';
import driverstandings from '@/components/driversStandings.vue';
import raceresult from '@/components/raceResult.vue';
import pageHeader from '@/components/pageHeader.vue';

export default {
	name: 'home',
	props: ['f1data','viewOptions','year'],
	components: {
		constructorstandings,
		driverstandings,
		raceresult,
		pageHeader
	}
}

</script>




<template>
	<div id="page">
		<pageHeader :f1data="f1data" :viewOptions="viewOptions"></pageHeader>
	
		<ul class="data-switcher">
			<li><button class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'races' }]" v-on:click="viewOptions.selectedTab = 'races'">Races</button></li>
			<li><button class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'standings' }]" v-on:click="viewOptions.selectedTab = 'standings'">Standings</button></li>
		</ul>
	
		<main class="content-area" v-show="viewOptions.loading == false && f1data.races.length > 0" >
	
			<div class="races" v-show="viewOptions.selectedTab == 'races'">
	
				<raceresult :item="race" :viewOptions="viewOptions" v-for="race in f1data.races" :key="race.date"></raceresult>
	
			</div>
	
			<div class="standings" v-show="viewOptions.selectedTab == 'standings'">
	
				<driverstandings :item="f1data.driverStandings"></driverstandings>
				<constructorstandings :item="f1data.constructorStandings"></constructorstandings>
	
			</div>
	
		</main>
	
		
		<main class="content-area" v-show="f1data.races.length == 0">
			<p class="message">No data available for this season.</p>
		</main>
		
	</div>
</template>
