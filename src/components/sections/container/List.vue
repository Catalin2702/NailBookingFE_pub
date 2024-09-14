<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'ListSection',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	},
	computed: {
		alpha: () => .3,
	}
})
</script>

<template>
	<div
		class='Container'

		:style='{
			border: `.5px solid ${colors.text.toRGBA(alpha)}`,
		}'
	>
		<slot />
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/container/List';
</style>