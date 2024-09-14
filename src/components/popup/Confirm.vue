<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iConfirmResponse} from '@/utils/interfaces'

import Template from '@/components/popup/structure/PopupTemplate.vue'

const LineForm = defineAsyncComponent(() => import('@/components/forms/structures/Line.vue'))
const LabelButton = defineAsyncComponent(() => import('@/components/buttons/Label.vue'))
export default defineComponent({
	name: 'ConfirmPopup',
	extends: Template,
	components: {Template, LabelButton, LineForm},
	props: {
		action: {
			type: Function,
			default: () => {
				// pass
			},
		},
		params: {
			type: Object,
		},
	},
	methods: {
		confirm(response: boolean) {
			this.$emit('confirm', {
				response,
				action: this.action,
				params: this.params,
			} as iConfirmResponse)
		}
	},
	emits: ['confirm'],
})
</script>

<template>
	<Template
		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
	>
		<LineForm
			:lineType='Justify.SpaceEvenly'
		>
			<LabelButton
				label='Annulla'
				secondary

				:colors='colors'

				@click='confirm(false)'
			/>
			<LabelButton
				label='Conferma'

				:colors='colors'

				@click='confirm(true)'
			/>
		</LineForm>
	</Template>
</template>