<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

const Svg = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
export default defineComponent({
	name: 'RatingForm',
	components: {Svg},
	props: {
		max: {
			type: Number,
			default: 5,
		},
		defaultValue: {
			type: Number,
			default: 1,
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			value: 0,
			showValue: 0,
		}
	},
	methods: {
		setRating(index: number) {
			if (this.readOnly)
				return
			this.value = index
			this.showValue = index
		},
		setHover(index: number) {
			if (this.readOnly)
				return
			this.showValue = index
		},
	},
	mounted() {
		this.value = this.defaultValue
		this.showValue = this.defaultValue
	},
	watch: {
		defaultValue() {
			this.value = this.defaultValue
			this.showValue = this.defaultValue
		}
	},
	emits: ['rating'],
})
</script>

<template>
	<div
		class='RatingContainer'
	>
		<div
			:style='{
				cursor: readOnly ? "default" : "pointer"
			}'

			v-for='index in max'
			:key='index'

			@click='setRating(index)'
			@mouseover='setHover(index)'
			@mouseleave='setHover(this.value)'
		>
			<Svg
				:icon='showValue >= index ? "star_filled" : "star_unfilled"'
				:effect='!readOnly'
			/>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/forms/inputs/Rating';
</style>