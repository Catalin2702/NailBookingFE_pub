<script lang='ts'>
import {defineComponent} from 'vue'

import Template from './Template.vue'
export default defineComponent({
	name: 'DesktopRestorePassword',
	extends: Template,
})
</script>

<template>
	<TemplatePopup
		:title='title'
		:colors='colors'
		:closeButton='closeButton'

		@close='closePopup'
		@error='sendError'
	>
		<LineForm>
			<InputForm
				required

				:placeholder='form.confirmPassword.placeholder'
				:label='form.confirmPassword.label'
				:ref='input'
				:colors='colors'
				:type='Input.Password'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				required

				:placeholder='form.newPassword.placeholder'
				:label='form.newPassword.label'
				:ref='input'
				:colors='colors'
				:type='Input.Password'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				:label='formButtons.cancel'
				:colors='colors'

				@click='closePopup'
			/>
			<LabelButton
				:label='formButtons.send'
				:colors='colors'

				@click='restorePassword'
			/>
		</LineForm>
	</TemplatePopup>
</template>