<script lang='ts'>
import {defineComponent} from 'vue'

import Template from '@/components/popup/BookingsManage/Template.vue'
export default defineComponent({
	name: 'DesktopBookingManage',
	extends: Template
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
				:placeholder='form.dateFrom.placeholder'
				:label='form.dateFrom.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.dateFrom.value.toISOString().slice(0, 10)'
				:type='Input.Date'
			/>
			<InputForm
				:placeholder='form.dateTo.placeholder'
				:label='form.dateTo.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.dateTo.value.toISOString().slice(0, 10)'
				:type='Input.Date'
			/>
		</LineForm>
		<LineForm
			v-if='showAdvanced'

			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				:placeholder='form.name.placeholder'
				:label='form.name.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.name.value'
				:type='Input.Text'
			/>
			<InputForm
				:placeholder='form.surname.placeholder'
				:label='form.surname.label'
				:ref='input'
				:colors='colors'
				:defaultValue='form.surname.value'
				:type='Input.Text'
			/>
		</LineForm>
		<LineForm
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				width='calc(50% - 2vw)'

				:placeholder='form.status.placeholder'
				:label='form.status.label'
				:ref='input'
				:colors='colors'
				:options='allStates'
				:defaultValue='allStates[0].value'
				:type='Input.Select'
			/>
			<SvgButton
				icon='options'

				@action='toggleAdvanced'
			/>
		</LineForm>
		<ListForm maxHeight='400px' v-if='!isLoading'>
			<BookingSectionMobile
				v-for='data in bookings'

				:key='data.id'
				:colors='colors'
				:booking='data'

				@edit='editBooking(data)'
				@cancelBooking='cancelBooking(data)'
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
				:label='form.search.placeholder'
				:colors='colors'

				@action='search'
			/>
		</LineForm>
	</PopupTemplate>
</template>