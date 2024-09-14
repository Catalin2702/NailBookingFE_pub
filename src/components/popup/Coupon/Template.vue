<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iCouponData} from '@/utils/interfaces'
import {defaultCouponData} from '@/utils/default'

const CircleButton = defineAsyncComponent(() => import('@/components/buttons/Circle.vue'))

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateCoupon',
	extends: TemplatePopup,
	components: {
		TemplatePopup,
		CircleButton,
	},
	props: {
		defaultData: {
			type: Object as () => iCouponData,
			default: defaultCouponData,
		},
		max: {
			type: Number,
			default: 8,
		},
		lines: {
			type: Number,
			default: 2,
		},
	},
	computed: {
		text() {
			return String(Math.floor(this.defaultData.discount)) + '%'
		}
	},
})
</script>