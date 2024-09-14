<script lang='ts'>
import {defineComponent} from 'vue'

import {iColors} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'

export default defineComponent({
	name: 'ActionMenu',
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
	}
})
</script>

<template>
	<div
		class='ActionMenu'

		:style='{backgroundColor: colors.secondary}'
	>
		<slot/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/nav/Action';
</style>