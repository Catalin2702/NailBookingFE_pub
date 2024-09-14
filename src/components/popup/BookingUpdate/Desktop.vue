<script lang='ts'>
import {defineComponent} from 'vue'

import Template from '@/components/popup/BookingUpdate/Template.vue'
export default defineComponent({
	name: 'DesktopBookingUpdate',
	extends: Template
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
				placeholder='Data'
				label='date'
				width='40%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.date'
				:type='Input.Date'
				:readOnly='readOnly.notAdmin || readOnly.all'
				:align='readOnly.notAdmin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Stato'
				label='status'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.status'
				:type='Input.Select'
				:options='States'
				:readOnly='readOnly.notAdmin || readOnly.all'
				:align='readOnly.notAdmin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Inizio'
				label='start'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.start'
				:type='Input.Time'
				:readOnly='readOnly.notAdmin || readOnly.all'
				:align='readOnly.notAdmin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Fine'
				label='end'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.end'
				:type='Input.Time'
				:readOnly='readOnly.notAdmin || readOnly.all'
				:align='readOnly.notAdmin ? Justify.Center : Justify.Left'
			/>
		</LineForm>
		<LineForm
			v-if='noAuth.includes(role) || role === Role.Admin'
			:lineType='Justify.SpaceEvenly'
		>
			<InputForm
				placeholder='Nome'
				label='name'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.name'
				:readOnly='readOnly.all'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.surname'
				:readOnly='readOnly.all'
			/>
		</LineForm>
		<LineForm
			v-if='noAuth.includes(role) || role === Role.Admin'
			:lineType='Justify.SpaceEvenly'
		>
			<InputForm
				placeholder='Email'
				label='email'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.email'
				:type='Input.Email'
				:readOnly='readOnly.all'
			/>
			<InputForm
				placeholder='Telefono'
				label='phone'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.phone'
				:type='Input.Phone'
				:readOnly='readOnly.all'
			/>
		</LineForm>
		<LineForm
			v-if='noAuth.includes(role) || role === Role.Admin'
			:lineType='Justify.SpaceEvenly'
		>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.birthday'
				:type='Input.Date'
				:readOnly='readOnly.all'
			/>
			<InputForm
				placeholder='Instagram'
				label='instagram'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.instagram'
				:readOnly='readOnly.all'
			/>
		</LineForm>
		<LineForm
			v-if='noAuth.includes(role) || role === Role.Admin'
		>
			<InputForm
				placeholder='Note'
				label='note'
				height='10vh'

				:ref='input'
				:colors='colors'
				:defaultValue='booking.note'
				:readOnly='readOnly.all'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Admin'
			>
			<InputForm
				placeholder='Note interne'
				label='internalNote'
				height='10vh'

				:ref='input'
				:colors='colors'
				:type='Input.Area'
				:defaultValue='booking.internalNote'
				:readOnly='readOnly.all'
			/>
		</LineForm>
		<LineForm
			v-if='!readOnly.all'
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Annulla'

				:colors='colors'

				@click='closePopup'
			/>
			<LabelButton
				label='Conferma'

				:colors='colors'

				@click='update'
			/>
		</LineForm>
	</PopupTemplate>
</template>
