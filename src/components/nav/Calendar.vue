<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'
import {iSelectedMonth, iColors} from '@/utils/interfaces'

import {Dark} from '@/utils/palette'
import {defaultSelectedMonth, defaultSelectMonthOptions} from '@/utils/default'

const SelectButton = defineAsyncComponent(() => import('@/components/buttons/Select.vue'))
const LabelButton = defineAsyncComponent(() => import('@/components/buttons/Label.vue'))

import ActionMenu from '@/components/nav/Action.vue'
export default defineComponent({
	name: 'CalendarMenu',
	extends: ActionMenu,
	components: {
		SelectButton,
		LabelButton,
		ActionMenu,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		options: {
			type: Array as () => iSelectedMonth[],
			default: defaultSelectMonthOptions,
		},
		selected: {
			type: Object as () => iSelectedMonth,
			default: defaultSelectedMonth,
		},
	},
	methods: {
		today() {
			(this.$refs.selectButton as InstanceType<typeof SelectButton>).setToday()
			this.$emit('today')
		},
		request() {
			this.$emit('request')
		},
		select(value: iSelectedMonth) {
			this.$emit('selected', value)
		},
	},
	emits: ['selected', 'today', 'request'],
})
</script>

<template>
	<ActionMenu
		:colors='colors'
	>
		<LabelButton
			label='Richiedi'
			height='100%'

			:colors='colors'

			@action='request'
		/>
		<LabelButton
			label='Oggi'
			height='100%'

			:colors='colors'

			@action='today'
		/>
		<SelectButton
			ref='selectButton'


			:options='options'
			:colors='colors'
			:defaultValue='selected'

			@selected='select'
		/>
	</ActionMenu>
</template>