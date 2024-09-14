<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateSection from '@/components/sections/views/Booking/section/Template.vue'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'DesktopSection',
	extends: TemplateSection,
	props: {
		angle: {
			type: String,
			default: '0 0 0 0',
		},
		index: {
			type: Number,
		},
	},
	data() {
		return{
			underline: false,
		}
	},
	methods: {
		Dark() {
			return Dark
		},
		underlineToday() {
			if(this.today) {
				this.underline = true
				window.setTimeout(() => {
					this.underline = false
				}, 2000)
			}
		},
	},
})
</script>

<template>
	<div
		class='DesktopDay'

        :style='
            {
				borderRadius: angle,
				backgroundColor: colors.primary,
				color: colors.text
			}'
	>
		<div
			class='dayString'

			v-if='index < 7'
			v-html='date.dw'
		/>
		<div
			class='dayNumberSpace'
		>
			<div
				class='dayNumber'

				:class='underline ? "wave" : ""'
				:style='
					{
						backgroundColor: today ? colors.tertiary : colors.secondary,
						color: today ? colors.primary : colors.text,
						border: "1px solid "+colors.secondary,
						cursor: role === Role.Admin ? "pointer" : "default"
					}'

				@click='openBookings'
			>
				{{date.d}}
			</div>
		</div>
		<div class='BookingContainer'>
			<div
				class='BookingLine'

				v-for='booking_line in splitBooking'
				:key='booking_line'
			>
				<div
					class='Booking'

					v-for='booking in booking_line'
					:key='booking'
					:style='
						{
							backgroundColor: setBackground(booking),
							color: setColor(),
						}'
					@click='openBooking(booking)'
				>
					{{booking.start.split(':').slice(0, 2).join(':')}} - {{booking.end.split(':').slice(0, 2).join(':')}}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Booking/Desktop';
</style>