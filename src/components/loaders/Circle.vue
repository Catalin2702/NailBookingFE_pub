<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'CircleLoader',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	},
	data() {
		return {
			borderColorString: `${this.colors.secondary} transparent transparent transparent`
		}
	},
	watch: {
		colors() {
			this.borderColorString = `${this.colors.secondary} transparent transparent transparent`
		}
	}
})
</script>

<template>
	<div class='lds-ring'>
		<div
			:style='{borderColor: borderColorString}'
		/>
		<div
			:style='{borderColor: borderColorString}'
		/>
		<div
			:style='{borderColor: borderColorString}'
		/>
		<div
			:style='{borderColor: borderColorString}'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/loaders/Circle';
</style>