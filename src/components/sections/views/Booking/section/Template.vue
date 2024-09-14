<script lang='ts'>
import {defineComponent} from 'vue'

import {Dark, BookingPalette} from '@/utils/palette'
import {iCalendar, iBookingContent, iColors} from '@/utils/interfaces'
import {defaultCalendar} from '@/utils/default'
import {Role, Theme, Status} from '@/utils/constants'
export default defineComponent({
	name: 'TemplateSection',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		date: {
			type: Object as () => iCalendar,
			default: defaultCalendar,
		},
		today: {
			type: Boolean,
			default: false,
		},
		role: {
			type: Number,
			default: Role.Guest,
		},
		currentMonth: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			id: this.date.y.toString() + this.date.m.toString().padStart(2, '0') + this.date.d.toString().padStart(2, '0'),
		}
	},
	computed: {
		Theme: () => Theme,
		Role: () => Role,
		Dark: () => Dark,
		alpha: () => .3,
		splitBooking() {
			let res = []
			if (this.date?.r)
				for (let i = 0; i < this.date.r.length; i+=2) {
					res.push(this.date.r.slice(i, i + 2))
				}
			return res
		},
	},
	methods: {
		setBackground(booking: iBookingContent): string {
			switch (booking.status) {
				case Status.FREE:
					return String(BookingPalette.free)
				case Status.PENDING:
					return String(BookingPalette.pending)
				case Status.BOOKED:
					return String(BookingPalette.booked)
				case Status.CONFIRMED:
					return String(BookingPalette.confirmed)
				case Status.CANCELLED:
					return String(BookingPalette.cancelled)
				case Status.COMPLETED:
					return String(BookingPalette.completed)
				case Status.PAUSED:
					return String(BookingPalette.paused)
				default:
					return String(BookingPalette.free)
			}
		},
		setColor(): string {
			return String(Dark.primary)
		},
		openBooking(booking: iBookingContent) {
			this.$emit('openBooking', booking.id)
		},
		openBookings() {
			if (this.role === Role.Admin)
				this.$emit('openBookings', this.date)
		},
	},
	emits: ['openBooking', 'createBooking', 'openBookings'],
})
</script>