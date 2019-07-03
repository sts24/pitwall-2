<script>
import { mapState, mapActions } from 'vuex'
import raceTable from '@/components/raceTable.vue';
import formatDate from '@/components/formatDate.vue';

export default {

	name: 'raceresult',
	props: ['item'],
	components: {
		raceTable,
		formatDate
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
			this.round = roundID;

			if(window.innerWidth < 1400){
				document.querySelector('.race-table').scrollIntoView({ behavior: 'smooth' });
			}
		},

		selectedRound(roundID){
			let selected = (roundID == this.round) ? 'selected-round' : '';
			return selected;
		}

	}

};

</script>


<template>
	
	

	<section class="race-grid" v-if="f1data.races.length > 0">
		<nav class="race-select-col">
			<ul>
				<li v-for="(item, index) in f1data.races" :key="item.date" :class="selectedRound(index)">
					<button class="race-select-button" @click="raceSelect(index)"><strong>{{ item.raceName }}</strong><br /><formatDate :date="item.date" /></button>
				</li>
			</ul>
		</nav>
		<raceTable :item="f1data.races[round]" />	
	</section>
	

</template>
