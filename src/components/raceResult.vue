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
			sortNewestFirst: false,
			round: 0
		}
	},
	updated: function(){
		this.viewOptions.loading = false;
	},
	methods: {
		...mapActions([ 'reverseSort' ]),
		
		raceSelect(roundID){
			console.log(roundID);
			this.round = roundID;
		}

	}

};

</script>


<template>
	
	

	<section class="race-grid" v-if="f1data.races.length > 0">
		<nav class="race-select-col">
			<ul>
				<li v-for="(item, index) in f1data.races">
					<button class="race-select-button" @click="raceSelect(index)"><strong>{{ item.raceName }}</strong><br />{{ item.date }}</button>
				</li>
			</ul>
		</nav>
		<raceTable :item="f1data.races[round]" />	
	</section>
	

</template>
