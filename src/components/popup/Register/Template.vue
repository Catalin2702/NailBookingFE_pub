<script lang='ts'>
import {defineComponent} from 'vue'

import {iEventData} from '@/utils/interfaces'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateRegister',
	extends: TemplatePopup,
	components: {TemplatePopup},
	methods: {
		sendRegister() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if(String(data.value['password']).length < this.minPasswordLength) {
				this.sendError(`La password deve essere lunga almeno ${this.minPasswordLength} caratteri`)
				return
			}
			if (data.value['password'] !== data.value['confirmPassword']) {
				this.sendError(`Le password non coincidono`)
				return
			}
			this.$emit('action', {
				action: 'register',
				params: data.value,
			} as iEventData)
		}
	},
	emits: ['action', 'toggle'],
})
</script>