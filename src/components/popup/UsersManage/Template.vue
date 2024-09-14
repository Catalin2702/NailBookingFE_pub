<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iObject, iUserData} from '@/utils/interfaces'
import {defaultUsersData} from '@/utils/default'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'

const DesktopUserSection = defineAsyncComponent(() => import('@/components/sections/User/section/Desktop.vue'))
const MobileUserSection = defineAsyncComponent(() => import('@/components/sections/User/section/Mobile.vue'))

export default defineComponent({
	name: 'TemplateUsersManage',
	extends: PopupTemplate,
	components: {PopupTemplate, DesktopUserSection, MobileUserSection},
	props: {
		users: {
			type: Array as () => iUserData[],
			default: () => [defaultUsersData]
		},
		params: {
			type: Object as () => iObject,
			default: () => ({})
		}
	},
	data() {
		return {
			showAdvanced: false,
		}
	},
	computed: {
		forms: function() {
			return {
				name: {
					placeholder: 'Nome',
					label: 'name',
					value: this.params?.name ? this.params.name : '',
				},
				surname: {
					placeholder: 'Cognome',
					label: 'surname',
					value: this.params?.surname ? this.params.surname : '',
				},
				email: {
					placeholder: 'Email',
					label: 'email',
					value: this.params?.email ? this.params.email : '',
				},
				birthday: {
					placeholder: 'Data',
					label: 'birthday',
					value: this.params?.birthday ? new Date(String(this.params.birthday)) : new Date(),
				},
				instagram: {
					placeholder: 'Instagram',
					label: 'instagram',
					value: this.params?.instagram ? this.params.instagram : '',
				},
				phone: {
					placeholder: 'Telefono',
					label: 'phone',
					value: this.params?.phone ? this.params.phone : '',
				},
				search: {
					placeholder: 'Cerca',
					label: 'search',
					value: '',
				},
			}
		}
	},
	methods: {
		search() {
			const data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			this.$emit('search', data.value)
		},
		toggleAdvanced() {
			this.showAdvanced = !this.showAdvanced
		},
		editUser(id: number) {
			this.$emit('edit', id)
		},
		getDetails(id: number) {
			this.$emit('getDetails', id)
		},
		setEvents() {
			window.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					this.search()
				}
			})
		},
		removeEvents() {
			window.removeEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					this.search()
				}
			})
		},
	},
	mounted() {
		this.setEvents()
	},
	beforeUnmount() {
		this.removeEvents()
	},
	emits: ['search', 'edit', 'getDetails'],
})
</script>
