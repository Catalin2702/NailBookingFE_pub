<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

const LabelButton = defineAsyncComponent(() => import('@/components/buttons/Label.vue'))

import ActionMenu from '@/components/nav/Action.vue'
export default defineComponent({
	name: 'FeedbackMenu',
	extends: ActionMenu,
	components: {ActionMenu, LabelButton},
	methods: {
		add() {
			this.$emit('add')
		},
	},
	emits: ['add'],
})
</script>

<template>
	<ActionMenu
		:colors='colors'
	>
		<LabelButton
			label='Aggiungi'
			height='100%'

			:colors='colors'

			@action='add'
		/>
	</ActionMenu>
</template>