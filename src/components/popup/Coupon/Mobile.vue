<script lang='ts'>
import {defineComponent} from 'vue'

import TemplateCoupon from '@/components/popup/Coupon/Template.vue'
export default defineComponent({
	name: 'MobileCoupon',
	extends: TemplateCoupon
})
</script>

<template>
	<TemplatePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='isLoading'

		@close='$emit("close")'
	>
		<LineForm
			:lineType='Justify.Center'
		>
			<CircleButton
				:lines='lines'
				:colors='colors'
				:num='defaultData.count'
				:max='max'
				:text='text'
				:textPosition='max'
			/>
		</LineForm>
	</TemplatePopup>
</template>
