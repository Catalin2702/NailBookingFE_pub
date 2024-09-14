<script lang='ts'>
import {defineComponent} from 'vue'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'
import {Role, Roles} from '@/utils/constants'
import {iUserUpdateData} from "@/utils/interfaces";
import {defaultUserUpdateData} from "@/utils/default";

export default defineComponent({
	name: 'TemplateUserUpdate',
	extends: PopupTemplate,
	components: {PopupTemplate},
	props: {
		user: {
			type: Object as () => iUserUpdateData,
			default: defaultUserUpdateData,
		}
	},
	computed: {
		forms: () => (
			{
				name: {
					placeholder: 'Nome',
					label: 'name',
					value: '',
				},
				surname: {
					placeholder: 'Cognome',
					label: 'surname',
					value: '',
				},
				email: {
					placeholder: 'Email',
					label: 'email',
					value: '',
				},
				role: {
					placeholder: 'Ruolo',
					label: 'role',
					value: {
						selected: Role.Guest,
						options: Roles
					}
				},
				birthday: {
					placeholder: 'Data',
					label: 'birthday',
					value: new Date(),
				},
				instagram: {
					placeholder: 'Instagram',
					label: 'instagram',
					value: '',
				},
				phone: {
					placeholder: 'Telefono',
					label: 'phone',
					value: '',
				},
				coupon: {
					discount: {
						placeholder: 'Sconto',
						label: 'discount',
						value: '',
					},
					count: {
						placeholder: 'Punti',
						label: 'count',
						value: '',
					},
				},
				internalNote: {
					placeholder: 'Note interne',
					label: 'internalNote',
					value: '',
				},
			}
		),
		formButtons: () => (
			{
				edit: 'Modifica',
				save: 'Salva',
				cancel: 'Annulla',
			}
		),
	},
	data: () => (
		{
			editMode: false,
		}
	),
	methods: {
		toggleEditMode() {
			this.editMode = !this.editMode
		},
		edit() {
			const data = this.getDataForm({
				...this.user,
				...this.user.coupon
			})
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			this.$emit('edit', {
				...data.value,
				id: this.user.id
			})
		},
	},
	emits: ['edit'],
})
</script>