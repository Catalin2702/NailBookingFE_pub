<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'

const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))
export default defineComponent({
	name: 'BeforeAfterSlider',
	components: {SvgButton, Image},
	props: {
		before: {
			type: String,
			default: '',
		},
		after: {
			type: String,
			default: '',
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		maxHeight: {
			type: String,
			default: '100%',
		},
		width: {
			type: String,
			default: '100%',
		},
		borderRadius: {
			type: String,
			default: '0',
		},
	},
	data() {
		return {
			slider: 50,
			position: '50%',
		}
	},
	watch: {
		slider() {
			this.position = this.slider + '%'
		}
	},
})
</script>

<template>
	<main>
		<div
			class='SliderImageContainer'
			:style='{
				height: maxHeight,
				width: width,
				borderRadius: borderRadius,
			}'
		>
			<div
				class='ImageContainer'
				:style='{
					height: maxHeight,
				}'
			>
				<Image
					class='ImageBefore SliderImage'
					alt=''

					:src='before'
					:style='{
						width: position,
						maxHeight: maxHeight,
					}'
				/>
				<Image
					class='ImageAfter SliderImage'
					alt=''

					:src='after'
				/>
			</div>
			<input
				class='Slider'
				type='range'
				min='0'
				max='100'

				v-model='slider'
			>
			<div
				class='SliderLine'

				:style='{left: position, backgroundColor: colors.primary}'
			/>
			<div
				class='SliderButton'
				aria-hidden='true'

				:style='{left: position, backgroundColor: colors.primary}'
			>
				<SvgButton
					icon='arrow_lr'
					size='35px'
				/>
			</div>
		</div>
	</main>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sliders/BeforeAfter';
</style>