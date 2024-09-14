<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'LinkButton',
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
		link: {
			type: String,
			default: '',
		},
	},
	data() {
		return{
			clicked: false,
		}
	},
})
</script>

<template>
	<RouterLink
		class='LinkButton'
		:to='link'
		:style='{
				width: width,
				height: height,
				backgroundColor: (secondary ? colors.secondary : colors.tertiary),
				color: (secondary ? colors.tertiary : colors.primary),
			}'
		:class='clicked ? "ButtonClicked" : "ButtonIdle"'
	>
		{{label}}

	</RouterLink>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Link';
@import '@/assets/styles/components/buttons/Button';
</style>