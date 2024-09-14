<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateSection from '@/components/sections/views/Booking/section/Template.vue'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'MobileSection',
	methods: {
		Dark() {
			return Dark
		}
	},
	extends: TemplateSection,
})
</script>

<template>
	<div class='MobileDay' :style='{ borderColor: colors.secondary}' :id='id'>
		<div
			class='DayCircle'

			:style='{backgroundColor: today ? colors.tertiary : colors.secondary, cursor: role === Role.Admin ? "pointer" : "default"}'

			@click='openBookings'
		>
			<div
				class='DayOfWeek'

				:style='{color: today ? colors.primary : colors.text}'
			>
				{{String(date.dw).slice(0, 3)}}
			</div>
			<div
				class='DayDate'

				:style='{color: today ? colors.primary : colors.text}'
			>
				{{date.d}}
			</div>
		</div>
		<div class='BookingContainer'>
			<div
				class='Booking'

				v-for='booking in date.r'

				:key='booking'
				:style='{
					backgroundColor: setBackground(booking),
					color: setColor(),
				}'
				@click='openBooking(booking)'
			>
				{{booking.start.split(':').slice(0, 2).join(':')}}<br>{{booking.end.split(':').slice(0, 2).join(':')}}
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Booking/Mobile';
</style>