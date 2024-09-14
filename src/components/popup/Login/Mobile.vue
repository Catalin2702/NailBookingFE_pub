<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateLogin from '@/components/popup/Login/Template.vue'
export default defineComponent({
	name: 'MobileLogin',
	extends: TemplateLogin,
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
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Register'
				secondary

				:colors='colors'

				@action='toggle'
			/>
			<LabelButton
				label='Login'

				:colors='colors'

				@action='sendLogin'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.Center'
		>
			<TextButton
				label='Password dimenticata'

				:colors='colors'

				@action='sendForgotPassword'
			/>
		</LineForm>
	</TemplatePopup>
</template>