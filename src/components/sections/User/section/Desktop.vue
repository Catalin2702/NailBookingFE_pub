<script lang='ts'>
import {defineComponent} from 'vue'

import Template from './Template.vue'

export default defineComponent({
	name: 'DesktopUserSection',
	extends: Template,
})
</script>

<template>
	<ListSection
		:colors='colors'
		:key='user.id'
	>
		<LineSection
			:lineType='Justify.SpaceBetween'
		>
			<InputForm
				placeholder='Nome'
				label='name'
				readOnly
				
				:type='Input.Text'
				:colors='colors'
				:defaultValue='user.name'
			/>
			<InputForm
				placeholder='Cognome'
				label='surname'
				readOnly
				
				:type='Input.Text'
				:colors='colors'
				:defaultValue='user.surname'
			/>
			<SvgButton
				:icon='icons.edit'
				
				@action='editUser'
			/>
			<SvgButton
				rotate='90'
				:icon='icons.arrow'
				:flipX='showDetails'

				@action='toggleDetails'
			/>
		</LineSection>
		<div
			v-if='showDetails'
		>
			<LineSection
				v-if='loadingDetails'
				:lineType='Justify.Center'
			>
				<CircleLoader
					:colors='colors'
				/>
			</LineSection>
			<div
				v-else
			>
				<LineSection
					:lineType='Justify.SpaceBetween'
				>
					<InputForm
						placeholder='Email'
						label='email'
						width='60%'
						readOnly

						:type='Input.Text'
						:colors='colors'
						:defaultValue='user.email'
					/>
					<InputForm
						placeholder='Data'
						label='birthday'
						width='40%'
						readOnly

						:type='Input.Text'
						:colors='colors'
						:defaultValue='user.birthday'
					/>
				</LineSection>
				<LineSection
					:lineType='Justify.SpaceBetween'
				>
					<InputForm
						placeholder='Telefono'
						label='phone'
						readOnly

						:type='Input.Text'
						:colors='colors'
						:defaultValue='user.phone'
					/>
					<InputForm
						placeholder='Instagram'
						label='instagram'
						readOnly

						:type='Input.Text'
						:colors='colors'
						:defaultValue='user.instagram'
					/>
				</LineSection>
				<LineSection
					:lineType='Justify.SpaceBetween'
				>
					<InputForm
						placeholder='Quantità'
						label='facebook'
						readOnly

						:type='Input.Number'
						:colors='colors'
						:defaultValue='user.coupon.count'
					/>
					<InputForm
						placeholder='Valore'
						label='notes'
						readOnly

						:type='Input.Text'
						:colors='colors'
						:defaultValue='user.coupon.discount'
					/>
				</LineSection>
				<LineSection
					v-if='checkString(user.internalNote)'
					:lineType='Justify.Left'
				>
					<InputForm
						placeholder='Note'
						label='note'
						height='auto'
						readOnly

						:type='Input.Area'
						:colors='colors'
						:defaultValue='user.internalNote'
					/>
				</LineSection>
			</div>
		</div>
	</ListSection>
</template>
