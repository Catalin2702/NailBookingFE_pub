<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Theme, themeLabel} from '@/utils/constants'
export default defineComponent({
	name: 'BurgerButton',
	props: {
		section: {
			type: String,
			default: 'Home'
		},
		currentRoute: {
			type: Boolean,
			default: false
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	},
	computed: {
		ThemeLabel: () => themeLabel,
		Theme: () => Theme,
		alpha: () => .5,
	},
	methods: {
		toggleTheme() {
			this.$emit('toggleTheme')
		},
		close() {
			this.$emit('close')
		},
		click(toggle = false) {
			if (toggle)
				this.toggleTheme()
			this.close()
		}
	},
	emits: ['toggleTheme', 'close'],
})
</script>

<template>
	<div
		class='BurgerButtonContainer router-link'

		v-if='ThemeLabel.includes(section)'

		:style='{
			color: currentRoute ? colors.primary : colors.text,
			backgroundColor: currentRoute ? colors.tertiary : colors.primary,
			border: `.5px solid ${colors.secondary.toRGBA(alpha)}`,
		}'

		@click='click(true)'
	>
		<p class='burgerContent'>
			{{section}}
		</p>
	</div>
	<router-link
		class='router-link'

		v-else

		:to='section'
		:key='section'

		@click='click(false)'
	>
		<div
			class='BurgerButtonContainer'

			:style='{
				color: currentRoute ? colors.primary : colors.text,
				backgroundColor: currentRoute ? colors.tertiary : colors.primary,
				border: `.5px solid ${colors.secondary.toRGBA(alpha)}`,
			}'
		>
			<p class='burgerContent'>
				{{section}}
			</p>
		</div>
	</router-link>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Burger';
</style>