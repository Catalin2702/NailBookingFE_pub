<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'
import {iDate, iBookingContent} from '@/utils/interfaces'
import {defaultDate, defaultBookingContent} from '@/utils/default'
import {checkArray} from "@/utils/functions"

const BookingSectionDesktop = defineAsyncComponent(() => import('@/components/sections/Booking/section/Desktop.vue'))
const BookingSectionMobile = defineAsyncComponent(() => import('@/components/sections/Booking/section/Mobile.vue'))
export default defineComponent({
	name: 'TemplateBookingRecap',
	extends: PopupTemplate,
	components: {BookingSectionDesktop, BookingSectionMobile, PopupTemplate},
	props: {
		bookings: {
			type: Array as () => iBookingContent[],
			default: () => [defaultBookingContent],
		},
		date: {
			type: Object as () => iDate,
			default: defaultDate,
		},
	},
	computed: {
		checkArray: () => checkArray,
	},
	data() {
		return{
			active: true,
			activeButton: 'Attivi',
			addButton: 'Aggiungi',
		}
	},
	methods: {
		editBooking(data: iBookingContent) {
			this.$emit('edit', data)
		},
		cancelBooking(data: iBookingContent) {
			this.$emit('cancelBooking', data)
		},
		sendActive() {
			this.active = !this.active
			this.activeButton = this.active ? 'Attivi' : 'Tutti'
			this.$emit('active', this.active)
		},
		newBooking() {
			const date = new Date(this.date.y, this.date.m -1, this.date.d)
			this.$emit('newBooking', date)
		}
	},
	emits: ['edit', 'cancelBooking', 'active', 'newBooking'],
})
</script>