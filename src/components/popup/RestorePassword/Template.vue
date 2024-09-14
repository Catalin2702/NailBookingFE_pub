<script lang='ts'>
import {defineComponent} from 'vue'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateRestorePassword',
	extends: TemplatePopup,
	components: {TemplatePopup},
	computed: {
		form: () => ({
			newPassword: {
				placeholder: 'Nuova password',
				label: 'newPassword',
			},
			confirmPassword: {
				placeholder: 'Conferma password',
				label: 'confirmPassword',
			},
		}),
		formButtons: () => ({
			send: 'Invia',
			cancel: 'Annulla',
		}),
	},
	methods: {
		restorePassword() {
			const data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value['newPassword'] !== data.value['confirmPassword']) {
				this.sendError('Le password non coincidono')
				return
			}
			if (data.value['newPassword'].length < 8) {
				this.sendError(`La password deve essere lunga almeno ${this.minPasswordLength} caratteri`)
				return
			}
			this.$emit('action', {
				action: 'restorePassword',
				params: data.value,
			})
		}
	},
	emits: ['action'],
})
</script>