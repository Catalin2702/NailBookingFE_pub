<script lang='ts'>
import {defineAsyncComponent, defineComponent} from 'vue'

import {iEventData, iMessageContent, iColors, iUser, iScroll, iViewSettings, iConfirmResponse, iRequestData, iSocketResult, iObject, iPopup, iPopups, iConfirm} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Device, commonPopups, Role, Theme} from '@/utils/constants'
import {defaultScroll, defaultUserData, defaultViewSettings} from '@/utils/default'
import {checkObject, checkString, PopupManager, Popup} from '@/utils/functions'

const ConfirmPopup = defineAsyncComponent(() => import('@/components/popup/Confirm.vue'))

const scrollOptions: iScroll = {
	scroll: true,
	limit: 300,
}
const halfMinute = 30000

export default defineComponent({
	name: 'TemplateView',
	components: {ConfirmPopup},
	props: {
		scroll: {
			type: Boolean,
			default: true,
		},
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
		userData: {
			type: Object as () => iUser,
			default: Object.assign({}, defaultUserData),
		},
		onScroll: {
			type: Object as () => iScroll,
			default: defaultScroll,
		},
		settings: {
			type: Object as () => iViewSettings,
			default: defaultViewSettings,
		}
	},
	computed: {
		Device: () => Device,
		Theme: () => Theme,
		Role: () => Role,
		scrollOptions: () => scrollOptions,
		halfMinute: () => halfMinute,
		popups: function(): iPopups {
			return {
				[commonPopups.Confirm.key]: Popup(commonPopups.Confirm.key, commonPopups.Confirm.title, true)
			}
		},
		commonPopups: () => commonPopups,
	},
	data() {
		return {
			timers: {
				socket: -1,
			},
			connection: {
				socket: null as unknown as WebSocket,
				attempts: 0,
				data: {} as iObject,
				connected: false,
				restart: true,
			},
			popupManager: PopupManager,
		}
	},
	methods: {
		initSocket(url: string, onMessage: (response: iSocketResult, message: iMessageContent) => void, defaultData: iObject|null = null): void {
			if (checkObject(this.connection.socket) && [this.connection.socket.OPEN, this.connection.socket.CONNECTING].includes(this.connection.socket.readyState))
				return

			this.connection.socket = new WebSocket(url)

			this.connection.socket.onopen = () => {
				this.connection.connected = true
				this.connection.attempts = 0
			}

			this.connection.socket.onmessage = (event: MessageEvent) => {
				const response = JSON.parse(event.data) as iSocketResult
				let message: iMessageContent

				if (checkObject(response) && checkObject(response.result) && checkString(response.actionName)) {
					message = {
						message: response.result.message,
						status: response.result.status,
						show: !response.result.status,
					}

					if (message.status) {
						onMessage(response, message)
					}
				}
				else
					message = {
						message: 'Errore, contattare l\'assistenza',
						status: false,
						show: true,
					}
				this.sendMessage(message)
			}

			this.connection.socket.onerror = () => {
				this.connection.socket.close()
				this.connection.connected = false
			}

			this.connection.socket.onclose = () => {
				this.connection.connected = false
				if (defaultData)
					this.connection.data = Object.assign({}, defaultData)
				if (this.connection.restart) {
					this.connection.attempts++
					if (this.connection.attempts < 5)
						this.timers.socket = window.setTimeout(() => {
							this.initSocket(url, onMessage, defaultData)
						}, 500)
				}
			}
		},
		sendSocketMessage(request: iRequestData, identifier = true) {
			if (!checkObject(this.connection.socket))
				return
			if (this.connection.socket.readyState === WebSocket.OPEN){
				if (identifier){
					if (!this.userData.identifier)
						return
					request.actionParams.identifier = this.userData.identifier
				}
				this.connection.socket.send(JSON.stringify(request))
			}
		},
		sendMessage(message: iMessageContent) {
			this.$emit('messageContent', message)
		},
		sendEvent(event: iEventData) {
			this.$emit('action', event)
		},
		sendError(message: iMessageContent | string) {
			if (typeof message === 'string')
				this.sendMessage({
					message: message,
					status: false,
					show: true,
				})
			else
				this.sendMessage(message)
		},
		actionListener() {
			if (this.onScroll.scroll) {
				const view = document.getElementById('view')
				if (view)
					view.addEventListener('scroll', () => {
						if (view.scrollTop + view.clientHeight + this.onScroll.limit >= view.scrollHeight)
							this.$emit('bottom')
					})
			}
		},
		requestDataFromPopup(popup: iPopup) {
			this.sendSocketMessage({
				actionName: popup.getParams().action,
				actionParams: popup.getParams().params
			} as iRequestData)
		},
		closePopup(request = true) {
			this.popupManager.remove()
			if (request && this.popupManager.isOpen()) {
				const popup = this.popupManager.getPopup()
				if (popup !== null) {
					this.requestDataFromPopup(popup)
				}
			}
		},
		confirmAction(res: iConfirmResponse) {
			if (res.response) {
				res.action(...res.params)
			}
			this.closePopup(false)

			if (this.popupManager.isOpen() && res.action.name === 'bound sendSocketMessage') {
				const popup = this.popupManager.getPopup()
				if (popup){
					res.action({
						actionName: popup.getParams().action,
						actionParams: popup.getParams().params
					})
				}

			}
		},
		openConfirmPopup(title: string, data: iConfirm) {
			this.popupManager.add(Popup(commonPopups.Confirm.key, title, true, '', data).open(false))
		}
	},
	mounted() {
		this.actionListener()
	},
	unmounted() {
		this.connection.restart = false
		try {
			this.connection.socket.close()
		}
		catch (e) {
			// pass
		}
	},
	emits: ['messageContent', 'action', 'error', 'account', 'bottom']
})
</script>

<template>
	<div
		id='view'
		class='view'
	>
		<Transition name='popup'>
			<ConfirmPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(commonPopups.Confirm.key)?.isVisible()'

				:title='popupManager.getPopup()?.getTitle()'
				:colors='colors'
				:action='popupManager.getPopup()?.getData()?.action'
				:params='popupManager.getPopup()?.getData()?.params'

				@close='closePopup'
				@confirm='confirmAction($event)'
			/>
		</Transition>
		<slot/>
	</div>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/views/Template';
</style>