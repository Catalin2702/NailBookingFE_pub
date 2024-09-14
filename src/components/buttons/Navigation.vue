<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
export default defineComponent({
	name: 'NavigationButton',
	props: {
		pageName: {
			type: String,
			default: 'Home',
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		currentRoute: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			hover: false,
		}
	},
	methods: {
		toggleHover(state: boolean) {
			this.hover = state
		},
	}
})
</script>

<template
	@mouseover='toggleHover(true)'
	@mouseleave='toggleHover(false)'
>
	<router-link
		class='router-link'

		:to='pageName'

		@mouseover='toggleHover(true)'
		@mouseleave='toggleHover(false)'
	>
		<div
			class='NavButtonContainer'
			:style='{
			color: hover && !currentRoute ? colors.tertiary : (currentRoute ? colors.primary : colors.text),
			backgroundColor: currentRoute ? colors.tertiary : "transparent"}'
		>
			{{pageName}}
		</div>
	</router-link>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Navigation';
</style>