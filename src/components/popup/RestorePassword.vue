<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'
import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iEventData} from '@/utils/interfaces'

const Desktop = defineAsyncComponent(() => import('@/components/popup/RestorePassword/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/RestorePassword/Mobile.vue'))
export default defineComponent({
	name: 'RestorePassword',
	extends: GeneralTemplate,
	components: { Desktop, Mobile },
	methods: {
		sendAction(data: iEventData) {
			this.$emit('action', data)
		},
	},
	emits: ['action'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'
		
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		
		@close='closePopup'
		@action='sendAction($event)'
		@error='sendError($event)'
	/>
	<Mobile
		v-else
		
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		
		@close='closePopup'
		@action='sendAction($event)'
		@error='sendError($event)'
	/>
</template>