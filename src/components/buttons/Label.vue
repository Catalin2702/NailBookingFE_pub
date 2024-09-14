<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'LabelButton',
	props: {
		width: {
			type: String,
			default: '100px'
		},
		height: {
			type: String,
			default: '4vh'
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		label: {
			type: String,
			default: 'Button'
		},
		secondary: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return{
			clicked: false,
			hover: false,
		}
	},
	computed: {
		alpha: () => .5,
	},
	methods: {
		click() {
			this.clicked = true
			this.$emit('action')
			window.setTimeout(() => {
				this.clicked = false
			}, 150
			)
		},
	},
	emits: ['action', 'confirm', 'close'],
})
</script>

<template>
	<div
		class='LabelButton'

		@click='click'
		@mouseover='hover = true'
		@mouseleave='hover = false'

		:style='{
				width: width,
				height: height,
				color: (secondary ? colors.text : colors.primary),
				border: `.5px solid ${colors.secondary.toRGBA(alpha)}`,
				backgroundColor: (secondary ? colors.secondary : colors.tertiary),
				transform: `scale(${hover ? 1.05 : 1})`,
			}'
		:class='clicked ? "ButtonClicked" : "ButtonIdle"'
	>
		{{label}}
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Label';
@import '@/assets/styles/components/buttons/Button';
</style>