<script lang='ts'>
import {defineComponent} from 'vue'

import {iBookingContent} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'
import {getDifference, checkString} from '@/utils/functions'
import {Role, Status} from '@/utils/constants'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateBookingPopup',
	extends: TemplatePopup,
	components: {TemplatePopup},
	props: {
		defaultBooking: {
			type: Object as () => iBookingContent,
			default: defaultBookingContent,
		},
	},
	computed: {
		checkString: () => checkString,
	},
	data() {
		return {
			loading: this.defaultBooking.id === -1,
			readOnly: {
				all: true,
				admin: true,
				data: this.defaultBooking.status !== Status.FREE,
			},
		}
	},
	methods: {
		sendBooking() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			data.value = {
				...data.value,
				id: this.defaultBooking.id,
			}
			this.$emit('sendBooking', data.value)
		},
		editMode(mode: boolean) {
			mode = !mode
			this.readOnly = {
				all: mode,
				admin: this.role === Role.Admin ? mode : this.readOnly.admin,
				data: mode,
			}
		},
		editBooking() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			data.value = getDifference(data.value, this.defaultBooking)
			if (Object.entries(data.value).length === 0) {
				this.sendError('Non ci sono modifiche da salvare')
				return
			}
			data.value['id'] = this.defaultBooking.id
			this.$emit('editBooking', data.value)
		},
		deleteBooking() {
			this.$emit('deleteBooking', this.defaultBooking)
		},
		cancelBooking() {
			this.$emit('cancelBooking', this.defaultBooking)
		},
		acceptBooking() {
			this.$emit('acceptBooking', this.defaultBooking)
		},
		confirmBooking() {
			this.$emit('confirmBooking', this.defaultBooking)
		},
	},
	watch: {
		defaultBooking() {
			this.readOnly.data = this.defaultBooking.status !== Status.FREE
			this.loading = this.defaultBooking.id === -1
		}
	},
	emits: ['sendBooking', 'editBooking', 'deleteBooking', 'cancelBooking', 'acceptBooking', 'confirmBooking'],
})
</script>