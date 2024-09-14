<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iSection, iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultSection} from '@/utils/default'
import {Device} from '@/utils/constants'

const Desktop = defineAsyncComponent(() => import('@/components/sections/views/Home/section/Desktop.vue'))
const Mobile = defineAsyncComponent(() => import('@/components/sections/views/Home/section/Mobile.vue'))
export default defineComponent({
	name: 'HomeSection',
	computed: {
		Device: () => Device,
	},
	components: {
		Desktop,
		Mobile,
	},
	props: {
		device: {
			type: Number,
			default: Device.Desktop,
		},
		section: {
			type: Object as () => iSection,
			default: defaultSection
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	}
})
</script>

<template>
	<Desktop
		v-if='device !== Device.Mobile'

		:section='section'
		:colors='colors'
	/>
	<Mobile
		v-else

		:section='section'
		:colors='colors'
	/>
</template>