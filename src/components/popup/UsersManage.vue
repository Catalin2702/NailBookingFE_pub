<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iObject, iUserData} from '@/utils/interfaces'
import {defaultUsersData} from '@/utils/default'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'

const Desktop = defineAsyncComponent(() => import('@/components/popup/UsersManage/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/popup/UsersManage/Mobile.vue'))

export default defineComponent({
	name: 'UsersManage',
	extends: GeneralTemplate,
	components: {Desktop, Mobile},
	props: {
		users: {
			type: Array as () => iUserData[],
			default: () => [defaultUsersData],
		},
		params: {
			type: Object as () => iObject,
			default: () => ({}),
		}
	},
	methods: {
		editUser(id: number) {
			this.$emit('edit', id)
		},
		search(data: iObject) {
			this.$emit('search', data)
		},
		getDetails(id: number) {
			this.$emit('getDetails', id)
		},
	},
	emits: ['edit', 'search', 'getDetails'],
})
</script>

<template>
	<Desktop
		v-if='device === Device.Desktop'
		
		:users='users'
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='isLoading'
		:params='params'
		
		@edit='editUser'
		@search='search'
		@getDetails='getDetails'
		@error='sendError'
		@close='close'
	/>
	<Mobile
		v-else
		
		:users='users'
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='isLoading'
		:params='params'
		
		@edit='editUser'
		@search='search'
		@getDetails='getDetails'
		@error='sendError'
		@close='close'
	/>
</template>
