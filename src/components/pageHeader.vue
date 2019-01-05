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
		
		<section class="header-desc">
		
		<p class="intro">Explore historical records of past Formula 1 championships.</p>
		<p>Pitwall uses the <a href="https://ergast.com/mrd/">Ergast API</a> for the historical data and this app was written by <a href="https://www.smithscott.net">Scott Smith</a>. Learn more about how this app was built on <a href="#">GitHub</a>.</p>
		
		</section>

		<nav class="data-selection">
			<label for="season-select">Select a Season</label>
			<div class="season-select-wrapper">
				<select id="season-select" v-model="viewOptions.seasonSelect" class="season-select">
					<option v-for="season in f1data.seasons" v-bind="season.index" :value="season.season">{{ season.season }}</option>
				</select>
			</div>
			
			<div v-show="viewOptions.loading">Loading</div>
		</nav>

	</header>

</template>