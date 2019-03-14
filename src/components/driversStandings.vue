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
			},
			flagImgPath: function(nation){
				return process.env.BASE_URL+'/nation-flags/'+nation.replace(' ','')+'.svg';
			}
		}
	}

</script>





<template>


	<section class="standings-table" v-if="f1data.driverStandings.length > 0">

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
						<td>
							<a :href="i.Driver.url" target="_blank">{{ i.Driver.givenName }} {{ i.Driver.familyName }}</a> 
							<img :src="flagImgPath(i.Driver.nationality)" :alt="i.Driver.nationality" class="nation-flag" />
						</td>
						<td>{{ constructorsList(i.Constructors) }}</td>
						<td>{{ i.points }}</td>
						<td>{{ i.wins }}</td>
					</tr>
				</tbody>
			</table>
		</div>

	</section>

	<section class="overlay" v-else>
		<p class="message">No driver's standings data availible for this season.</p>
	</section>


</template>
