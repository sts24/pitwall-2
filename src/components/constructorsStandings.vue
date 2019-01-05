<script>

	export default {
		name: 'constructorsstandings',
		props: ['item']
	}

</script>





<template>

	<section class="standings-table">

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
					<tr v-for="i in item" :key="i.index">
						<td>{{ i.positionText }}</td>
						<td>{{ i.Constructor.name }}</td>
						<td>{{ i.points }}</td>
						<td>{{ i.wins }}</td>
					</tr>
				</tbody>
			</table>
		</div>

	</section>

</template>
