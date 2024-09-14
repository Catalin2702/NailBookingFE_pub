<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {themeLabel, Theme} from '@/utils/constants'

const BurgerButton = defineAsyncComponent(() => import('@/components/buttons/Burger.vue'))

export default defineComponent({
	name: 'BurgerMenu',
	components: {
		BurgerButton,
	},
	props: {
		pages: {
			type: Array as () => string[],
			default: new Array(''),
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		currentRoute: {
			type: String,
			default: 'Home',
		},
		theme: {
			type: Number,
			default: Theme.Dark,
		},
	},
	data() {
		return{
			open: false,
		}
	},
	computed: {
		themeLabel: () => themeLabel,
	},
	methods: {
		toggle() {
			this.open = !this.open
		},
		toggleTheme() {
			this.$emit('toggleTheme')
		},
	},
	emits: ['toggleTheme'],
})
</script>

<template>
	<div
		class='BurgerContainer'

		:class=' open ? "open" : "" '
		:style='{backgroundColor: colors.secondary}'

		@click='toggle'
	>
		<div class='line' id='topLine' :style='{backgroundColor: colors.tertiary}'></div>
		<div class='line' id='middleLine' :style='{backgroundColor: !open ?  colors.tertiary : "transparent"}'></div>
		<div class='line' id='bottomLine' :style='{backgroundColor: colors.tertiary}'></div>
	</div>
	<div v-if='open' class='pagesContainer'>
		<BurgerButton
			v-for='(page, index) in pages.concat(themeLabel[theme])'
			:key='index'
			:section='page'
			:colors='colors'
			:currentRoute='page === currentRoute'

			@toggleTheme='toggleTheme'
			@close='toggle'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/nav/Burger';
</style>