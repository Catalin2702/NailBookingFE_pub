<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateRegister from '@/components/popup/Register/Template.vue'
export default defineComponent({
	name: 'DesktopRegister',
	extends: TemplateRegister,
})
</script>

<template>
	<TemplatePopup
		:closeButton='closeButton'
		:colors='colors'
		:title='title'

		@close='closePopup'
		@error='sendError'
	>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Nome'
				label='name'
				required

				:ref='input'
				:colors='colors'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'
				required

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Email'
				label='email'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Email'
			/>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'
				required

				:ref='input'
				:colors='colors'
				:defaultValue='birthdayDefault'
				:type='Input.Date'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Telefono'
				label='phone'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
			/>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Password'
				label='password'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Password'
			/>
			<InputForm
				placeholder='Conferma Password'
				label='confirmPassword'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Password'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Login'
				secondary

				:colors='colors'

				@action='$emit("toggle")'
			/>
			<LabelButton
				label='Register'

				:colors='colors'

				@action='sendRegister'
			/>
		</LineForm>
	</TemplatePopup>
</template>