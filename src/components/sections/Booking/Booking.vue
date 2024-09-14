<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {Device} from '@/utils/constants'
import {iBookingContent} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'

const DesktopBookingSection = defineAsyncComponent(() => import('@/components/sections/Booking/section/Desktop.vue'))
const MobileBookingSection = defineAsyncComponent(() => import('@/components/sections/Booking/section/Mobile.vue'))
export default defineComponent({
	name: 'GeneralBookingSection',
	components: {
		DesktopBookingSection,
		MobileBookingSection
	},
	props: {
		device: {
			type: Number,
			default: Device.Desktop
		},
		booking: {
			type: Object as () => iBookingContent,
			default: defaultBookingContent
		}
	},
	computed: {
		Device: () => Device
	},
	emits: ['edit', 'cancelBooking'],
})
</script>

<template>
	<DesktopBookingSection
		v-if='device === Device.Desktop'
		:booking='booking'

		@edit='$emit("edit", $event)'
		@cancelBooking='$emit("cancelBooking", $event)'
	/>
	<MobileBookingSection
		v-else
		:booking='booking'

		@edit='$emit("edit", $event)'
		@cancelBooking='$emit("cancelBooking", $event)'
	/>
</template>