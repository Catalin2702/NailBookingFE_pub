<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateManage from '@/components/popup/Manage/Template.vue'
export default defineComponent({
	name: 'DesktopManage',
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
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Nome'
				label='name'

				:ref='input'
				:colors='colors'
				:readOnly='readOnly'
				:defaultValue='defaultData.name'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'

				:ref='input'
				:colors='colors'
				:readOnly='readOnly'
				:defaultValue='defaultData.surname'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Email'
				label='email'

				:ref='input'
				:colors='colors'
				:type='Input.Email'
				:readOnly='readOnly'
				:defaultValue='defaultData.email'
			/>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'

				:ref='input'
				:colors='colors'
				:type='Input.Date'
				:readOnly='readOnly'
				:defaultValue='defaultData.birthday'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Telefono'
				label='phone'

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
				:readOnly='readOnly'
				:defaultValue='defaultData.phone'
			/>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
				:readOnly='readOnly'
				:defaultValue='defaultData.instagram'
			/>
		</LineForm>
		<LineForm
			v-if='!readOnly'

			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Password'
				label='password'

				:ref='input'
				:colors='colors'
				:type='Input.Password'
				:readOnly='readOnly'
			/>
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