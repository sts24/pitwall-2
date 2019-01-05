<script>

	export default {
		name: 'pageheader',
		props: ['f1data','viewOptions']
	}

</script>





<template>

	<header class="header">

		<h1 class="hide">The Pit Wall</h1>

		<img srcset="/images/pitwall-title@2x.png 2x, /images/pitwall-title.png 1x" class="site-title" />

		<nav class="data-selection">
			<label for="season-select">Select a Season</label>
			<div class="season-select-wrapper">
				<select id="season-select" v-model="viewOptions.seasonSelect" class="season-select">
					<option v-for="season in f1data.seasons" v-bind="season.index" :value="season.season">{{ season.season }}</option>
				</select>
			</div>
		</nav>

	</header>

</template>