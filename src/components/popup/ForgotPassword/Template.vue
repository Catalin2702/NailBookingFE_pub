<script lang='ts'>
import {defineComponent} from 'vue'

import {iEventData} from '@/utils/interfaces'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateForgotPassword',
	extends: TemplatePopup,
	components: {TemplatePopup},
	methods: {
		sendForgotPassword() {
			const data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			this.$emit('action', {
				action: 'forgotPassword',
				params: data.value,
			} as iEventData)
		}
	},
	emits: ['action',]
})
</script>