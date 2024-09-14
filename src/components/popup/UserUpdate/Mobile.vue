<script lang='ts'>
import {defineComponent} from 'vue'

import Template from './Template.vue'

export default defineComponent({
	name: 'MobileUserUpdate',
	extends: Template,
})
</script>

<template>
	<PopupTemplate
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='isLoading'

		@close='closePopup'
	>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='forms.name.placeholder'
				:label='forms.name.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.name'
				:readOnly='!editMode'
				:type='Input.Text'
			/>
			<InputForm
				:placeholder='forms.surname.placeholder'
				:label='forms.surname.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.surname'
				:readOnly='!editMode'
				:type='Input.Text'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				:placeholder='forms.email.placeholder'
				:label='forms.email.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.email'
				:readOnly='!editMode'
				:type='Input.Email'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='forms.birthday.placeholder'
				:label='forms.birthday.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.birthday'
				:readOnly='!editMode'
				:type='Input.Date'
			/>
			<InputForm
				:placeholder='forms.role.placeholder'
				:label='forms.role.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.role'
				:options='forms.role.value.options'
				:readOnly='!editMode'
				:type='Input.Select'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='forms.instagram.placeholder'
				:label='forms.instagram.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.instagram'
				:readOnly='!editMode'
				:type='Input.Text'
			/>
			<InputForm
				:placeholder='forms.phone.placeholder'
				:label='forms.phone.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.phone'
				:readOnly='!editMode'
				:type='Input.Phone'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='forms.coupon.discount.placeholder'
				:label='forms.coupon.discount.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.coupon.discount'
				:readOnly='!editMode'
				:type='Input.Number'
			/>
			<InputForm
				:placeholder='forms.coupon.count.placeholder'
				:label='forms.coupon.count.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.coupon.count'
				:readOnly='!editMode'
				:type='Input.Number'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				height='10vh'
				:placeholder='forms.internalNote.placeholder'
				:label='forms.internalNote.label'
				:ref='input'
				:colors='colors'
				:defaultValue='user.internalNote'
				:readOnly='!editMode'
				:type='Input.Area'
			/>
		</LineForm>
		<LineForm
			v-if='!editMode'
			:lineType='Justify.Center'
		>
			<LabelButton

				:label='formButtons.edit'
				:colors='colors'

				@click='toggleEditMode'
			/>
		</LineForm>
		<LineForm
			v-else
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				secondary

				:label='formButtons.cancel'
				:colors='colors'

				@click='toggleEditMode'
			/>
			<LabelButton

				:colors='colors'
				:label='formButtons.save'

				@click='edit'
			/>
		</LineForm>
	</PopupTemplate>
</template>