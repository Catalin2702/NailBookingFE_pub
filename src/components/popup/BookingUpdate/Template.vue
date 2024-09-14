<script lang='ts'>
import {defineComponent} from 'vue'

import {iObject, iBookingContent} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'
import {Role} from '@/utils/constants'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'TemplateBookingUpdate',
	extends: PopupTemplate,
	components: {PopupTemplate},
	props: {
		booking: {
			type: Object as () => iBookingContent,
			default: defaultBookingContent,
		},
		isViewOnly: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return{
			readOnly: {
				notAdmin: this.role !== Role.Admin,
				all: this.isViewOnly,
			}
		}
	},
	methods: {
		editBooking(data: iObject) {
			this.$emit('editBooking', data)
		},
		update() {
			let data = this.getDataForm(this.booking)
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value === {}) return
			data.value['id'] = this.booking.id
			this.editBooking(data.value)
		},
	},
	watch: {
		role() {
			this.readOnly.notAdmin = this.role !== Role.Admin
		}
	},
	emits: ['editBooking'],
})
</script>
