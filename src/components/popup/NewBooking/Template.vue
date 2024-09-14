<script lang='ts'>
import {defineComponent} from 'vue'

import TemplatePopup from '@/components/popup/structure/PopupTemplate.vue'
import {iObject} from '@/utils/interfaces'
import {Input} from '@/utils/constants'

export default defineComponent({
	name: 'TemplateNewBookingPopup',
	extends: TemplatePopup,
	components: {
		TemplatePopup,
	},
	props: {
		params: {
			type: Object as () => iObject,
			default: () => ({}),
		}
	},
	computed: {
		form: () => ({
			date: {
				title: 'Data',
				type_: Input.Date,
				label: 'date',
				value: new Date().toISOString().split('T')[0],
			},
			start: {
				title: 'Inizio',
				type_: Input.Time,
				label: 'start',
				value: '00:00',
			},
			end: {
				title: 'Fine',
				type_: Input.Time,
				label: 'end',
				value: '00:00',
			},
		})
	},
	methods: {
		createBooking() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value['start'] >= data.value['end']) {
				this.sendError('L\'orario di inizio deve essere precedente a quello di fine')
				return
			}
			this.$emit('createBooking', {
				start: data.value['start'],
				end: data.value['end'],
				date: this.params.date,
			})
		},
		requestBooking() {
			let data = this.getDataForm()
			if (!data.status) {
				this.sendError(data.error)
				return
			}
			if (data.value['start'] >= data.value['end']) {
				this.sendError('L\'orario di inizio deve essere precedente a quello di fine')
				return
			}
			this.$emit('requestBooking', {
				start: data.value['start'],
				end: data.value['end'],
				date: data.value['date'],
				note: data.value['note'],
			})
		}
	},
	emits: ['createBooking', 'requestBooking'],
})
</script>