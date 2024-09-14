<script lang='ts'>
import {defineComponent} from 'vue'

import Template from './Template.vue'

export default defineComponent({
	name: 'MobileUsersManage',
	extends: Template,
})
</script>

<template>
	<PopupTemplate
		:colors='colors'
		:title='title'
		:closeButton='closeButton'

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
				:defaultValue='forms.name.value'
				:type='Input.Text'
			/>
			<InputForm
				:placeholder='forms.surname.placeholder'
				:label='forms.surname.label'
				:ref='input'
				:colors='colors'
				:defaultValue='forms.surname.value'
				:type='Input.Text'
			/>
			<SvgButton
				icon='options'

				@action='toggleAdvanced'
			/>
		</LineForm>
		<LineForm
			v-if='showAdvanced'
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='forms.email.placeholder'
				:label='forms.email.label'
				:ref='input'
				:colors='colors'
				:defaultValue='forms.email.value'
				:type='Input.Text'
			/>
			<InputForm
				:placeholder='forms.phone.placeholder'
				:label='forms.phone.label'
				:ref='input'
				:colors='colors'
				:defaultValue='forms.phone.value'
				:type='Input.Phone'
			/>
		</LineForm>
		<LineForm
			v-if='showAdvanced'
			:lineType='Justify.Left'
		>
			<InputForm
				width='calc(50% - 2vw)'

				:placeholder='forms.instagram.placeholder'
				:label='forms.instagram.label'
				:ref='input'
				:colors='colors'
				:defaultValue='forms.instagram.value'
				:type='Input.Text'
			/>
		</LineForm>
		<ListForm maxHeight='450px' v-if='!isLoading'>
			<MobileUserSection
				v-for='user in users'

				:key='user.id'
				:colors='colors'
				:user='user'

				@edit='editUser(user.id)'
				@getDetails='getDetails(user.id)'
			/>
		</ListForm>
		<LineForm
			v-if='isLoading'
			:lineType='Justify.Center'
		>
			<CircleLoader
				:colors='colors'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.Center'
		>
			<LabelButton
				:label='forms.search.placeholder'
				:colors='colors'

				@action='search'
			/>
		</LineForm>
	</PopupTemplate>
</template>
