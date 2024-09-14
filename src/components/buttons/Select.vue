<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {iSelectedMonth} from '@/utils/interfaces'
import {defaultSelectMonthOptions} from '@/utils/default'
import {fill} from '@/utils/functions'
export default defineComponent({
	name: 'SelectButton',
	props: {
		options: {
			type: Array as () => iSelectedMonth[],
			default: defaultSelectMonthOptions,
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		width: {
			type: String,
			default: '100px'
		},
		height: {
			type: String,
			default: '100%'
		},
		defaultValue: {
			type: Object as () => iSelectedMonth,
			default: defaultSelectMonthOptions[0],
		},
	},
	data() {
		return{
			selected: this.defaultValue,
		}
	},
	computed: {
		fill: () => fill,
	},
	methods: {
		setToday() {
			this.selected = this.findToday()
		},
		findToday() {
			return this.options.find((option) => option.today) as iSelectedMonth
		}
	},
	watch: {
		selected(newValue: iSelectedMonth, oldValue: iSelectedMonth) {
			if (newValue.year !== oldValue.year || newValue.month !== oldValue.month || newValue.today !== oldValue.today) {
				this.$emit('selected', this.selected)
			}
		},
		defaultValue() {
			this.selected = this.defaultValue
		}
	},
	mounted() {
		this.selected = this.defaultValue
	},
	emits: ['selected'],
})
</script>

<template>
	<div
		class='selectContainer'

		:style='{
			width: this.width,
			height: this.height,
		}'
	>
		<select
			id='selectMonth'

			v-if='selected.year && selected.month'
			v-model='selected'

			:style='{
				width: this.width,
				height: this.height,
				color: this.colors.primary,
				backgroundColor: this.colors.tertiary
			}'
			>
			<option
				v-for='option in this.options'

				:key='option' :value='option'
			>
				{{fill(option.month)}}-{{option.year}}
			</option>
		</select>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/buttons/Select';
</style>