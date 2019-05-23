<script>
import { mapState, mapActions } from 'vuex'

export default {

	name: 'raceresult',
	props: ['item'],
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
		gridDiff: function(car){

			let gridDiff = (car.grid - car.position);

			return gridDiff;

		},
		gridFinishDiff: function(gridStart,finishPos){
			let gridDiff = (gridStart - finishPos);

			if(gridDiff > 0){
				return '⬆︎' + gridDiff;
			} else if(gridDiff < 0){
				return '⬇︎' + Math.abs(gridDiff);
			} else {
				//return gridStart;
			}

		},
		formatDate: function(raceDate){
			let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
			let raceUTC = new Date(raceDate);

			return months[raceUTC.getMonth()] + ' ' + raceUTC.getDate() + ', ' + raceUTC.getFullYear();
		},
		flagImgPath: function(nation){
			return process.env.BASE_URL+'/nation-flags/'+nation.replace(' ','')+'.svg';
		},
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

		<section class="race-table" v-for="item in f1data.races" :key="item.date">

			<header>
				<h2>{{ item.raceName }}</h2>
				<h3><a :href="item.Circuit.url" target="_blank">{{ item.Circuit.circuitName }}</a></h3>
				<small>Round {{ item.round }} • {{ item.Circuit.Location.locality }}, {{ item.Circuit.Location.country }} • {{ formatDate(item.date) }} • <a :href="item.url" target="_blank">Read on Wikipedia</a></small>
			</header>

			<div class="chart-wrap">
				<table class="chart" v-bind:class="{ 'show-all': showAllResults }">
					<thead>
						<tr>
							<th class="th-pos">Pos</th>
							<th><span class="hide">Position Change</span></th>
							<th>Driver</th>
							<th>Grid</th>
							<th>No.</th>
							<th>Car</th>
							<th>Fastest Lap</th>
							<th>Laps</th>
							<th>Time</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="car in item.Results" :key="car.index">
							<td>{{ car.positionText }}</td>
							<td v-if="gridDiff(car) > 0"><span class="grid-change grid-up">{{ gridDiff(car) }}</span></td>
							<td v-if="gridDiff(car) < 0"><span class="grid-change grid-down">{{ Math.abs(gridDiff(car)) }}</span></td>
							<td v-if="gridDiff(car) == 0"></td>
							<td>
								<a :href="car.Driver.url" target="_blank">{{ car.Driver.givenName }} {{ car.Driver.familyName }}</a> 
								<img :src="flagImgPath(car.Driver.nationality)" :alt="car.Driver.nationality" class="nation-flag" /></td>
							<td>{{ car.grid }}</td>
							<td>{{ car.number }}</td>
							<td>
								<a :href="car.Constructor.url" target="_blank">{{ car.Constructor.name }}</a>
								<img :src="flagImgPath(car.Constructor.nationality)" :alt="car.Constructor.nationality" class="nation-flag" />
							</td>
							<td>{{ car.FastestLap ? car.FastestLap.Time.time : '' }}</td>
							<td>{{ car.laps }}</td>
							<td>{{ car.Time ? car.Time.time : '' }}</td>
							<td>{{ car.points }}</td>
						</tr>
					</tbody>
					<tfoot v-show="showAllResults !== true">
						<tr>
							<td colspan="10">
								<button class="show-all-btn" v-on:click="showAllResults = true">Show Entire Results</button>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>

		</section>
	

	</section>
	
	<section class="overlay" v-else>
		<p class="message">No race data availible for this season.</p>
	</section>

</template>
