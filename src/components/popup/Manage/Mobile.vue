<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateManage from '@/components/popup/Manage/Template.vue'
export default defineComponent({
	name: 'MobileManage',
	extends: TemplateManage,
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='loading'

		@close='$emit("close")'
	>
		<LineForm>
			<InputForm
				placeholder='Nome'
				label='name'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultData.name'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Cognome'
				label='surname'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultData.surname'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'

				:ref='input'
				:colors='colors'
				:type='Input.Date'
				:defaultValue='defaultData.birthday'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Email'
				label='email'

				:ref='input'
				:colors='colors'
				:type='Input.Email'
				:defaultValue='defaultData.email'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Telefono'
				label='phone'

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
				:defaultValue='defaultData.phone'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultData.instagram'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm
			v-if='!readOnly'
		>
			<InputForm
				placeholder='Password'
				label='password'

				:ref='input'
				:colors='colors'
				:type='Input.Password'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm
			v-if='!readOnly'
		>
			<InputForm
				placeholder='Conferma Password'
				label='confirmPassword'

				:ref='input'
				:colors='colors'
				:type='Input.Password'
				:readOnly='readOnly'
			/>
		</LineForm>
		<LineForm
			v-if='readOnly'

			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Elimina'
				secondary

				:colors='colors'

				@action='sendDelete'
			/>
			<LabelButton
				label='Modifica'

				:colors='colors'
				@action='readOnly = false'
			/>
			<LabelButton
				label='Logout'

				:colors='colors'

				@action='sendLogout'
			/>
		</LineForm>
		<LineForm
			v-if='!readOnly'

			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Annulla'
				secondary

				:colors='colors'

				@action='readOnly = true'
			/>
			<LabelButton
				label='Modifica'

				:colors='colors'

				@action='sendUpdate'
			/>
		</LineForm>
	</TemplatePopup>
</template>