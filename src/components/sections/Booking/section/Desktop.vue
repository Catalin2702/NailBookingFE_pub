<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateBookingSection from './Template.vue'
export default defineComponent({
	name: 'DesktopBookingSection',
	extends: TemplateBookingSection,
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
				width='21%'
				readOnly

				:type='Input.Date'
				:colors='colors'
				:defaultValue='booking.date'
			/>
			<InputForm
				placeholder='Inizio'
				label='start'
				width='22.5%'
				readOnly

				:type='Input.Time'
				:colors='colors'
				:defaultValue='booking.start'
			/>
			<InputForm
				placeholder='Fine'
				label='end'
				width='22.5%'
				readOnly

				:type='Input.Time'
				:colors='colors'
				:defaultValue='booking.end'
			/>
			<InputForm
				placeholder='Stato'
				label='status'
				width='28.5%'
				readOnly

				:type='Input.Select'
				:colors='colors'
				:defaultValue='booking.status'
				:options='States'
			/>
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
	</ListSection>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Profile/Desktop';
</style>