<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iEventData} from "@/utils/interfaces"

const LoginPopup = defineAsyncComponent(() => import('@/components/popup/Login.vue'))
const RegisterPopup = defineAsyncComponent(() => import('@/components/popup/Register.vue'))
export default defineComponent({
	name: 'AccessPopup',
	extends: GeneralTemplate,
	components: { LoginPopup, RegisterPopup },
	data() {
		return {
			login: true,
			internalTitle: String(this.title).split('|')[0]
		}
	},
	methods: {
		toggle() {
			this.login = !this.login
			this.internalTitle = this.login ? String(this.title).split('|')[0] : String(this.title).split('|')[1]
		},
		actionEmit(data: iEventData) {
			this.$emit('action', data)
		}
	},
	emits: ['action', 'toggle']
})
</script>

<template>
	<Transition
		name='popup'
		v-if='login'
	>
		<LoginPopup
			:colors='colors'
			:title='internalTitle'
			:closeButton='closeButton'

			@close='closePopup'
			@toggle='toggle'
			@action='actionEmit($event)'
			@error='sendError($event)'
		/>
	</Transition>
	<Transition
		name='popup'
		v-else
	>
		<RegisterPopup
			:colors='colors'
			:title='internalTitle'
			:closeButton='closeButton'

			@close='closePopup'
			@toggle='toggle'
			@action='actionEmit($event)'
			@error='sendError($event)'
		/>
	</Transition>
</template>