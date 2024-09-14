<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'

export default defineComponent({
	name: 'TextButton',
	props: {
		width: {
			type: String,
			default: 'auto'
		},
		height: {
			type: String,
			default: 'auto'
		},
		colors: {
			type: Object as () => iColors,
			default: Dark
		},
		label: {
			type: String,
			default: 'Button'
		},
	},
	data: () => (
		{
			hover: false
		}
	),
	methods: {
		click() {
			this.$emit('action')
		}
	},
	emits: ['action'],
})
</script>

<template>
	<div
		class='TextButton'

		@click='click'
		@mouseover='hover = true'
		@mouseleave='hover = false'

		:style='{
			width: width,
			height: height,
			color: hover ? colors.tertiary : colors.text,
		}'
	>
		{{label}}
	</div>
</template>
<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Text';
</style>