<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import {iButtons, iFeedback} from '@/utils/interfaces'
import {defaultButton, defaultFeedback} from '@/utils/default'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
import {Buttons} from "@/utils/constants";

const Rating = defineAsyncComponent(() => import('@/components/forms/inputs/Rating.vue'))

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
	name: 'FeedbackPopup',
	extends: TemplatePopup,
	components: {TemplatePopup, Rating},
	props: {
		feedback: {
			type: Object as () => iFeedback,
			default: defaultFeedback
		}
	},
	computed: {
		popupButtons: () => popupButtons,
	},
	methods: {
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
	}
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:buttons='popupButtons'

		@close='closePopup'
		@action='actionButton'
	>
		<LineForm/>

		<LineForm
			:lineType='Justify.Left'
		>
			<Rating
				placeholder='Voto'
				label='rating'
				readOnly

				:colors='colors'
				:defaultValue='feedback.rating'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Titolo'
				label='title'
				readOnly

				:colors='colors'
				:type='Input.Text'
				:defaultValue='feedback.title'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Descrizione'
				label='description'
				height='20vh'
				readOnly

				:colors='colors'
				:type='Input.Area'
				:defaultValue='feedback.description'
			/>
		</LineForm>
	</TemplatePopup>
</template>

<style scoped lang='scss'>

</style>