<script lang='ts'>
import {defineComponent} from 'vue'

import Template from '@/components/popup/structure/PopupTemplate.vue'
export default defineComponent({
	name: 'WarningPopup',
	extends: Template,
	components: {Template},
})
</script>

<template>
	<Template
		titleSize='1.5rem'

		:colors='colors'
		:title='title'
		:closeButton='closeButton'

		@close='closePopup'
	/>
</template>

<style scoped lang='scss'>
.title {
	font-size: 5em;
}
</style>