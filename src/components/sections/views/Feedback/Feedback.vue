<script lang='ts'>
import {defineComponent} from 'vue'
import {iColors, iFeedback} from '@/utils/interfaces'
import {defaultFeedback} from '@/utils/default'
import {checkString} from '@/utils/functions'
import RatingForm from '@/components/forms/inputs/Rating.vue'
import {Dark} from '@/utils/palette'

export default defineComponent({
	name: 'FeedbackSection',
	components: {RatingForm},
	props: {
		feedback: {
			type: Array as () => iFeedback[],
			default: () => [defaultFeedback],
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		}
	},
	computed: {
		checkString: () => checkString,
		alpha: () => .6,
	},
	methods: {
		selectFeedback(index: number,) {
			this.$emit('select', {index})
		},
	},
	emits: ['select'],
})
</script>

<template>
	<div
		class='SectionContainer'
	>
		<div
			v-if='feedback.length > 0 && feedback[0]?.id !== -1'
			class='FeedbackContainer'
		>
			<div
				class='item'

				v-for='(item, index) in feedback'
				:key='index'

				:style='{
					border: `.5px solid ${colors.text.toRGBA(alpha)}`,
				}'

				@click='selectFeedback(index)'
			>

				<div
					class='title'

					v-if='checkString(String(item?.title))'

					:style='{
						color: colors.tertiary,
					}'
				>
					{{ item?.title }}
				</div>
				<RatingForm
					:defaultValue='item.rating'
					readOnly
				/>
				<div
					class='description'

					v-if='checkString(String(item?.description))'

					:style='{
						color: colors.text,
					}'
				>
					{{ item?.description }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/sections/views/Feedback/Common';
</style>