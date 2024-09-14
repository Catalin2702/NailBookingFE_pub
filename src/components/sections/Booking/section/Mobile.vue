<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateBookingSection from './Template.vue'
export default defineComponent({
	name: 'MobileBookingSection',
	extends: TemplateBookingSection
})
</script>

<template>
	<ListSection
		:colors='colors'
		:key='booking.id'
	>
		<LineSection
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Data'
				label='date'
				readOnly
				width='50%'

				:type='Input.Date'
				:colors='colors'
				:defaultValue='booking.date'
			/>
			<InputForm
				placeholder='Stato'
				label='status'
				readOnly
				width='50%'

				:type='Input.Select'
				:colors='colors'
				:defaultValue='booking.status'
				:options='States'
			/>
		</LineSection>
		<LineSection
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Inizio'
				label='start'
				readOnly

				:type='Input.Time'
				:colors='colors'
				:defaultValue='booking.start'
			/>
			<InputForm
				placeholder='Fine'
				label='end'
				readOnly

				:type='Input.Time'
				:colors='colors'
				:defaultValue='booking.end'
			/>
		</LineSection>
		<LineSection
			:lineType='Justify.SpaceBetween'
			v-if='showDetails'
		>
			<InputForm
				placeholder='Nome'
				label='name'
				width='49%'
				readOnly

				:type='Input.Text'
				:colors='colors'
				:defaultValue='booking.name'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'
				width='49%'
				readOnly

				:type='Input.Text'
				:colors='colors'
				:defaultValue='booking.surname'
			/>
		</LineSection>
		<LineSection
			:lineType='Justify.SpaceEvenly'
		>
				<SvgButton
					:icon='icons.edit'

					@action='editBooking'
				/>
				<SvgButton
					v-if='!nonErasableStates.includes(booking.status)'
					:icon='icons.cancel'

					@action='cancelBooking'
				/>
				<SvgButton
					v-if='!noValidStates.includes(booking.status)'
					rotate='90'
					:icon='icons.arrow'
					:flipX='showDetails'

					@action='toggleDetails'
				/>
		</LineSection>
	</ListSection>
</template>
