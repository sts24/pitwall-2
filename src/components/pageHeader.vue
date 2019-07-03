<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		name: 'pageheader',
		computed: {
			...mapState([ 'f1data', 'viewOptions' ]),
			selectSeason: {
				get(){
					return this.$store.state.viewOptions.seasonSelect;
				},
				set(newSeason){
					this.$store.dispatch('getData', newSeason);
				}
			}
			
		},
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
					<select id="season-select" v-model="selectSeason" class="season-select">
						<option v-for="season in f1data.seasons" v-bind="season.index" :value="season" :key="season">{{ season }}</option>
					</select>
				</div>
				
				<ul class="site-nav">
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'races'}" v-on:click="setTab('races')">Race Results</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'drivers'}" v-on:click="setTab('drivers')">Driver's Championship</button></li>
					<li><button class="site-nav-button" :class="{'selected': viewOptions.selectedTab === 'constructors'}" v-on:click="setTab('constructors')">Constructor's Championship</button></li>
				</ul>
			</nav>

			<div class="info">
				<p>Pitwall was created by <a href="https://www.smithscott.net" target="_blank">Scott Smith</a>. Learn more about this project <a href="https://github.com/sts24/pitwall-vue" target="_blank">on the GitHub page.</a></p>
			</div>
		</div>
	</header>


</template>