<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iCouponData} from '@/utils/interfaces'
import {defaultCouponData} from '@/utils/default'

import WarningPopup from '@/components/popup/Warning.vue'
import GeneralTemplate from '@/components/popup/structure/GeneralTemplate.vue'
import {Errors} from '@/utils/constants'

const DesktopCoupon = defineAsyncComponent(() => import('@/components/popup/Coupon/Desktop.vue'))
const MobileCoupon = defineAsyncComponent(() => import('@/components/popup/Coupon/Mobile.vue'))
export default defineComponent({
	name: 'GeneralCoupon',
	computed: {
		Errors() {
			return Errors
		}
	},
	extends: GeneralTemplate,
	components: {
		WarningPopup,
		DesktopCoupon,
		MobileCoupon
	},
	props: {
		defaultData: {
			type: Object as () => iCouponData,
			default: defaultCouponData,
		},
		backgroundImage: {
			type: String,
			default: '',
		},
		max: {
			type: Number,
			default: 8,
		},
		title: {
			type: String,
			default: '',
		},
		lines: {
			type: Number,
			default: 2,
		},
	},
})
</script>

<template>
	<WarningPopup
		v-if='NoAuth.includes(role)'
		:title='Errors.NoUser.Coupon'

		:colors='colors'

		@close='close'
	/>
	<DesktopCoupon
		v-else-if='device === Device.Desktop'

		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:defaultData='defaultData'
		:backgroundImage='backgroundImage'
		:max='max'
		:lines='lines'
		:isLoading='isLoading'

		@close='close'
	/>
	<MobileCoupon
		v-else

		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:defaultData='defaultData'
		:backgroundImage='backgroundImage'
		:max='max'
		:lines='lines'
		:isLoading='isLoading'

		@close='close'
	/>
</template>