<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iSelected, iColors} from '@/utils/interfaces'
import {Dark, Light} from '@/utils/palette'
import {defaultSelectOptions} from '@/utils/default'
import {Input, Justify, Theme} from '@/utils/constants'
import {checkString} from '@/utils/functions'

const Svg = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
export default defineComponent({
	name: 'InputForm',
	components: {
		Svg,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		type: {
			type: String,
			default: Input.Text
		},
		validator: {
			type: String,
			default: '',
		},
		required: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
		width: {
			type: String,
			default: '100%',
		},
		height: {
			type: String,
			default: '6vh',
		},
		defaultValue: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
		suggested: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Array as () => iSelected[],
			default: defaultSelectOptions,
		},
		align: {
			type: Number,
			default: Justify.Left
		},
		backgroundColor: {
			type: String,
			default: ''
		},
		textColor: {
			type: String,
			default: ''
		}
	},
	data() {
		return{
			value: '',
			hidden: true,
			alignString: '',
			id: `${this.label}-${String(Math.random()).slice(2)}`
		}
	},
	computed: {
		Theme: () => Theme,
		Input: () => Input,
		Dark: () => Dark,
		Light: () => Light,
		alpha: () => {
			return {
				border: .5,
				backgroundColor: 1,
			}
		},
		checkString: () => checkString,
		classes() {
			let classes = [];
			if (this.readOnly)
				classes.push('readOnly')
			if (this.colors.primary.toString() === Dark.primary.toString())
				classes.push('Dark')
			else
				classes.push('Light')
			return classes.join(' ')
		}
	},
	methods: {
		setHidden() {
			if (!this.readOnly) {
				this.hidden = !this.hidden
			}
		},
		setAlign() {
			switch (this.align) {
				case Justify.Left:
					this.alignString = 'start'
					break
				case Justify.Center:
					this.alignString = 'center'
					break
				case Justify.Right:
					this.alignString = 'end'
					break
				default:
					this.alignString = 'start'
					break
			}
		},
	},
	watch: {
		defaultValue() {
			this.value = this.defaultValue
		},
		align() {
			this.setAlign()
		}
	},
	mounted() {
		if(this.type === Input.Select)
			this.value = this.defaultValue
		else
			if(this.defaultValue !== '')
				this.value = this.defaultValue
		this.setAlign()
	},
	beforeUnmount() {
		this.$emit('destroy', this.label)
	},
})
</script>

<template>
	<fieldset
		class='formContainer'
		:style='{
			width, height,
			border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
			backgroundColor: checkString(backgroundColor) ? backgroundColor : colors.primary.toRGBA(alpha.backgroundColor),
		}'
	>
		<legend :style='{color: colors.text}'>
			{{placeholder + (required ? ' *' : '') + (suggested ? ' (consigliato)' : '')}}
		</legend>
		<textarea
			v-if='type === Input.Area'
			v-model='value'

			class='form TextArea'

			:id='id'
			:class='classes'
			:required='required'
			:readOnly='readOnly'

			:style='{
				color: checkString(textColor) ? textColor : colors.text,
				textAlign: alignString
			}'
		/>
		<select
			v-else-if='type === Input.Select'
			v-model='value'

			class='form Select'

			:id='id'
			:class='classes'
			:disabled='readOnly'
			:required='required'
			:style='{
				color: checkString(textColor) ? textColor : colors.text,
				textAlign: alignString
			}'
		>
			<option
				style='height: 100%; width: 100%;'
				v-for='option in options'
				:value='option.value'
				:key='option.value'
			>
				{{option.label}}
			</option>
		</select>
		<input
			v-else
			v-model='value'

			class='form Input'

			:id='id'
			:class='classes'
			:type='type === Input.Password ? (hidden ? Input.Password : Input.Text) : type'
			:required='required'
			:readOnly='readOnly'
			:style='{
				color: checkString(textColor) ? textColor : colors.text,
				textAlign: alignString,
			}'
			:autocomplete="type === Input.Password ? 'new-password current-password' : ''"
		>
		<div
			v-if='type === Input.Password'
			class='password'
		>
			<Svg
				:icon='hidden ? "lock" : "unlock"'
				@action='setHidden'
			/>
		</div>
		</fieldset>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/forms/inputs/Form';
</style>