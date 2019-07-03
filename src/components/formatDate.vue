<script>

export default {
	name: 'formatDate',
	props: ['date'],
	methods: {
		formatDate(raceDate) {
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let raceUTC = new Date(raceDate);

			return months[raceUTC.getMonth()] + ' ' + raceUTC.getDate() + ', ' + raceUTC.getFullYear();
		}
	}
}

</script>

<template>
	<time>{{ this.formatDate(this.date) }}</time>
</template>