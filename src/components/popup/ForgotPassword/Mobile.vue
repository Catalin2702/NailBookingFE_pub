<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateForgotPassword from './Template.vue'
export default defineComponent({
	name: 'MobileForgotPassword',
	extends: TemplateForgotPassword,
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
	>
		<LineForm>
			<InputForm
				placeholder='Email'
				label='email'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Email'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Annulla'
				secondary

				:colors='colors'

				@action='closePopup'
			/>
			<LabelButton
				label='Invia'

				:colors='colors'

				@action='sendForgotPassword'
			/>
		</LineForm>
	</TemplatePopup>
</template>