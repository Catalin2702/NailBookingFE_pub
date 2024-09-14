<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateNewBookingPopup from '@/components/popup/NewBooking/Template.vue'
export default defineComponent({
	name: 'MobileNewBookingPopup',
	extends: TemplateNewBookingPopup,
})
</script>

<template>
	<TemplatePopup
		:title='title'
		:colors='colors'
		:closeButton='closeButton'

		@close='$emit("close")'
	>
		<LineForm
			v-if='!params.create'
			:lineType='Justify.Left'
		>
			<InputForm
				required

				:placeholder='form.date.title'
				:label='form.date.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.date.value'
				:type='form.date.type_'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				required

				:placeholder='form.start.title'
				:label='form.start.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.start.value'
				:type='form.start.type_'
			/>
			<InputForm
				:placeholder='form.end.title'
				:label='form.end.label'
				required

				:ref='input'
				:colors='colors'
				:defaultValue='form.end.value'
				:type='form.end.type_'
			/>
		</LineForm>
		<LineForm
			v-if='!params.create'

			:lineType='Justify.Left'
		>
			<InputForm
				placeholder='Note'
				label='note'
				height='10vh'

				:ref='input'
				:colors='colors'
				:type='Input.Area'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.Center'
		>
			<LabelButton
				v-if='params.create'

				label='Crea'
				:colors='colors'

				@action='createBooking'
			/>
			<LabelButton
				v-else

				label='Richiedi'
				:colors='colors'

				@action='requestBooking'
			/>
		</LineForm>
	</TemplatePopup>
</template>