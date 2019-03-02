<script>
	import { mapState } from 'vuex'

	export default {
		name: 'driversstandings',
		computed: mapState([
			'f1data',
			'viewOptions'
		]),
		methods: {
			constructorsList: function(items){
				let c_list = [];
				for (let i = 0; i < items.length; i++) {
					c_list[i] = items[i].name;
				}
				return c_list.join(', ');
			}
		}
	}

</script>





<template>


	<section class="standings-table">

		<header>
			<h2>Driver's Championship</h2>
		</header>

		<div class="chart-wrap">
			<table class="chart show-all">
				<thead>
					<tr>
						<th>Pos</th>
						<th>Driver</th>
						<th>Constructor</th>
						<th>Points</th>
						<th>Wins</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in f1data.driverStandings" :key="i.index">
						<td>{{ i.positionText }}</td>
						<td>{{ i.Driver.givenName }} {{ i.Driver.familyName }}</td>
						<td>{{ constructorsList(i.Constructors) }}</td>
						<td>{{ i.points }}</td>
						<td>{{ i.wins }}</td>
					</tr>
				</tbody>
			</table>
		</div>


	</section>


</template>
