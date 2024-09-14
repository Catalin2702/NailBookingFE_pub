<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateSection from '@/components/sections/views/Home/section/Template.vue'
export default defineComponent({
	name: 'MobileSection',
	extends: TemplateSection,
	data() {
		return {
			descriptionActive: false,
		}
	},
	methods: {
		showDescription() {
			this.descriptionActive = !this.descriptionActive
		}
	},
})
</script>

<template>
	<div
		class='HomeSection'

		:style='{backgroundColor: colors.primary}'
	>
		<div
			class='SectionContainer'
			v-if='section'
			@click='showDescription'
		>
			<div class='Title'>
				<p
					:style='
					{
						color: colors.tertiary,
						textShadow: `0 0 1px #000, 0 0 2px #000`
					}'
					v-html='section.title'
				/>
			</div>
			<div class='ImageContainer'>
				<Image
					v-if='section.type === ViewType.Section'
					class='Image'
					alt=''

					:src='section.images[0]'
				/>
				<BeforeAfter
					width='100%'
					maxHeight='41.6vh'

					v-else-if='section.type === ViewType.BeforeAfter'

					:colors='colors'
					:before='section.images[0]'
					:after='section.images[1]'
				/>
				<Carousel
					width='100vw'
					v-else-if='section.type === ViewType.Carousel'

					:images='section.images'
					:colors='colors'
					buttonSize='5vh'
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Home/Mobile';
</style>