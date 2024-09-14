<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iDate, iBookingContent} from '@/utils/interfaces'
import {defaultDate, defaultBookingContent} from '@/utils/default'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'

const DesktopBookingRecap = defineAsyncComponent(() => import('@/components/popup/Bookings/Desktop.vue'))
const MobileBookingRecap = defineAsyncComponent(() => import('@/components/popup/Bookings/Mobile.vue'))
export default defineComponent({
	name: 'BookingRecap',
	extends: GeneralTemplate,
	components: {DesktopBookingRecap, MobileBookingRecap},
	props: {
		bookings: {
			type: Array as () => iBookingContent[],
			default: () => [defaultBookingContent],
		},
		date: {
			type: Object as () => iDate,
			default: defaultDate,
		}
	},
	methods: {
		sendEdit(booking: iBookingContent) {
			this.$emit('edit', booking)
		},
		sendCancelBooking(booking: iBookingContent) {
			this.$emit('cancelBooking', booking)
		},
		sendActive(active: boolean) {
			this.$emit('active', active)
		},
		sendNewBooking(date: Date) {
			this.$emit('newBooking', date)
		},
	},
	emits: ['edit', 'cancelBooking', 'active', 'newBooking'],
})
</script>

<template>
	<Transition
		name='popup'

		v-if='device === Device.Desktop'
	>
		<DesktopBookingRecap

			:colors='colors'
			:closeButton='closeButton'
			:bookings='bookings'
			:date='date'
			:role='role'
			:device='device'
			:isLoading='isLoading'
			:title='title'

			@close='close'
			@error='sendError($event)'
			@edit='sendEdit($event)'
			@cancelBooking='sendCancelBooking($event)'
			@active='sendActive($event)'
			@newBooking='sendNewBooking($event)'
		/>
	</Transition>
	<Transition
		name='popup'

		v-else
	>
		<MobileBookingRecap

			:colors='colors'
			:closeButton='closeButton'
			:bookings='bookings'
			:date='date'
			:role='role'
			:device='device'
			:isLoading='isLoading'
			:title='title'

			@close='close'
			@error='sendError($event)'
			@edit='sendEdit($event)'
			@cancelBooking='sendCancelBooking($event)'
			@active='sendActive($event)'
			@newBooking='sendNewBooking($event)'
		/>
	</Transition>
</template>