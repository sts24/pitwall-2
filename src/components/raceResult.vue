<script>
import { mapState, mapActions } from 'vuex'
import raceTable from '@/components/raceTable.vue';

export default {

	name: 'raceresult',
	props: ['item'],
	components: {
		raceTable
	},
	computed: mapState([
		'f1data',
		'viewOptions'
	]),
	data: function () {
		return {
			showAllResults: false,
			sortNewestFirst: false
		}
	},
	updated: function(){
		this.viewOptions.loading = false;
	},
	methods: {
		...mapActions([ 'reverseSort' ]),
		
		sortRaces: function(){
			if(this.sortNewestFirst === true){
				this.sortNewestFirst = false;
			} else {
				this.sortNewestFirst = true;
			}
			this.reverseSort();
		}

	}

};



</script>


<template>

	<section class="content-block" v-if="f1data.races.length > 0">
		<header class="races-header">
			<h2>Race Results</h2>

			<button class="button" v-on:click="sortRaces" v-show="sortNewestFirst == true">Sort By Oldest First</button>
			<button class="button" v-on:click="sortRaces" v-show="sortNewestFirst == false">Sort By Newest First</button>

		</header>

		<raceTable v-for="item in f1data.races" :item="item" :key="item.date" />	

	</section>
	
	<section class="overlay" v-else>
		<p class="message">No race data availible for this season.</p>
	</section>

</template>
