<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iButtons, iColors, iGallery} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultGallery, defaultButton} from '@/utils/default'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
import {Buttons} from '@/utils/constants'
import {checkString} from '@/utils/functions'

const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))

const popupButtons: iButtons = {
	left: {
		icon: 'arrow_r',
		size: '2rem',
		flipX: true,
		flipY: false,
		effect: true,
	},
	top: {
		...Object.assign({}, defaultButton),
	},
	right: {
		icon: 'arrow_r',
		size: '2rem',
		flipX: false,
		flipY: false,
		effect: true,
	},
	bottom: {
		...Object.assign({}, defaultButton),
	}
}
export default defineComponent({
	name: 'FocusImage',
	extends: TemplatePopup,
	components: {TemplatePopup, Image},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		image: {
			type: Object as () => iGallery,
			default: () => defaultGallery,
		},
	},
	data() {
		return {
			fullDescription: false,
			loadingImage: true,
		}
	},
	computed: {
		PopupButtons: () => popupButtons,
		Buttons: () => Buttons,
	},
	methods: {
		checkString,
		actionButton(button: number) {
			switch (button) {
				case Buttons.Left:
					this.$emit('before')
					break
				case Buttons.Right:
					this.$emit('after')
					break
				default:
					break
			}
		},
		getDescription() {
			if (this.fullDescription)
				return this.image.description
			else
				if (!checkString(this.image.description))
					return this.image.description
				else
					return `${this.image.description.slice(0, 100)} (...)`
		},
		checkLoading(success: boolean) {
			this.loadingImage = !success
		},
	},
	watch: {
		'image.image'() {
			this.loadingImage = true
		}
	},
	emits: ['before', 'after'],
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:buttons='PopupButtons'
		:title='device === Device.Mobile ? image.title : ""'
		:width='device === Device.Mobile ? "85vw" : "50vw"'
		:height='device === Device.Mobile ? "70vh" : "auto"'
		:device='device'

		@close='closePopup'
		@action='actionButton'
	>
		<LineForm
			v-if='device === Device.Desktop'
			:lineType='Justify.SpaceBetween'
		>
			<Image
				v-show='!loadingImage'
				:src='image.image'
				:alt='image.title'
				:style='{
					width: "60%",
					borderRadius: "6px",
				}'

				@load='checkLoading'
			/>
			<ListForm
				v-show='!loadingImage'
				:lineType='Align.SpaceEvenly'
			>
				<LineForm
					:lineType='Justify.Center'
					:style='{
						fontSize: "1.5rem",
						color: colors.tertiary,
					}'
				>
					{{ image.title }}
				</LineForm>
				<LineForm
					:lineType='Justify.Justify'
					:style='{
						fontSize: "1.1rem",
						cursor: !fullDescription ? "pointer" : "default",
					}'

					@click='fullDescription = !fullDescription'
				>
					{{ getDescription() }}
				</LineForm>
			</ListForm>
			<div
				v-show='loadingImage'
				style='display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 100%;'
			>
				<CircleLoader
					:colors='colors'
				/>
			</div>

		</LineForm>
		<ListForm
			v-else
			:lineType='Align.SpaceBetween'
		>
			<LineForm
				v-show='!loadingImage'
				:lineType='Justify.Center'
			>
				<Image
					:src='image.image'
					:alt='image.title'
					:style='{
						width: "90%",
						borderRadius: "6px",
					}'
				/>
			</LineForm>
			<LineForm
				v-show='!loadingImage'
				:lineType='Justify.Justify'
				:style='{
					fontSize: "1.1rem",
					cursor: !fullDescription ? "pointer" : "default",
				}'

				@click='fullDescription = !fullDescription'
			>
				{{ getDescription() }}
			</LineForm>
			<div
				v-show='loadingImage'
				style='display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 100%;'
			>
				<CircleLoader
					:style="{width: '60%', height: '60%'}"
					:colors='colors'
				/>
			</div>
		</ListForm>
	</TemplatePopup>
</template>