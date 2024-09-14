<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iUserData} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultUsersData} from '@/utils/default'
import {Input, Justify} from '@/utils/constants'
import {checkString} from "@/utils/functions";

const ListSection = defineAsyncComponent(() => import('@/components/sections/container/List.vue'))
const LineSection = defineAsyncComponent(() => import('@/components/forms/structures/Line.vue'))
const InputForm = defineAsyncComponent(() => import('@/components/forms/inputs/Input.vue'))
const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const CircleLoader = defineAsyncComponent(() => import('@/components/loaders/Circle.vue'))

export default defineComponent({
	name: 'TemplateUserSection',
	components: {ListSection, LineSection, InputForm, SvgButton, CircleLoader},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		user: {
			type: Object as () => iUserData,
			default: defaultUsersData,
		}
	},
	computed: {
		Input: () => Input,
		Justify: () => Justify,
		checkString: () => checkString,
	},
	data() {
		return {
			icons: {
				edit: 'edit',
				arrow: 'arrow_r',
			},
			showDetails: false,
			loadingDetails: false,
		}
	},
	methods: {
		editUser() {
			this.$emit('edit')
		},
		getUserDetails() {
			this.loadingDetails = true
			this.$emit('getDetails')
		},
		toggleDetails() {
			this.showDetails = !this.showDetails
			if (!checkString(this.user?.email))
				this.getUserDetails()
		},
	},
	watch: {
		user: {
			handler: function() {
				if (checkString(this.user?.email)) {
					this.loadingDetails = false
				}
				else {
					// pass
				}
			},
			deep: true,
		}
	},
	emits: ['edit', 'getDetails'],
})
</script>
