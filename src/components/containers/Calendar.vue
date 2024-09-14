<!--suppress GrazieInspection -->
<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iCalendar} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultCalendarOptions} from '@/utils/default'
import {Device, Role} from '@/utils/constants'
import {roundBorder} from '@/utils/functions'

import {Skeletor} from 'vue-skeletor'
const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const DesktopSection = defineAsyncComponent(() => import('@/components/sections/views/Booking/section/Desktop.vue'))
const MobileSection = defineAsyncComponent(() => import('@/components/sections/views/Booking/section/Mobile.vue'))
export default defineComponent({
	name: 'CalendarContainer',
	components: {
		Skeletor,
		SvgButton,
		MobileSection,
		DesktopSection,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		calendar: {
			type: Array as () => iCalendar[],
			default: defaultCalendarOptions
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
		role: {
			type: Number,
			default: Role.Guest,
		},
		month: {
			type: Number,
			default: 0,
		},
		year: {
			type: Number,
			default: 0,
		},
		min: {
			type: Boolean,
			default: false,
		},
		max: {
			type: Boolean,
			default: false,
		}
	},
	data() {
		return {
			buttons: {
				left: {
					icon: 'arrow_r',
					hover: false,
				},
				right: {
					icon: 'arrow_r',
					hover: false,
				},
			}
		}
	},
	computed: {
		Device: () => Device,
		Today: () => {
			const today = new Date()
			return {
				day: today.getDate(),
				month: today.getMonth()+1,
				year: today.getFullYear(),
			}
		},
	},
	methods: {
		roundBorder(index: number) : string {
			return roundBorder(index, this.calendar.length)
		},
		underlineToday() {
			(this.$refs.desktopSection as InstanceType<typeof DesktopSection>[]).forEach((element) => {
				element.underlineToday()
			})
		},
		backMonth(back: boolean) {
			this.$emit('backMonth', back)
		}
	},
	emits: ['openBooking', 'createBooking', 'backMonth', 'openBookings'],
})
</script>

<template>
	<div
		class='DesktopCalendar'
		v-if='device === Device.Desktop'
	>
		<div
			class='ButtonContainer left'

			v-show='!min'

			:style='{
				backgroundColor: colors.tertiary,
				opacity: buttons.left.hover ? 1 : 0.5,
				transform: buttons.left.hover ? "scale(1.1)" : "scale(1)",
			}'

			@mouseover='buttons.left.hover = true'
			@mouseleave='buttons.left.hover = false'
			@click='backMonth(true)'
		>
			<SvgButton
				flip-x

				:effect='false'
				:icon='buttons.left.icon'
			/>
		</div>
		<div
			class='CalendarContainer'

			v-if='calendar.length > 1'

			:style='{
				backgroundImage: `linear-gradient(to bottom right, ${colors.tertiary}, ${colors.secondary})`
			}'
		>
			<DesktopSection
				v-for='(date, index) in calendar'
				ref='desktopSection'

				:key='index'
				:index='index'
				:colors='colors'
				:angle='roundBorder(index)'
				:date='date'
				:today='Today.day === date.d && Today.month === date.m && Today.year === date.y'
				:role='role'
				:currentMonth='date.m === month && date.y === year'

				@openBooking='$emit("openBooking", $event)'
				@openBookings='$emit("openBookings", $event)'
				@createBooking='$emit("createBooking", $event)'
			/>
		</div>
		<Skeletor
			width='calc(95% - 4px)'
			height='calc(95% - 4px)'
			v-else
		/>
		<div
			class='ButtonContainer right'

			v-show='!max'

			:style='{
				backgroundColor: colors.tertiary,
				opacity: buttons.right.hover ? 1 : 0.5,
				transform: buttons.right.hover ? "scale(1.1)" : "scale(1)",
			}'

			@mouseover='buttons.right.hover = true'
			@mouseleave='buttons.right.hover = false'
			@click='backMonth(false)'
		>
			<SvgButton
				:effect='false'
				:icon='buttons.left.icon'
			/>
		</div>
	</div>
	<div
		class='CalendarContainer'

		v-else
	>
		<MobileSection
			v-for='(date, index) in calendar'

			:key='index'
			:index='index'
			:colors='colors'
			:date='date'
			:today='Today.day === date.d && Today.month === date.m && Today.year === date.y'
			:role='role'
			:currentMonth='date.m === month && date.y === year'

			@openBooking='$emit("openBooking", $event)'
			@openBookings='$emit("openBookings", $event)'
			@createBooking='$emit("createBooking", $event)'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/containers/Calendar';
.vue-skeletor {
	border-radius: 10px;
}
</style>