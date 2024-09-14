<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iButtons} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Device, Justify, Theme} from '@/utils/constants'
import {defaultButtons} from '@/utils/default'

import StructureContainer from '@/components/popup/structure/Container.vue'

const CircleLoader = defineAsyncComponent(() => import('@/components/loaders/Circle.vue'))
const LineForm = defineAsyncComponent(() => import('@/components/forms/structures/Line.vue'))
const CloseButton = defineAsyncComponent(() => import('@/components/buttons/Close.vue'))
export default defineComponent({
	name: 'StructurePopup',
	computed: {
		Justify: () => Justify,
		Theme: () => Theme,
	},
	components: {
		CircleLoader,
		CloseButton,
		LineForm,
		StructureContainer,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		title: {
			type: String,
			default: '',
		},
		fontSize: {
			type: String,
			default: '1rem',
		},
		classes: {
			type: Array as () => string[],
			default: new Array(''),
		},
		closeButton: {
			type: Boolean,
			default: false,
		},
		width: {
			type: String,
			default: '',
		},
		height: {
			type: String,
			default: '',
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		buttons: {
			type: Object as () => iButtons,
			default: defaultButtons
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
	},
	emits: ['close', 'action'],
})
</script>

<template>
	<StructureContainer
		:colors='colors'
		:buttons='buttons'
		:device='device'

		@close='$emit("close")'
		@action='$emit("action", $event)'
	>
		<div
			class='popupStructure'

			:class='classes.join(" ")'
			:style='{width: width, height: height}'
		>
			<CloseButton
				v-if='closeButton'

				top='5px'
				right='5px'

				:colors='colors'
				@close='$emit("close")'
			/>
			<LineForm
				style='
					width: 90%;
					margin: 5px auto 0 auto;
					text-align: center;
				'
				v-if='title !== "" && !isLoading'

				:lineType='Justify.Center'
				:style='{
					color: colors.tertiary,
					fontSize: fontSize,
				}'
			>
				{{title}}
			</LineForm>
			<slot
				v-if='!isLoading'
				style='overflow-y: scroll'
			/>
			<div
				class='LoaderContainer'
				v-else
			>
				<CircleLoader
					:colors='colors'
				/>
			</div>
		</div>
	</StructureContainer>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/popup/structure/Popup';
.v-enter-active, .v-leave-active {
	transition: opacity 0.3s ease-in-out;
	opacity: 1;
}

.v-enter-from, .v-leave-to {
	transition: opacity 0.3s ease-in-out;
	opacity: 0;
}
</style>