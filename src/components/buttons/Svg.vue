<script lang='ts'>
import {defineComponent} from 'vue'
import {mapState} from 'vuex'

import {Theme, themeLabel} from '@/utils/constants'
export default defineComponent({
	name: 'SvgButton',
	props: {
		icon: {
			type: String,
		},
		size: {
			type: String
		},
		effect: {
			type: Boolean,
			default: true
		},
		flipX: {
			type: Boolean,
			default: false
		},
		flipY: {
			type: Boolean,
			default: false
		},
		hovered: {
			type: Boolean,
			default: false
		},
		rotate: {
			type: Number,
			default: 0
		},
	},
	data() {
		return {
			hover: false
		}
	},
	computed: {
		...mapState(['theme']),
		ThemeLabel: () => themeLabel,
		Theme: () => Theme,
	},
	methods: {
		emitAction() {
			this.$emit('action')
		},
		toggleHover(state: boolean) {
			if(this.effect)
				this.hover = state
		},
	},
	watch: {
		hovered() {
			this.hover = this.hovered
		}
	},
	mounted() {
		this.hover = this.hovered
	},
	emits: ['action'],
})
</script>

<template>
	<div
		class='SvgContainer'

		@click='emitAction'
		@mouseover='toggleHover(true)'
		@mouseleave='toggleHover(false)'
	>
		<img
			alt=''

			:src='require("@/assets/media/icons/" + icon + ".svg")'
			:style='{
				width: size,
				height: size,
				padding: 0,
				margin: 0,
				cursor: "pointer",
				transform: `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
				rotate: `${rotate}deg`,
			}'
			:class='$options.name + (hover ? "Hover" : ThemeLabel[theme])'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Svg';
</style>