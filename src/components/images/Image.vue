<script lang='ts'>
import {defineComponent} from 'vue'
import {getPublicUrl} from '@/supabase'

import {Skeletor} from 'vue-skeletor'
import {iOptions} from '@/utils/interfaces'
export default defineComponent({
	name: 'SingleImage',
	components: {Skeletor},
	props: {
		src: {
			type: String,
			default: '',
		},
		options: {
			type: Object as () => iOptions,
		},
		alt: {
			type: String,
			default: '',
		},
		style: {
			type: Object,
			default: () => ({}),
		},
		classes: {
			type: Array as () => string[],
			default: () => [''],
		},
		useStorage: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		getPublicUrl: () => getPublicUrl,
	},
	methods: {
		load(success: boolean) {
			this.$emit('load', success)
		}
	},
	data() {
		return {
			id: `img-${Math.random().toString(36)}`,
		}
	},
	emits: ['load'],
})
</script>

<template>
	<img
		v-if='src && src !== ""'

		:id='id'
		:src='useStorage ? getPublicUrl(src, options) : src'
		:alt='alt'
		:style='style'
		:class='classes.join(" ")'

		@load='load(true)'
		@error='load(false)'
	>
	<Skeletor
		v-else

		:style='style'
		:class='classes.join(" ")'
	/>
</template>
