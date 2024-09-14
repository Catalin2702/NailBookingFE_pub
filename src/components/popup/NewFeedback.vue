<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

const Rating = defineAsyncComponent(() => import('@/components/forms/inputs/Rating.vue'))

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'NewFeedbackPopup',
	extends: TemplatePopup,
	components: {TemplatePopup, Rating},
	methods: {
		createFeedback() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value['rating'] === 0) {
				this.sendError('Inserisci un voto')
				return
			}
			this.$emit('create', {
				rating: data.value['rating'],
				title: data.value['title'],
				description: data.value['description'],
			})
		}
	},
	emits: ['create'],
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
	>
		<LineForm/>

		<LineForm
			:lineType='Justify.Left'
		>
			<Rating
				placeholder='Voto'
				label='rating'
				required

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Titolo'
				label='title'

				:ref='input'
				:colors='colors'
				:type='Input.Text'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Descrizione'
				label='description'
				height='20vh'

				:ref='input'
				:colors='colors'
				:type='Input.Area'
			/>
		</LineForm>
		<LineForm/>
		<LineForm
			:lineType='Justify.Center'
		>
			<LabelButton
				label='Invia'

				:colors='colors'
				@action='createFeedback'
			/>
		</LineForm>
	</TemplatePopup>
</template>