<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import {iSection, iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultSection} from '@/utils/default'
import {HomeViewTypes} from '@/utils/constants'

import {Skeletor} from 'vue-skeletor'
import {checkStringArray} from '@/utils/functions'

const LinkButton = defineAsyncComponent(() => import('@/components/buttons/Link.vue'))
const BeforeAfter = defineAsyncComponent(() => import('@/components/images/BeforeAfter.vue'))
const Carousel = defineAsyncComponent(() => import('@/components/images/Carousel.vue'))
const Image = defineAsyncComponent(() => import('@/components/images/Image.vue'))

const regex = /\$(.*?)\$/
export default defineComponent({
	name: 'TemplateSection',
	components: {LinkButton, BeforeAfter, Carousel, Skeletor, Image},
	props: {
		section: {
			type: Object as () => iSection,
			default: defaultSection,
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	},
	data() {
		return {
			customDescription: this.section.description.split('$')[0],
			labelButton: '',
			link: '',
		}
	},
	computed: {
		ViewType: () => HomeViewTypes,
		checkStringArray: () => checkStringArray,
	},
	methods: {
		extractLink() {
			const match = this.section.description.match(regex)
			if (match) {
				this.labelButton = match[1].split('|')[0]
				this.link = match[1].split('|')[1]
			}
		}
	},
	watch: {
		section() {
			this.customDescription = this.section.description.split('$')[0]
			this.extractLink()
		}
	},
	mounted() {
		this.extractLink()
	}
})
</script>