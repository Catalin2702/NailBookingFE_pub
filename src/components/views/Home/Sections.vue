<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iSection} from '@/utils/interfaces'
import {defaultSection} from '@/utils/default'
import {Device} from '@/utils/constants'
import {Dark} from '@/utils/palette'

const HomeSection = defineAsyncComponent(() => import('@/components/sections/views/Home/Home.vue'))
export default defineComponent({
	name: 'HomeSections',
	components: {HomeSection},
	props: {
		sections: {
			type: Array as () => iSection[],
			default: () => [defaultSection],
			required: true,
		},
		device: {
			type: Number,
			default: Device.Desktop,
			required: true,
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
			required: true,
		},
	}
})
</script>

<template>
	<div
		class='SectionsContainer'
	>
		<HomeSection
			v-for='(item, index) in sections'

			:key='index'
			:section='item'
			:device='device'
			:colors='colors'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/views/Home/Sections';
</style>