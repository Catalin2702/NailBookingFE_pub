<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {iObject, iUserUpdateData} from "@/utils/interfaces";
import {defaultUserUpdateData} from "@/utils/default";

const Desktop = defineAsyncComponent(() => import('@/components/popup/UserUpdate/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/UserUpdate/Mobile.vue'))

export default defineComponent({
	name: 'UserUpdate',
	extends: GeneralTemplate,
	components: {Desktop, Mobile},
	props: {
		user: {
			type: Object as () => iUserUpdateData,
			default: defaultUserUpdateData,
		}
	},
	methods: {
		editUser(userAttributes: iObject) {
			this.$emit('editUser', userAttributes)
		}
	},
	emits: ['editUser'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'

		:user='user'
		:isLoading='isLoading'
		:colors='colors'
		:title='title'

		@error='sendError'
		@close='close'
		@edit='editUser'
	/>
	<Mobile
		v-else

		:user='user'
		:isLoading='isLoading'
		:colors='colors'
		:title='title'

		@error='sendError'
		@close='close'
		@edit='editUser'
	/>
</template>

<style scoped lang='scss'>

</style>