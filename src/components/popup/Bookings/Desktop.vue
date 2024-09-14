<script lang='ts'>
import {defineComponent} from 'vue'

import Template from '@/components/popup/Bookings/Template.vue'
import {checkArray} from "@/utils/functions";
export default defineComponent({
	name: 'DesktopBookingRecap',
	methods: {checkArray},
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
			v-if='isLoading'
			:lineType='Justify.Center'
		>
			<CircleLoader
				:colors='colors'
			/>
		</LineForm>
		<ListForm v-else-if='checkArray(bookings) && bookings[0].id !== -1' maxHeight='600px'>
			<BookingSectionDesktop
				v-for='data in bookings'

				:key='data.id'
				:colors='colors'
				:booking='data'

				@edit='editBooking(data)'
				@cancelBooking='cancelBooking(data)'
			/>
		</ListForm>
		<LineForm
			v-if='date.show'
			:lineType='Justify.Center'
		>
			<LabelButton
				:label='addButton'

				@action='newBooking'
			/>
		</LineForm>
		<LineForm
			v-else
			:lineType='Justify.Center'
		>
			<LabelButton
				:label='activeButton'

				@action='sendActive'
			/>
		</LineForm>
	</PopupTemplate>
</template>