<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateSection from '@/components/sections/views/Home/section/Template.vue'
export default defineComponent({
	name: 'DesktopSection',
	extends: TemplateSection,
})
</script>

<template>
	<div
		class='HomeSection'
	>
		<div
			class='ImageContainer'
			v-if='checkStringArray(section.images)'
		>
			<Image
				v-if='section.type === ViewType.Section'

				:src='section.images[0]'
			/>
			<BeforeAfter
				borderRadius='10px'

				v-else-if='section.type === ViewType.BeforeAfter'

				:colors='colors'
				:before='section.images[0]'
				:after='section.images[1]'
			/>
			<Carousel
				width='100%'
				height='100%'
				borderRadius='10px'
				v-else-if='section.type === ViewType.Carousel'

				:images='section.images'
				:colors='colors'
			/>
			<Skeletor
				v-else
			/>
		</div>
		<div
			class='InfoContainer'
		>
			<div
				class='TextContainer'
			>
				<div
					class='Title'

					:style='{
						color: colors.tertiary
					}'
				>
					<p v-html='section.title'/>
				</div>
				<div
					class='Description'

					:style='{color: colors.text}'
				>
					<p v-html='customDescription'/>
				</div>
			</div>
			<div
				class='ButtonContainer'
			>
				<LinkButton
					v-if='labelButton !== "" && link !== ""'

					width='10vw'
					height='3vw'
					:label='labelButton'
					:link='link'
				/>
			</div>
		</div>

	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Home/Desktop';
</style>