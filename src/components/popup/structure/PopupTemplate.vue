<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iButtons, iObject} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Align, BirthdayDefault, Device, Input, Justify, minPasswordLength, Role, States, Status, Theme} from '@/utils/constants'
import {checkObject, getDataForm} from '@/utils/functions'
import {defaultButtons} from '@/utils/default'

import StructurePopup from '@/components/popup/structure/Popup.vue'

const InputForm = defineAsyncComponent(() => import('@/components/forms/inputs/Input.vue'))
const LabelForm = defineAsyncComponent(() => import('@/components/buttons/Label.vue'))
const LineForm = defineAsyncComponent(() => import('@/components/forms/structures/Line.vue'))
const ListForm = defineAsyncComponent(() => import('@/components/forms/structures/List.vue'))
const LabelButton = defineAsyncComponent(() => import('@/components/buttons/Label.vue'))
const TextButton = defineAsyncComponent(() => import('@/components/buttons/Text.vue'))
const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const CircleLoader = defineAsyncComponent(() => import('@/components/loaders/Circle.vue'))
/* eslint-disable vue/no-unused-components */
export default defineComponent({
	name: 'TemplatePopup',
	components: {
		LabelForm,
		LineForm,
		ListForm,
		InputForm,
		StructurePopup,
		LabelButton,
		TextButton,
		SvgButton,
		CircleLoader,
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
		closeButton: {
			type: Boolean,
			default: true,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		classes: {
			type: Array as () => string[],
			default: new Array(''),
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
		titleSize: {
			type: String,
			default: '1.5rem',
		},
		role: {
			type: Number,
			default: Role.Guest,
		},
		width: {
			type: String,
		},
		height: {
			type: String,
		},
		buttons: {
			type: Object as () => iButtons,
			default: defaultButtons
		}
	},
	computed: {
		Input: () => Input,
		Justify: () => Justify,
		Align: () => Align,
		Role: () => Role,
		Theme: () => Theme,
		Device: () => Device,
		Status: () => Status,
		States: () => States,
		birthdayDefault: () => BirthdayDefault,
		minPasswordLength: () => minPasswordLength,
		noAuth: () => [Role.Guest, Role.Anon],
	},
	data() {
		return{
			inputs: [] as InstanceType<typeof InputForm>[]
		}
	},
	methods: {
		input(el: InstanceType<typeof InputForm>) {
			if (!checkObject(el)) return
			this.inputs.push(el)
		},
		removeInput(label: string) {
			const el = this.inputs.find((el) => el.label === label)
			if (!el) return
			const index = this.inputs.indexOf(el)
			if (index > -1) {
				this.inputs.splice(index, 1)
			}
		},
		getDataForm(defaults: iObject | null = null) {
			return getDataForm(this.inputs, defaults)
		},
		sendError(error: string) {
			this.$emit('error', {
				show: true,
				message: error,
				status: false,
			})
		},
		closePopup() {
			this.$emit('close')
		},
	},
	emits: ['close', 'error', 'action'],
})
</script>
<template>
	<StructurePopup
		:colors='colors'
		:title='title'
		:closeButton='closeButton'
		:isLoading='isLoading'
		:classes='classes'
		:fontSize='titleSize'
		:width='width'
		:height='height'
		:buttons='buttons'
		:device='device'

		@close='closePopup'
		@action='$emit("action", $event)'
	>
		<slot/>
	</StructurePopup>
</template>