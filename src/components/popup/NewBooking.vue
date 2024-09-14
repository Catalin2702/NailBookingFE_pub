<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iObject} from "@/utils/interfaces"

const Desktop = defineAsyncComponent(() => import('@/components/popup/NewBooking/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/NewBooking/Mobile.vue'))
export default defineComponent({
	name: 'GeneralNewBookingPopup',
	extends: GeneralTemplate,
	components: {
		Desktop,
		Mobile
	},
	props: {
		params: {
			type: Object as () => iObject,
			default: () => ({}),
		},
	},
	methods: {
		createBooking(date: iObject) {
			this.$emit('createBooking', date)
		},
		requestBooking(date: iObject) {
			this.$emit('requestBooking', date)
		}
	},
	emits: ['createBooking', 'requestBooking'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'

		:colors='colors'
		:params='params'
		:title='title'
		:closeButton='closeButton'

		@close='close'
		@error='sendError'
		@createBooking='createBooking'
		@requestBooking='requestBooking'
	/>
	<Mobile
		v-else

		:colors='colors'
		:params='params'
		:title='title'
		:closeButton='closeButton'

		@close='close'
		@error='sendError'
		@createBooking='createBooking'
		@requestBooking='requestBooking'
	/>
</template>