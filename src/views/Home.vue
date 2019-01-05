<script>

import constructorstandings from '@/components/constructorsStandings.vue';
import driverstandings from '@/components/driversStandings.vue';
import raceresult from '@/components/raceResult.vue';
import pageHeader from '@/components/pageHeader.vue';

export default {
	name: 'home',
	props: ['f1data','viewOptions'],
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
		<li><div class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'races' }]" v-on:click="viewOptions.selectedTab = 'races'">Races</div></li>
		<li><div class="switcher" :class="['tab-button', { 'selected-tab': viewOptions.selectedTab === 'standings' }]" v-on:click="viewOptions.selectedTab = 'standings'">Standings</div></li>
	</ul>

	<main class="content-area">

		<div class="races" v-show="viewOptions.selectedTab == 'races'">

			<raceresult :item="race" :viewOptions="viewOptions" v-for="race in f1data.races" :key="race.index" ></raceresult>

		</div>

		<div class="standings" v-show="viewOptions.selectedTab == 'standings'">

			<driverstandings :item="f1data.driverStandings"></driverstandings>
			<constructorstandings :item="f1data.constructorStandings"></constructorstandings>

		</div>

	</main>
</div>
</template>
