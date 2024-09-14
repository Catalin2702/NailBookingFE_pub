<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iBookingContent, iObject} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'

const Desktop = defineAsyncComponent(() => import('@/components/popup/BookingDetailed/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/BookingDetailed/Mobile.vue'))
export default defineComponent({
	name: 'BookingDetailedPopup',
	extends: GeneralTemplate,
	components: {
		Desktop,
		Mobile
	},
	props: {
		booking: {
			type: Object as () => iBookingContent,
			default: defaultBookingContent,
		},
	},
	methods: {
		sendBooking(bookingAttributes: iObject) {
			this.$emit('sendBooking', bookingAttributes)
		},
		editBooking(bookingAttributes: iObject) {
			this.$emit('editBooking', bookingAttributes)
		},
		cancelBooking(booking: iBookingContent) {
			this.$emit('cancelBooking', booking)
		},
		deleteBooking(booking: iBookingContent) {
			this.$emit('deleteBooking', booking)
		},
		acceptBooking(booking: iBookingContent) {
			this.$emit('acceptBooking', booking)
		},
		confirmBooking(booking: iBookingContent) {
			this.$emit('confirmBooking', booking)
		},
	},
	emits: ['error', 'sendBooking', 'cancelBooking','deleteBooking', 'acceptBooking', 'confirmBooking', 'editBooking'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'
		:colors='colors'
		:title='title'
        :role='role'
		:defaultBooking='booking'

		@close='close'
		@error='sendError($event)'
		@sendBooking='sendBooking($event)'
		@editBooking='editBooking($event)'
		@cancelBooking='cancelBooking($event)'
		@deleteBooking='deleteBooking($event)'
		@acceptBooking='acceptBooking($event)'
		@confirmBooking='confirmBooking($event)'
	/>
	<Mobile
		v-else
		:colors='colors'
		:title='title'
        :role='role'
		:defaultBooking='booking'

		@close='close'
		@error='sendError($event)'
		@sendBooking='sendBooking($event)'
		@editBooking='editBooking($event)'
		@cancelBooking='cancelBooking($event)'
		@deleteBooking='deleteBooking($event)'
		@acceptBooking='acceptBooking($event)'
		@confirmBooking='confirmBooking($event)'
	/>
</template>