<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Theme, themeLabel} from '@/utils/constants'

const Svg = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const Navigation = defineAsyncComponent(() => import('@/components/buttons/Navigation.vue'))
export default defineComponent({
	name: 'HorizontalMenu',
	components: {
		Navigation,
		Svg,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		pages: {
			type: Array as () => string[],
			default: new Array(''),
		},
		currentRoute: {
			type: String,
			default: 'Home'
		},
		theme: {
			type: Number,
			default: Theme.Dark,
		},
	},
	computed: {
		themeLabel: () => themeLabel,
	},
	methods: {
		toggleTheme() {
			this.$emit('toggleTheme')
		},
	},
	emits: ['toggleTheme'],
})
</script>

<template>
	<div class='HorizontalMenu' :style='{backgroundColor: colors?.primary}'>
		<div class='NavContainer'>
			<Navigation
				:pageName='page'
				:colors='colors'
				:currentRoute='page === currentRoute'
				:key='page'

				v-for='page in pages'
			/>
			<Svg
				:icon='themeLabel[theme].toLowerCase()'
				size='30px'

				@action='toggleTheme'
			/>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/nav/Menu';
</style>