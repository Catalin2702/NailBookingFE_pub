<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iEventData} from "@/utils/interfaces"

const LoginDesktop = defineAsyncComponent(() => import('@/components/popup/Login/Desktop.vue'))
const LoginMobile = defineAsyncComponent(() => import('@/components/popup/Login/Mobile.vue'))
export default defineComponent({
	name: 'LoginPopup',
	extends: GeneralTemplate,
	components: { LoginDesktop, LoginMobile },
	methods: {
		actionEmit(data: iEventData) {
			this.$emit('action', data)
		},
		toggle() {
			this.$emit('toggle')
		},
	},
	emits: ['toggle', 'action'],
})
</script>

<template>
	<LoginDesktop
		v-if='device === Device.Desktop'

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@toggle='toggle'
		@action='actionEmit($event)'
		@error='sendError($event)'
	/>
	<LoginMobile
		v-else

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@toggle='toggle'
		@action='actionEmit($event)'
		@error='sendError($event)'
	/>
</template>
