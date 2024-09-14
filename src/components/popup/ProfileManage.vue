<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iProfile} from '@/utils/interfaces'
import {defaultProfile} from '@/utils/default'
import {AccountActions} from '@/utils/constants'

import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'

const MobileManage = defineAsyncComponent(() => import('@/components/popup/Manage/Mobile.vue'))
const DesktopManage = defineAsyncComponent(() => import('@/components/popup/Manage/Desktop.vue'))
export default defineComponent({
	name: 'GeneralManage',
	extends: GeneralTemplate,
	components: {DesktopManage, MobileManage},
	props: {
		defaultData: {
			type: Object as () => iProfile,
			default: defaultProfile,
		},
	},
	data() {
		return{
			title: 'Gestisci profilo',
		}
	},
	mounted() {
		this.$emit('action',
			{
				action: AccountActions.UserData,
				params: {},
			}
		)
	},
	emits: ['action','error']
})
</script>

<template>
	<DesktopManage
		v-if='device === Device.Desktop'
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:defaultData='defaultData'

		@action='$emit("action", $event)'
		@close='close'
		@error='$emit("error", $event)'
	/>
	<MobileManage
		v-else
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:defaultData='defaultData'

		@action='$emit("action", $event)'
		@close='close'
		@error='$emit("error", $event)'
	/>
</template>