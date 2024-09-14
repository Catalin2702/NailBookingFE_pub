<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iEventData} from '@/utils/interfaces'

const ForgotPasswordDesktop = defineAsyncComponent(() => import('@/components/popup/ForgotPassword/Desktop.vue'))
const ForgotPasswordMobile = defineAsyncComponent(() => import('@/components/popup/ForgotPassword/Mobile.vue'))
export default defineComponent({
	name: 'ForgotPassword',
	extends: GeneralTemplate,
	components: { ForgotPasswordDesktop, ForgotPasswordMobile },
	methods: {
		actionEmit(data: iEventData) {
			this.$emit('action', data)
		},
	},
	emits: ['action']
})
</script>

<template>
	<ForgotPasswordDesktop
		v-if='device === Device.Desktop'

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@action='actionEmit($event)'
		@error='sendError($event)'
	/>
	<ForgotPasswordMobile
		v-else

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@action='actionEmit($event)'
		@error='sendError($event)'
	/>
</template>