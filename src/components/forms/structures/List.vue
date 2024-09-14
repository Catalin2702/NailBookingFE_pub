<script lang='ts'>
import {defineComponent} from 'vue'

import {Align} from '@/utils/constants'
export default defineComponent({
	name: 'ListForm',
	props: {
		lineType: {
			type: Number,
			default: Align.Top,
		},
		maxHeight: {
			type: String,
			default: 'auto',
		},
	},
	methods: {
		getAlignMethod() {
			switch (this.lineType) {
				case Align.Top:
					return 'flex-start'
				case Align.Bottom:
					return 'flex-end'
				case Align.Center:
					return 'center'
				case Align.SpaceBetween:
					return 'space-between'
				case Align.SpaceAround:
					return 'space-around'
				case Align.SpaceEvenly:
					return 'space-evenly'
				default:
					return 'flex-start'
			}
		}
	}
})
</script>

<template>
	<div
		class='listForm'
		:style='{
			justifyContent: getAlignMethod(),
			maxHeight: maxHeight,
		}'
	>
		<slot/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/forms/structures/List';
</style>