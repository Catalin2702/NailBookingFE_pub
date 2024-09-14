<script lang='ts'>
import {defineComponent} from 'vue'

import {iEventData} from '@/utils/interfaces'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateLogin',
	extends: TemplatePopup,
	components: {TemplatePopup},
	methods: {
		sendLogin() {
			const data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}

			this.$emit('action', {
				action: 'login',
				params: data.value,
			} as iEventData)
		},
		sendForgotPassword() {
			this.$emit('action', {
				action: 'openForgotPassword',
				params: {}
			} as iEventData)
		},
		toggle() {
			this.$emit('toggle')
		},
	},
	emits: ['action', 'toggle',]
})
</script>