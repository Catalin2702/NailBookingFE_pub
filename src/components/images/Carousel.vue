<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'
import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'

const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))
export default defineComponent({
	name: 'CarouselSlider',
	components: {SvgButton, Image},
	props: {
		images: {
			type: Array as () => string[],
			default: new Array(''),
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		width: {
			type: String,
			default: '100%',
		},
		height: {
			type: String,
			default: '100%',
		},
		showButtons: {
			type: Boolean,
			default: true,
		},
		buttonSize: {
			type: String,
			default: '3vw',
		},
		borderRadius: {
			type: String,
			default: '0',
		},
	},
	data() {
		return {
			current: 0,
			buttons: {
				left: {
					icon: 'arrow_r',
					hover: false,
				},
				right: {
					icon: 'arrow_r',
					hover: false,
				},
			},
			hover: false,
			intervalId: -1,
		}
	},
	methods: {
		swipe(direction: number, auto = false) {
			if(!auto) {
				clearInterval(this.intervalId)
				window.setTimeout(this.autoSwipe, 10000)
			}
			this.current += direction
			if(this.current < 0)
				this.current = this.images.length - 1
			if(this.current >= this.images.length)
				this.current = 0
		},
		autoSwipe() {
			clearInterval(this.intervalId)
			this.intervalId = window.setInterval(() => {
				if(!this.hover)
					this.swipe(1, true)
				else
					clearInterval(this.intervalId)
			}, 4000)
		},
	},
	watch: {
		hover() {
			if(!this.hover) this.autoSwipe()
		},
	},
	mounted() {
		this.autoSwipe()
	}
})
</script>

<template>
	<div
		:style='{
			width: width,
			height: height,
		}'
	>
		<div class='CarouselSlider' >
			<div
				class='ButtonContainer left'

				v-if='showButtons'

				:style='{
					backgroundColor: colors.tertiary,
					opacity: buttons.left.hover ? 1 : 0.5,
					transform: buttons.left.hover ? "scale(1.1)" : "scale(1)",
					width: buttonSize,
					height: buttonSize,
				}'

				@mouseover='buttons.left.hover = true'
				@mouseleave='buttons.left.hover = false'
				@click='swipe(-1)'
			>
				<SvgButton
					flip-x
					:effect='false'

					:icon='buttons.left.icon'
				/>
			</div>
			<Image
				alt=''
				class='Image'

				:src='images[current]'
				:style='{
					backgroundColor: colors.primary,
					borderRadius: borderRadius,
				}'
				@mouseover='hover = true'
				@mouseleave='hover = false'
			/>
			<div
				class='IndicatorContainer'
			>
				<div
					class='Indicator'
					v-for='index in images.length'
					:key='index'

					:style='{
						backgroundColor: current === index - 1 ? colors.tertiary : colors.primary,
					}'
				/>
			</div>
			<div
				class='ButtonContainer right'

				v-if='showButtons'

				:style='{
					backgroundColor: colors.tertiary,
					opacity: buttons.right.hover ? 1 : 0.5,
					transform: buttons.right.hover ? "scale(1.1)" : "scale(1)",
					width: buttonSize,
					height: buttonSize,
				}'

				@mouseover='buttons.right.hover = true'
				@mouseleave='buttons.right.hover = false'
				@click='swipe(1)'
			>
				<SvgButton
					:effect='false'

					:icon='buttons.right.icon'
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sliders/Carousel';
</style>