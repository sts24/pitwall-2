<script>

import constructorstandings from '@/components/constructorsStandings.vue';
import driverstandings from '@/components/driversStandings.vue';
import raceresult from '@/components/raceResult.vue';
import pageHeader from '@/components/pageHeader.vue';
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'home',
	components: {
		constructorstandings,
		driverstandings,
		raceresult,
		pageHeader
	},
	computed: {
		...mapState([ 'f1data', 'viewOptions' ]),
		selectSeason: {
			get(){
				return this.$store.state.viewOptions.seasonSelect;
			},
			set(newSeason){
				this.$store.dispatch('getData', newSeason);
			}
		}
	},
	methods: mapMutations([
		'setTab'
	])
		
}

</script>




<template>
	<div id="page">
		<pageHeader></pageHeader>

		<main class="grid-area">

			<nav class="type-select">
				<label for="season-select">Select a Season</label>
				<div class="season-select-wrapper">
					<select id="season-select" v-model="selectSeason" class="season-select">
						<option v-for="season in f1data.seasons" v-bind="season.index" :value="season" :key="season">{{ season }}</option>
					</select>
				</div>
				
				<ul class="site-nav">
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'races'}" v-on:click="setTab('races')">Race Results</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'drivers'}" v-on:click="setTab('drivers')">Driver's Championship</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'constructors'}" v-on:click="setTab('constructors')">Constructor's Championship</button></li>
				</ul>
			</nav>
			
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
