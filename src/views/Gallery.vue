<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

const Section = defineAsyncComponent(() => import('@/components/sections/views/Gallery/Gallery.vue'))
const FocusImage = defineAsyncComponent(() => import('@/components/images/Focus.vue'))

import TemplateView from '@/views/Template.vue'
import {iViewDataGallery, iEventData, iPopup, iPopups} from '@/utils/interfaces'
import {defaultGallery, defaultViewGallery} from '@/utils/default'
import {EmitActions, galleryPopups} from '@/utils/constants'
import {checkArray, checkString, Popup} from '@/utils/functions'
export default defineComponent({
	name: 'GalleryView',
	components: {TemplateView, Section, FocusImage},
	inheritAttrs: false,
	extends: TemplateView,
	props: {
		viewData: {
			type: Object as () => iViewDataGallery,
			default: defaultViewGallery
		},
	},
	computed: {
		popups: function (): iPopups {
			return {
				[galleryPopups.Image.key]: Popup(galleryPopups.Image.key, galleryPopups.Image.title, true, '', {index: 0, image: defaultGallery}, {action: '', params: {width: '50%'}}),
			}
		},
		galleryPopups: () => galleryPopups,
	},
	data() {
		return {
			ready: true,
		}
	},
	methods: {
		setImageParams(popup: iPopup, width: string) {
			popup.setParams({
				action: '',
				params: {width}
			})
		},
		setImageData(popup: iPopup, index: number) {
			popup.setData({
				index: index,
				image: this.viewData.gallery[index]
			})
		},
		manageImagePopup(popup: iPopup, index: number, width: string) {
			this.setImageParams(popup, width)
			this.setImageData(popup, index)
			return popup.open(false)
		},
		selectImage(index: number) {
			if (index < 0)
				index = this.viewData.gallery.length - 1
			else if (index >= this.viewData.gallery.length)
				index = 0
			if (!checkString(this.viewData.gallery[index].title)) {
				const event: iEventData = {
					action: EmitActions.GetImageData,
					params: {
						id: this.viewData.gallery[index].id
					}
				}
				this.sendEvent(event)
			}

			if (!this.popupManager.isOpen())
				this.popupManager.add(this.manageImagePopup(this.popups[galleryPopups.Image.key], index, '50%'))
			else {
				const popup = this.popupManager.getPopup()
				if (popup?.getKey() === galleryPopups.Image.key) {
					this.setImageData(popup, index)
				}
			}
		},
		getNextImages() {
			if (this.ready && checkArray(this.viewData.gallery)) {
				this.ready = false
				const event: iEventData = {
					action: EmitActions.GetNextImages,
					params: {
						len: this.viewData.gallery.length
					}
				}
				this.sendEvent(event)

				window.setTimeout(() => {
					this.ready = true
				}, 2000)
			}
			else {
				// pass
			}
		}
	}
})
</script>

<template>
	<TemplateView
		:scroll='!popupManager.isOpen() && !popupManager.getPopupByKey(galleryPopups.Image.key)?.isVisible()'
		:onScroll='scrollOptions'
		@bottom='getNextImages'
	>
		<Section
			:gallery='viewData?.gallery'

			@select='selectImage'
		/>
		<FocusImage
			v-if='popupManager.isOpen() && popupManager.getPopupByKey(galleryPopups.Image.key)?.isVisible()'

			:image='popupManager.getPopup()?.getData().image'
			:width='popupManager.getPopup()?.getParams().params.width'
			:colors='colors'
			:device='device'

			@close='closePopup'
			@before='selectImage(popupManager.getPopup()?.getData().index - 1)'
			@after='selectImage(popupManager.getPopup()?.getData().index + 1)'
		/>
	</TemplateView>
</template>

<style scoped lang='scss'>
</style>