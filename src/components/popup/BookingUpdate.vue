<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

const Desktop = defineAsyncComponent(() => import('@/components/popup/BookingUpdate/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/BookingUpdate/Mobile.vue'))

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iBookingContent} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'
export default defineComponent({
	name: 'BookingUpdate',
	extends: GeneralTemplate,
	components: {Desktop, Mobile},
	props: {
		booking: {
			type: Object as () => iBookingContent,
			default: defaultBookingContent,
		},
		isViewOnly: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		editBooking(data: iBookingContent) {
			this.$emit('editBooking', data)
		},
	},
	emits: ['editBooking'],

})
</script>

<template>
	<Transition
		name='popup'

		v-if='device === Device.Desktop'
	>
		<Desktop
			:booking='booking'
			:role='role'
			:isViewOnly='isViewOnly'
			:colors='colors'
			:title='title'
			:isLoading='isLoading'

			@close='close'
			@error='sendError'
			@editBooking='editBooking'
		/>
	</Transition>
	<Transition
		name='popup'

		v-else
	>
		<Mobile
			:booking='booking'
			:role='role'
			:isViewOnly='isViewOnly'
			:colors='colors'
			:title='title'
			:isLoading='isLoading'

			@close='close'
			@error='sendError'
			@editBooking='editBooking'
		/>
	</Transition>
</template>