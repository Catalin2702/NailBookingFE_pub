<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iColors, iButtons} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {defaultButtons} from '@/utils/default'
import {Buttons, Device} from '@/utils/constants'

const SvgButton = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
export default defineComponent({
	name: 'StructureContainer',
	components: {SvgButton},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		buttons: {
			type: Object as () => iButtons,
			default: defaultButtons,
		},
		device: {
			type: Number,
			default: Device.Desktop,
		}
	},
	data() {
		return {
			gesture: '',
		}
	},
	computed: {
		Buttons: () => Buttons,
		Device: () => Device,
		alpha: () => {
			return {
				backgroundColor: .5,
				border: .5,
			}
		}
	},
	methods: {
		close() {
			this.$emit('close')
		},
		click(event: MouseEvent) {
			const target = event.target as HTMLElement
			if (target.classList.contains('popupContainer'))
				this.close()
		},
		blockScroll(flag: boolean) {
			if (flag)
				document.body.style.overflow = 'hidden'
			else
				document.body.style.overflow = 'auto'
		},
		setEvent() {
			window.addEventListener('keydown', (event) => {
				switch (event.key) {
					case 'ArrowLeft':
						this.actionButton(Buttons.Left)
						break
					case 'ArrowUp':
						this.actionButton(Buttons.Top)
						break
					case 'ArrowRight':
						this.actionButton(Buttons.Right)
						break
					case 'ArrowDown':
						this.actionButton(Buttons.Bottom)
						break
					case 'Escape':
						this.close()
						break
				}
			})
		},
		removeEvent() {
			window.removeEventListener('keydown', (event) => {
				switch (event.key) {
					case 'ArrowLeft':
						this.actionButton(Buttons.Left)
						break
					case 'ArrowUp':
						this.actionButton(Buttons.Top)
						break
					case 'ArrowRight':
						this.actionButton(Buttons.Right)
						break
					case 'ArrowDown':
						this.actionButton(Buttons.Bottom)
						break
					case 'Escape':
						this.close()
						break
				}
			})
		},
		actionButton(button: number) {
			this.$emit('action', button)
		}
	},
	mounted() {
		this.blockScroll(true)
		this.setEvent()
	},
	beforeUnmount() {
		this.blockScroll(false)
		this.removeEvent()
	},
	emits: ['close', 'action'],
})
</script>

<template>
		<div
			class='popupContainer'

			@click='click($event)'
			@keyup.left='actionButton(Buttons.Left)'
			@keyup.up='actionButton(Buttons.Top)'
			@keyup.right='actionButton(Buttons.Right)'
			@keyup.down='actionButton(Buttons.Bottom)'
		>
			<div
				v-if='buttons?.left.icon !== ""'
				:style='{
					borderRadius: "50%",
					backgroundColor: colors.primary.toRGBA(alpha.backgroundColor),
					width: "2.5rem",
					height: "2.5rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginRight: device === Device.Desktop ? "1rem" : "-1.5rem",
					border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
					zIndex: 100,
				}'
			>
				<SvgButton
					v-if='true'
					:icon='buttons.left.icon'
					:size='buttons.left.size || "2rem"'
					:flipX='buttons.left.flipX'
					:flipY='buttons.left.flipY'
					:effect='buttons.left.effect'

					@action='actionButton(Buttons.Left)'
				/>
			</div>
			<div
				v-if='buttons?.top.icon !== ""'
				:style='{
					borderRadius: "50%",
					backgroundColor: colors.primary.toRGBA(alpha.backgroundColor),
					width: "2.5rem",
					height: "2.5rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "1rem",
					border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
					zIndex: 100,
				}'
			>
				<SvgButton
					v-if='true'
					:icon='buttons.top.icon'
					:size='buttons.top.size || "2rem"'
					:flipX='buttons.top.flipX'
					:flipY='buttons.top.flipY'
					:effect='buttons.top.effect'

					@action='actionButton(Buttons.Top)'
				/>
			</div>
			<div
				class='popup'

				:style='{
					backgroundColor: colors.primary.toRGBA(alpha.backgroundColor),
					color: colors.text,
					border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
				}'
			>
				<slot/>
			</div>
			<div
				v-if='buttons?.right.icon !== ""'

				:style='{
					borderRadius: "50%",
					backgroundColor: colors.primary.toRGBA(alpha.backgroundColor),
					width: "2.5rem",
					height: "2.5rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginLeft: device === Device.Desktop ? "1rem" : "-1.5rem",
					border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
					zIndex: 100,
				}'
			>
				<SvgButton
					v-if='true'
					:icon='buttons.right.icon'
					:size='buttons.right.size || "2rem"'
					:flipX='buttons.right.flipX'
					:flipY='buttons.right.flipY'
					:effect='buttons.right.effect'

					@action='actionButton(Buttons.Right)'
				/>
			</div>
			<div
				v-if='buttons?.bottom.icon !== ""'

				:style='{
					borderRadius: "50%",
					backgroundColor: colors.primary.toRGBA(alpha.backgroundColor),
					width: "2.5rem",
					height: "2.5rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "1rem",
					border: `.5px solid ${colors.secondary.toRGBA(alpha.border)}`,
					zIndex: 100,
				}'
			>
				<SvgButton
					v-if='true'
					:icon='buttons.bottom.icon'
					:size='buttons.bottom.size || "2rem"'
					:flipX='buttons.bottom.flipX'
					:flipY='buttons.bottom.flipY'
					:effect='buttons.bottom.effect'

					@action='actionButton(Buttons.Bottom)'
				/>
			</div>
		</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/components/popup/structure/Container';
</style>