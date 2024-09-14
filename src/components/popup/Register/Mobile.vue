<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateRegister from '@/components/popup/Register/Template.vue'
export default defineComponent({
	name: 'MobileRegister',
	extends: TemplateRegister,
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
		@error='sendError'
	>
		<LineForm>
			<InputForm
				placeholder='Nome'
				label='name'
				required

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Cognome'
				label='surname'
				required

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
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
		<LineForm>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Date'
				:defaultValue='birthdayDefault'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Telefono'
				label='phone'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Password'
				label='password'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Password'
			/>
		</LineForm>
		<LineForm>
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