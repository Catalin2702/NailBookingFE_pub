<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import {iSection} from '@/utils/interfaces'
import {defaultSection} from '@/utils/default'

const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))
export default defineComponent({
	name: 'HomeBanner',
	components: {Image},
	props: {
		banner: {
			type: Object as () => iSection,
			default: defaultSection,
			required: true,
		},
	}
})
</script>

<template>
	<div
		class='BannerContainer'
	>
		<Image
			class='BannerImage'
			alt=''

			:src='banner.images[0]'
		/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/views/Home/Banner';
</style>