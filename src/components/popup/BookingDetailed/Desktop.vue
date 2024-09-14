<script lang='ts'>
import {defineComponent} from 'vue'

import TemplatePopup from '@/components/popup/BookingDetailed/Template.vue'
export default defineComponent({
	name: 'DesktopBookingPopup',
	extends: TemplatePopup,
})
</script>

<template>
	<TemplatePopup
		:title='title'
		:colors='colors'
		:closeButton='closeButton'
		:isLoading='loading'
		
		@close='$emit("close")'
	>
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<InputForm
				placeholder='Data'
				label='date'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.date'
				:type='Input.Date'
				:readOnly='readOnly.admin'
				:align='readOnly.admin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Stato'
				label='status'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.status'
				:type='Input.Select'
				:options='States'
				:readOnly='readOnly.admin'
				:align='readOnly.admin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Inizio'
				label='start'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.start'
				:type='Input.Time'
				:readOnly='readOnly.admin'
				:align='readOnly.admin ? Justify.Center : Justify.Left'
			/>
			<InputForm
				placeholder='Fine'
				label='end'
				width='80%'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.end'
				:type='Input.Time'
				:readOnly='readOnly.admin'
				:align='readOnly.admin ? Justify.Center : Justify.Left'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Guest'
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Nome'
				label='name'
				required

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.name'
				:readOnly='readOnly.data'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'
				required

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.surname'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Guest'
		>
			<InputForm
				placeholder='Email'
				label='email'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Email'
				:defaultValue='defaultBooking.email'
				:readOnly='readOnly.data'
			/>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Date'
				:defaultValue='defaultBooking.birthday'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Guest'
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Telefono'
				label='phone'
				required

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
				:defaultValue='defaultBooking.phone'
				:readOnly='readOnly.data'
			/>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.instagram'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Admin && defaultBooking.other'
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Nome'
				label='name'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.name'
				:readOnly='readOnly.admin'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.surname'
				:readOnly='readOnly.admin'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Admin && defaultBooking.other'
		>
			<InputForm
				placeholder='Email'
				label='email'

				:ref='input'
				:colors='colors'
				:type='Input.Email'
				:defaultValue='defaultBooking.email'
				:readOnly='readOnly.admin'
			/>
			<InputForm
				placeholder='Data di nascita'
				label='birthday'

				:ref='input'
				:colors='colors'
				:type='Input.Date'
				:defaultValue='defaultBooking.birthday'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Admin && defaultBooking.other'
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Telefono'
				label='phone'

				:ref='input'
				:colors='colors'
				:type='Input.Phone'
				:defaultValue='defaultBooking.phone'
				:readOnly='readOnly.admin'
			/>
			<InputForm
				placeholder='Instagram'
				label='instagram'

				:ref='input'
				:colors='colors'
				:defaultValue='defaultBooking.instagram'
				:readOnly='readOnly.admin'
			/>
		</LineForm>
		<LineForm>
			<InputForm
				placeholder='Note'
				label='note'
				height='10vh'

				:ref='input'
				:colors='colors'
				:type='Input.Area'
				:defaultValue='defaultBooking.note'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='role === Role.Admin && (![Status.FREE].includes(defaultBooking.status) || !readOnly.admin || checkString(defaultBooking.internalNote))'
			>
			<InputForm
				placeholder='Note interne'
				label='internalNote'
				height='10vh'

				:ref='input'
				:colors='colors'
				:type='Input.Area'
				:defaultValue='defaultBooking.internalNote'
				:readOnly='readOnly.data'
			/>
		</LineForm>
		<LineForm
			v-if='readOnly.all'
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Elimina'
				secondary

				v-if='defaultBooking.disposable'

				:colors='colors'

				@action='deleteBooking'
			/>
			<LabelButton
				label='Cancella'
				secondary

				v-if='defaultBooking.erasable'

				:colors='colors'

				@action='cancelBooking'
			/>
			<LabelButton
				label='Modifica'
				v-if='defaultBooking.editable'

				:colors='colors'

				@action='editMode(true)'
			/>
			<LabelButton
				label='Prenota'
				v-if='defaultBooking.status === Status.FREE'

				:colors='colors'

				@action='sendBooking'
			/>
			<LabelButton
				label='Accetta'
				v-if='defaultBooking.acceptable'

				:colors='colors'

				@action='acceptBooking'
			/>
			<LabelButton
				label='Conferma'
				v-if='defaultBooking.confirmable'

				:colors='colors'

				@action='confirmBooking'
			/>
		</LineForm>
		<LineForm
			v-else
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Annulla'
				:colors='colors'

				@action='editMode(false)'
			/>
			<LabelButton
				label='Salva'
				:colors='colors'

				@action='editBooking'
			/>
		</LineForm>
	</TemplatePopup>
	
</template>