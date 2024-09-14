<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateNewBookingPopup from '@/components/popup/NewBooking/Template.vue'
export default defineComponent({
	name: 'DesktopNewBookingPopup',
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
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				v-if='!params.create'

				required

				:placeholder='form.date.title'
				:label='form.date.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.date.value'
				:type='form.date.type_'
			/>
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
				required

				:placeholder='form.end.title'
				:label='form.end.label'
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