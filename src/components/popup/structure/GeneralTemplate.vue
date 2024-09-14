<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors, iMessageContent,} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Device, Errors, NoAuth, Role} from '@/utils/constants'

import PopupTemplate from '@/components/popup/structure/PopupTemplate.vue'

export default defineComponent({
	name: 'GeneralTemplate',
	extends: PopupTemplate,
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		closeButton: {
			type: Boolean,
			default: true,
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
		role: {
			type: Number,
			default: Role.Guest,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		}
	},
	computed: {
		Device: () => Device,
		Role: () => Role,
		NoAuth: () => NoAuth,
		Errors: () => Errors,
	},
	methods: {
		close() {
			this.$emit('close')
		},
		sendError(error: iMessageContent) {
			this.$emit('error', error)
		},
	},
	emits: ['close', 'error'],
})
</script>