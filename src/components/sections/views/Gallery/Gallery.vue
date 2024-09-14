<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'
import {iColors, iGallery} from '@/utils/interfaces'
import {defaultGallery} from '@/utils/default'
import {Dark} from '@/utils/palette'
import CircleLoader from "@/components/loaders/Circle.vue";

const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))
export default defineComponent({
	name: 'GallerySection',
	components: {CircleLoader, Image},
	props: {
		height: {
			type: String,
			default: 'auto',
		},
		gallery: {
			type: Array as () => iGallery[],
			default: () => [defaultGallery],
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		}
	},
	data() {
		return {
			loadingImage: true,
		}
	},
	methods: {
		selectImage(index: number) {
			this.$emit('select', index)
		},
		checkLoadingImage(image: iGallery, loading: boolean) {
			image.loading = !loading
		}
	},
	emits: ['select'],
})
</script>

<template>
	<div class='GalleryContainer'>
		<div
			class='item'

			v-for='(image, index) in gallery'

			:key='index'

			@click='selectImage(index)'
		>
			<Image
				v-show='!image.loading'
				:style='{
					height: height || "auto"
				}'
				:src='image.image'
				:options='{
					transform: {
						width: 500,
						resize: "contain",
					}
				}'
				:alt='image.title'
				@load='checkLoadingImage(image, $event)'
			/>
			<CircleLoader
				v-show='image.loading'
				:colors='colors'
			/>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Gallery/Common';
</style>