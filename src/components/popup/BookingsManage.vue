<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iBookingContent, iObject} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'

const Desktop = defineAsyncComponent(() => import('@/components/popup/BookingsManage/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/BookingsManage/Mobile.vue'))

export default defineComponent({
	name: 'BookingsManage',
	extends: GeneralTemplate,
	components: {Desktop, Mobile},
	props: {
		bookings: {
			type: Array as () => iBookingContent[],
			default: () => [defaultBookingContent],
		},
		params: {
			type: Object as () => iObject,
			default: () => ({}),
		}
	},
	methods: {
		cancelBooking(data: iBookingContent) {
			this.$emit('cancelBooking', data)
		},
		search(event: iObject){
			this.$emit('search', event)
		},
		edit(event: iObject){
			this.$emit('edit', event)
		},
	},
	emits: ['search', 'cancelBooking', 'edit'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'

		:bookings='bookings'
		:colors='colors'
		:closeButton='closeButton'
		:isLoading='isLoading'
		:title='title'
		:params='params'

		@close='close'
		@search='search($event)'
		@error='sendError'
		@edit='edit($event)'
		@cancelBooking='cancelBooking($event)'
	/>
	<Mobile
		v-else
		:bookings='bookings'
		:colors='colors'
		:closeButton='closeButton'
		:isLoading='isLoading'
		:title='title'
		:params='params'

		@close='close'
		@search='search($event)'
		@error='sendError'
		@edit='edit($event)'
		@cancelBooking='cancelBooking($event)'
	/>
</template>