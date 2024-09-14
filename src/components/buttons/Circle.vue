<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'CircleButton',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		num: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 8,
		},
		lines: {
			type: Number,
			default: 2,
		},
		text: {
			type: String,
			default: '',
		},
		textPosition: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		Dark: () => Dark,
		alpha: () => .5,
	},
	methods: {
		getRealNum(line: number, circle: number): number {
			const maxLine = Math.round(this.max/this.lines)
			return circle+maxLine*(line-1)
		},
	},
})
</script>

<template>
	<div class='CircleContainer'>
		<div
			class='CircleLine'

			v-for='line in lines'
			:key='line'

		>
			<div
				class='Circle'
				v-for='circle in Math.round(max/lines)'

				:key='circle'
				:style='{
					backgroundColor: getRealNum(line, circle) <= num ? colors.tertiary : colors.secondary,
					border: `.5px solid ${colors.secondary.toRGBA(alpha)}`,
				}'
			>
				<p
					v-if='text !== "" && textPosition === getRealNum(line, circle)'

					:style='{
						color: Dark.primary,
					}'
				>
					{{text}}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Circle';
</style>