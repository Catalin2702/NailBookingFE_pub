<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Align, Justify, CardType} from '@/utils/constants'
export default defineComponent({
	name: 'StructureCard',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		alpha: {
			type: Number,
			default: .3,
		},
		background: {
			type: String,
			default: '',
		},
		width: {
			type: String,
			default: '100%',
		},
		height: {
			type: String,
			default: '100%',
		},
		justify: {
			type: Number,
			default: Justify.Center,
		},
		align: {
			type: Number,
			default: Align.Center,
		},
		cardType: {
			type: Number,
			default: CardType.Icon,
		},
		label: {
			type: String,
			default: '',
		},
	},
	data() {
		return{
			justifyMethod: 'center',
			alignMethod: 'center',
			hovered: false,
		}
	},
	computed: {
		CardType: () => CardType,
	},
	methods: {
		setJustify() {
			switch (this.justify) {
				case Justify.SpaceBetween:
					this.justifyMethod = 'space-between'
					break
				case Justify.SpaceAround:
					this.justifyMethod = 'space-around'
					break
				case Justify.SpaceEvenly:
					this.justifyMethod = 'space-evenly'
					break
				case Justify.Center:
					this.justifyMethod = 'center'
					break
				case Justify.Right:
					this.justifyMethod = 'flex-end'
					break
				case Justify.Left:
					this.justifyMethod = 'flex-start'
					break
				default:
					this.justifyMethod = 'center'
					break
			}
		},
		setAlign() {
			switch (this.align) {
				case Align.Center:
					this.alignMethod = 'center'
					break
				case Align.Top:
					this.alignMethod = 'flex-end'
					break
				case Align.Bottom:
					this.alignMethod = 'flex-start'
					break
				default:
					this.alignMethod = 'center'
					break
			}
		},
	},
	watch: {
		justify() {
			this.setJustify()
		},
		align() {
			this.setAlign()
		},
	},
	mounted() {
		this.setJustify()
		this.setAlign()
	},
})
</script>

<template>
	<div
		v-if='cardType === CardType.Icon'
		class='Card'
		:style='{
			border: `.5px solid ${colors.text.toRGBA(alpha)}`,
			backgroundColor: background !== "" ? background :  colors.secondary,
			width: width,
			height: height,
			justifyContent: justifyMethod,
			alignItems: alignMethod,
		}'
		@mouseover='hovered = true'
		@mouseleave='hovered = false'
	>
		<div
			class='InfoContainer'
			:class='hovered ? "ZoomEffect" : "NoZoomEffect"'>
			<slot/>
			<div
				class='Label'
				:style='{
					color: colors.text,
				}'
			>
				{{label}}
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/cards/Card';
</style>