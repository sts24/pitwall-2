<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		name: 'pageheader',
		computed: mapState([
			'f1data',
			'viewOptions'
		]),
		methods: mapMutations([
			'setTab'
		])
		
	}

</script>





<template>

	<header class="header">
		<div class="header-contents">
			<img srcset="@/assets/images/pitwall-stacked-white.svg" class="site-title" />
			
			<nav class="data-selection">
				
				<label for="season-select">Select a Season</label>
				<div class="season-select-wrapper">
					<select id="season-select" v-model="viewOptions.seasonSelect" class="season-select">
						<option v-for="season in f1data.seasons" v-bind="season.index" :value="season.season" :key="season.season">{{ season.season }}</option>
					</select>
				</div>
				
				<ul class="site-nav">
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'races'}" v-on:click="setTab('races')">Race Results</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'drivers'}" v-on:click="setTab('drivers')">Driver's Championship</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'constructors'}" v-on:click="setTab('constructors')">Constructor's Championship</button></li>
				</ul>

			</nav>
		</div>
	</header>
		<!-- <section class="header-desc">
		
		<p class="intro">Explore historical records of past Formula 1 championships.</p>
		<p>Pitwall uses the <a href="https://ergast.com/mrd/">Ergast API</a> for the historical data and this app was written by <a href="https://www.smithscott.net">Scott Smith</a>. Learn more about how this app was built on <a href="https://github.com/sts24/pitwall-2/">GitHub</a>.</p>
		
		</section> -->

</template>