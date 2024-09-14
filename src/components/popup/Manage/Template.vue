<script lang='ts'>
import {defineComponent} from 'vue'

import {iProfile} from '@/utils/interfaces'
import {defaultProfile} from '@/utils/default'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateManage',
	extends: TemplatePopup,
	components: {
		TemplatePopup,
	},
	props: {
		defaultData: {
			type: Object as () => iProfile,
			default: defaultProfile,
		},
	},
	data() {
		return{
			readOnly: true,
			loading: this.defaultData.name === '',
		}
	},
	methods: {
		sendUpdate() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value['password'] !== '') {
				if (String(data.value['password']).length < this.minPasswordLength) {
					this.sendError(`La password deve essere lunga almeno ${this.minPasswordLength} caratteri`)
					return
				}
				if (data.value['password'] !== data.value['confirmPassword']) {
					this.sendError(`Le password non coincidono`)
					return
				}
			}
			this.$emit('action', {
				action: 'update',
				params: data.value,
			})
		},
		sendDelete() {
			this.$emit('action', {
				action: 'delete',
				params: {},
			})
		},
		sendLogout() {
			this.$emit('action', {
				action: 'logout',
				params: {},
			})
		},
	},
	watch: {
		defaultData() {
			this.loading = false
		}
	},
	emits: ['action',],
})
</script>