<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iEventData} from "@/utils/interfaces"

const RegisterDesktop = defineAsyncComponent(() => import('@/components/popup/Register/Desktop.vue'))
const RegisterMobile = defineAsyncComponent(() => import('@/components/popup/Register/Mobile.vue'))
export default defineComponent({
	name: 'RegisterPopup',
	extends: GeneralTemplate,
	components: { RegisterDesktop, RegisterMobile },
	methods: {
		toggle() {
			this.$emit('toggle')
		},
		action(data: iEventData) {
			this.$emit('action', data)
		},
	},
	emits: ['toggle', 'action'],
})
</script>

<template>
	<RegisterDesktop
		v-if='device === Device.Desktop'

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@toggle='toggle'
		@action='action($event)'
		@error='sendError($event)'
	/>
	<RegisterMobile
		v-else

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@toggle='toggle'
		@action='action($event)'
		@error='sendError($event)'
	/>
</template>
