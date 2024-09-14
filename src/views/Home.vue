<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iViewDataHome} from '@/utils/interfaces'
import {defaultViewDataHome} from '@/utils/default'

import TemplateView from '@/views/Template.vue'

const HomeBanner = defineAsyncComponent(() => import('@/components/views/Home/Banner.vue'))
const HomeSections = defineAsyncComponent(() => import('@/components/views/Home/Sections.vue'))
export default defineComponent({
    inheritAttrs: false,
	name: 'HomeView',
	extends: TemplateView,
	components: { HomeBanner, HomeSections, TemplateView },
	props: {
		viewData: {
			type: Object as () => iViewDataHome,
			default: defaultViewDataHome,
		},
	},
})
</script>

<template>
	<TemplateView>
		<HomeBanner
			:banner='viewData.headerImage'
		/>
		<HomeSections
			:sections='viewData.sections'
			:device='device'
			:colors='colors'
		/>
	</TemplateView>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/views/Home';
</style>