<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'
import {iBookingContent, iBookingManageForm} from '@/utils/interfaces'
import {defaultBookingContent} from '@/utils/default'
import {States} from '@/utils/constants'

const BookingSectionDesktop = defineAsyncComponent(() => import('@/components/sections/Booking/section/Desktop.vue'))
const BookingSectionMobile = defineAsyncComponent(() => import('@/components/sections/Booking/section/Mobile.vue'))
export default defineComponent({
	name: 'TemplateBookingManage',
	extends: PopupTemplate,
	components: {BookingSectionDesktop, BookingSectionMobile, PopupTemplate},
	props: {
		bookings: {
			type: Array as () => iBookingContent[],
			default: () => [defaultBookingContent],
		},
		params: {
			type: Object as () => iBookingManageForm,
			default: () => ({}),
		},
	},
	data() {
		return {
			allStates: [
				{value: 'all', label: 'Tutti'},
				...States
			],
			form: {
				dateFrom: {
					placeholder: 'Da',
					label: 'date_from',
					value: this.params?.date_from ? new Date(String(this.params.date_from)) : new Date()
				},
				dateTo: {
					placeholder: 'A',
					label: 'date_to',
					value: this.params?.date_to ? new Date(String(this.params.date_to)) : new Date(new Date().setDate(new Date().getDate() + 7))
				},
				status: {
					placeholder: 'Stato',
					label: 'status',
					value: this.params?.status ? this.params.status : 'all',
				},
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
				search: {
					placeholder: 'Cerca',
					label: 'search',
					value: '',
				},
			} as iBookingManageForm,
			showAdvanced: false,
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
		editBooking(booking: iBookingContent) {
			this.$emit('edit', booking)
		},
		cancelBooking(booking: iBookingContent) {
			this.$emit('cancelBooking', booking)
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
		toggleAdvanced() {
			this.showAdvanced = !this.showAdvanced
		},
	},
	mounted() {
		this.setEvents()
	},
	beforeUnmount() {
		this.removeEvents()
	},
	emits: ['search', 'edit', 'cancelBooking']
})
</script>