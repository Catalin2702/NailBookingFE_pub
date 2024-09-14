<script lang='ts'>
import {defineComponent} from 'vue'

import {Justify} from '@/utils/constants'
export default defineComponent({
	name: 'LineForm',
	props: {
		lineType: {
			type: Number,
			default: Justify.SpaceBetween,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		getJustifyMethod() {
			switch (this.lineType) {
				case Justify.SpaceBetween:
					return 'space-between'
				case Justify.SpaceAround:
					return 'space-around'
				case Justify.SpaceEvenly:
					return 'space-evenly'
				case Justify.Center:
					return 'center'
				case Justify.Right:
					return 'flex-end'
				case Justify.Left:
					return 'flex-start'
				case Justify.Justify:
					return 'justify'
				default:
					return 'space-between'
			}
		}
	}
})
</script>

<template>
	<div
		class='lineForm'
		:style='{
			justifyContent: getJustifyMethod,
			textAlign: getJustifyMethod,
		}'
	>
		<slot
			v-if='!isLoading'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/forms/structures/Line';
</style>