<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'MessagePopup',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		message: {
			type: String,
			default: '',
		},
		status: {
			type: Boolean,
			default: false,
		},
	},
})
</script>

<template>
	<div
		class='messageContainer'

		:style='
			{
				backgroundColor: status ? colors.tertiary : colors.secondary,
				color: status ? colors.primary : colors.text,
			}'
	>
		{{message}}
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/popup/Message';
</style>