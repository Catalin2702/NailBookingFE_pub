<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iBookingContent, iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultBookingContent} from '@/utils/default'
import {Input, States, Justify, Status} from '@/utils/constants'

const ListSection = defineAsyncComponent(() => import('@/components/sections/container/List.vue'))
const LineSection = defineAsyncComponent(() => import('@/components/forms/structures/Line.vue'))
const InputForm = defineAsyncComponent(() => import('@/components/forms/inputs/Input.vue'))
const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
export default defineComponent({
	name: 'TemplateBookingSection',
	components: {
		ListSection,
		LineSection,
		InputForm,
		SvgButton,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		booking: {
			type: Object as () =>iBookingContent,
			default: defaultBookingContent,
		}
	},
	computed: {
		Input: () => Input,
		States: () => States,
		Justify: () => Justify,
		Dark: () => Dark,
		noValidStates: () => [Status.PAUSED, Status.FREE],
		nonErasableStates: () => [Status.CANCELLED, Status.COMPLETED, Status.FREE, Status.PAUSED],
	},
	data() {
		return {
			missingDays: 0,
			icons: {
				edit: 'edit',
				cancel: 'cancel',
				arrow: 'arrow_r',
			},
			showDetails: false,
		}
	},
	methods: {
		calcMissingDays(booking: iBookingContent) {
			const date = new Date(`${booking.date} ${booking.start}`)
			const today = new Date()
			return Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24))
		},
		editBooking() {
			this.$emit('edit', this.booking)
		},
		cancelBooking() {
			this.$emit('cancelBooking', this.booking)
		},
		toggleDetails() {
			this.showDetails = !this.showDetails
		},
	},
	watch: {
		booking() {
			this.missingDays = this.calcMissingDays(this.booking)
		}
	},
	mounted() {
		this.missingDays = this.calcMissingDays(this.booking)
	},
	emits: ['edit', 'cancelBooking'],
})
</script>