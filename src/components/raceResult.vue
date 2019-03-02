<script>
import { mapState } from 'vuex'

export default {

	name: 'raceresult',
	props: ['item'],
	computed: mapState([
		'f1data',
		'viewOptions'
	]),
	data: function () {
		return {
			showAll: false	
		}
	},
	created: function(){
		this.viewOptions.loading = false;
	},
	methods: {
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
		}
	}

};



</script>


<template>

	<section class="race-table">

		<header>
			<h2>{{ item.raceName }}</h2>
			<h3>{{ item.Circuit.circuitName }}</h3>
			<small>Round {{ item.round }} • {{ item.Circuit.Location.locality }}, {{ item.Circuit.Location.country }} • {{ formatDate(item.date) }}</small>
		</header>

		<div class="chart-wrap">
			<table class="chart" v-bind:class="{ 'show-all': showAll }">
				<thead>
					<tr>
						<th class="th-pos">Pos</th>
						<th><span class="hide">Position Change</span></th>
						<th>Driver</th>
						<th>Grid</th>
						<th>Car #</th>
						<th>Constructor</th>
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
						<td>{{ car.Driver.givenName }} {{ car.Driver.familyName }}</td>
						<td>{{ car.grid }}</td>
						<td>{{ car.number }}</td>
						<td>{{ car.Constructor.name }}</td>
						<td>{{ car.FastestLap ? car.FastestLap.Time.time : '' }}</td>
						<td>{{ car.laps }}</td>
						<td>{{ car.Time ? car.Time.time : '' }}</td>
						<td>{{ car.points }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<footer v-show="showAll !== true">
			<button class="show-all-btn" v-on:click="showAll = true">Show Entire Results</button>
		</footer>

	</section>
	
	

</template>
