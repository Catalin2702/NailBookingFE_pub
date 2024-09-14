<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'CloseButton',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		size: {
			type: String,
			default: '25px'
		},
		top: {
			type: String,
			default: ''
		},
		right: {
			type: String,
			default: ''
		},
		bottom: {
			type: String,
			default: ''
		},
		left: {
			type: String,
			default: ''
		},
	},
	data() {
		return{
			hover: false,
			clicked: false,
		}
	},
	computed: {
		alpha: () => .5,
	},
	methods: {
		click() {
			this.$emit('close')
			this.clicked = true
			window.setTimeout(() => {
				this.clicked = false
			}, 150
			)
		},
	},
	emits: ['close'],
})
</script>

<template>
	<div
		class='Container'

		:style='{top: top, right: right, bottom: bottom, left: left}'
	>
		<div
			class='CloseButton'

			:class='clicked ? "ButtonClicked" : "ButtonIdle" '
			:style='{
				backgroundColor: hover ? colors.tertiary : colors.secondary,
				width: size,
				height: size,
				border: `.5px solid ${colors.secondary.toRGBA(alpha)}`,
			}'

			@mouseover='hover = true'
			@mouseleave='hover = false'
			@click='click'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Close';
@import '@/assets/styles/components/buttons/Button';
</style>