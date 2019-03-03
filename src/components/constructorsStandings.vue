<script>
	import { mapState } from 'vuex'

	export default {
		name: 'constructorsstandings',
		props: ['item'],
		computed: mapState([
			'f1data',
			'viewOptions'
		])
	}

</script>





<template>

	<section v-if="f1data.constructorStandings.length > 0" class="standings-table">

		<header>
			<h2>Constructor's Championship</h2>
		</header>

		<div class="chart-wrap">
			<table class="chart show-all">
				<thead>
					<tr>
						<th>Pos</th>
						<th>Constructor</th>
						<th>Points</th>
						<th>Wins</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in f1data.constructorStandings" :key="i.index">
						<td>{{ i.positionText }}</td>
						<td>{{ i.Constructor.name }}</td>
						<td>{{ i.points }}</td>
						<td>{{ i.wins }}</td>
					</tr>
				</tbody>
			</table>
		</div>

	</section>

	<section class="overlay" v-else>
		<p class="message">No constructor's standings data availible for this season.</p>
	</section>

</template>
