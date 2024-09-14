<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

import {iEventData, iMessage, iMessageContent, iObject, iRequestData, iRequestViewData, iSocketResult, iViewResult, iUser, iCalendar, iGallery, iFeedback, iViewSettings} from '@/utils/interfaces'
import {Dark, Light} from '@/utils/palette'
import {defaultBooking, defaultUserData, defaultViewDataBooking} from '@/utils/default'
import {DayLabel, Device, Role, Theme, urlAccount, urlView, Routes, ViewActions, AccountActions, EmitActions} from '@/utils/constants'
import {checkArray, fill, handleRequests} from '@/utils/functions'

const Horizontal = defineAsyncComponent(() => import('@/components/nav/Menu.vue'))
const Burger = defineAsyncComponent(() => import('@/components/nav/Burger.vue'))
const MessagePopup = defineAsyncComponent(() => import('@/components/popup/Message.vue'))

const today = new Date()
const halfMinute = 30000
export default defineComponent({
	name: 'App',
	computed: {
		...mapState(['email', 'uuid', 'identifier', 'theme']),
		Device: () => Device,
		searchNotIncluded: () => {
			const excluded = ['/profile', '/booking', '/gallery', '/feedback']
			return !excluded.includes(window.location.pathname.toLowerCase())
		}
	},
	components: {
		MessagePopup,
		Horizontal,
		Burger,
	},
	data() {
		return {
			palettes: [Dark, Light],

			device: window.innerWidth > 768 ? Device.Desktop : Device.Mobile,

			pages: this.$router.options.routes.map((item) => item.name),

			view: {
				socket: null as unknown as WebSocket,
				attempts: 0,
				data: {} as iObject,
				params: {} as iObject,
				error: false,
				external: false,
				connected: false,
				restart: true,
			},

			account: {
				socket: null as unknown as WebSocket,
				attempts: 0,
				data: Object.assign({}, defaultUserData),
				params: {} as iObject,
				error: false,
				external: false,
				connected: false,
				restart: true,
			},

			views: {
				themeBased: [Routes.Home],
				deviceBased: [Routes.Home, Routes.Booking],
				paramsBased: [Routes.Booking],
				viewBased: [Routes.Home, Routes.Booking, Routes.Gallery, Routes.Feedback],
			},
			viewSettings: {
					visible: true,
					currentPage: String(this.$route.name),
			} as iViewSettings,
			timers: {
				sockets: {
					view: -1,
					account: -1,
				}
			},

			messages: [] as iMessage[],
		}
	},
	methods: {
		...mapActions(['setEmail', 'setUuid', 'setRole', 'saveEmail', 'saveUuid', 'saveRole', 'setIdentifier', 'setTheme', 'saveTheme']),
		toggleTheme() {
			this.setTheme(this.theme === Theme.Dark ? Theme.Light : Theme.Dark)
			this.saveTheme()
		},
		init() {
			this.initSockets()
			this.setBodyBackground()
			this.windowListener()
			this.documentListener()
			this.setDevice()
			this.initTheme()
			this.initRequests()
		},
		windowListener() {
			window.addEventListener('resize', () => {
				this.setDevice()
			})
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
				this.initTheme()
			})
		},
		documentListener() {
			document.addEventListener('visibilitychange', () => {
				this.viewSettings.visible = !document.hidden
			})
		},
		initSockets() {
			this.initAccountSocket()
			this.initViewSocket()
		},
		initViewSocket() {
			this.view.socket = new WebSocket(urlView)
			this.view.socket.onopen = () => {
				this.view.attempts = 0
				this.view.connected = true
				if (this.viewSettings.currentPage === 'App') return
			}
			this.view.socket.onclose = () => {
				this.view.connected = false
				this.view.data = {}
				if (this.view.attempts < 5 && this.viewSettings.visible) {
					this.view.attempts++
					window.setTimeout(() => this.initViewSocket(), 500)
				}
			}
			this.view.socket.onmessage = (event) => {
				const data = JSON.parse(event.data) as iViewResult
				let index
				if (data && data.result && data.viewName && data.actionName) {
					if (data.result.message !== '' && !data.result.status) {
						this.messages.push(
							{
								message: data.result.message,
								status: data.result.status,
							}
						)
					} else {
						const content = data.result.content
						switch (data.viewName) {
							case Routes.Home:
								switch (data.actionName) {
									case ViewActions.ViewData:
										this.view.data = content as iObject
										break
									case ViewActions.Home.ThemeData:
									case ViewActions.DeviceData:
										this.view.data.headerImage.images = content.headerImage.images
										break
								}
								break
							case Routes.Booking:
								switch (data.actionName) {
									case ViewActions.DeviceData:
									case ViewActions.ViewData:
										if (content && Array.isArray(content)) {
											(content as iCalendar[]).forEach((item) => {
												item.dw = DayLabel[item.dw as number]
												item.r = defaultBooking['']
											})
											this.view.data.calendar = content as iCalendar[]
										}
										break
									case ViewActions.Booking.GetSelectedData:
										this.view.data.selectOptions = content
										break
								}
								break
							case Routes.Gallery:
								switch (data.actionName) {
									case ViewActions.ViewData:
										this.view.data = content as iObject
										break
									case ViewActions.Gallery.GetImageData:
										index = this.view.data.gallery.findIndex((item: iGallery) => item.id === content.data.id)
										if (index !== -1) {
											this.view.data.gallery[index].title = content.data.title
											this.view.data.gallery[index].description = content.data.description
										}
										break
									case ViewActions.Gallery.GetNextImages:
										if (checkArray(content.gallery) && content.gallery.length > 0)
											this.view.data.gallery = this.view.data.gallery.concat(content.gallery as iGallery[])
										break
								}
								break
							case Routes.Feedback:
								switch (data.actionName) {
									case ViewActions.ViewData:
										this.view.data = content as iObject
										break
									case ViewActions.Feedback.GetFeedbackData:
										index = this.view.data.feedback.findIndex((item: iFeedback) => item.id === content.feedback.id)
										if (index !== -1) {
											this.view.data.feedback[index].title = content.feedback.title
											this.view.data.feedback[index].description = content.feedback.description
										}
										break
									case ViewActions.Feedback.CreateNewFeedback:
										this.messages.push({
											message: data.result.message,
											status: data.result.status,
										})
										this.sendViewRequest(this.getViewRequest()[this.viewSettings.currentPage])
										break
									case ViewActions.Feedback.GetNextFeedbacks:
										this.view.data.feedback = this.view.data.feedback.concat(content.feedback as iFeedback[])
										break
								}
								break
						}
					}
				}
			}
		},
		initAccountSocket() {
			this.account.socket = new WebSocket(urlAccount)

			this.account.socket.onopen = () => {
				this.account.attempts = 0
				this.account.connected = true
			}

			this.account.socket.onclose = () => {
				this.account.connected = false
				this.account.data = Object.assign({}, defaultUserData)
				this.setIdentifier(this.account.data.identifier)
				if (this.account.attempts < 5 && this.viewSettings.visible) {
					this.account.attempts++
					window.setTimeout(() => this.initAccountSocket(), 500)
				}
				else if (this.viewSettings.visible) {
					this.addMessage({
						message: 'Impossibile connettersi al servizio, riprova più tardi.',
						status: false,
						show: true,
					})
					this.setRole(Role.Guest)
				}
			}

			this.account.socket.onmessage = (event) => {
				const data = JSON.parse(event.data) as iSocketResult
				if (data && data.result && data.actionName) {
					const result = data.result.content
					if (!data.result.status) {
						if (data.actionName === 'login' && !this.account.error) {
							this.account.error = true
							this.guestLogin()
						}
						this.messages.push({
							message: data.result.message,
							status: data.result.status,
						})
					} else {
						switch (data.actionName) {
							case AccountActions.Login:
								this.setSaveAccountData(result as iUser)
								if (this.account.external) {
									this.account.external = false
									if (data.result.message !== '')
										this.messages.push({
											message: data.result.message,
											status: data.result.status,
										})
								}
								this.account.error = false
								break
							case AccountActions.Register:
								this.setEmail(result.email as string)
								this.setUuid(result.uuid as string)
								this.saveEmail()
								this.saveUuid()
								this.messages.push({
									message: data.result.message,
									status: data.result.status,
								})
								this.login()
								break
							case AccountActions.Delete:
							case AccountActions.Logout:
								this.setSaveAccountData(Object.assign({}, defaultUserData))
								this.messages.push({
									message: data.result.message,
									status: data.result.status,
								})
								break
							case AccountActions.RestorePassword:
							case AccountActions.ForgotPassword:
							case AccountActions.Update:
								this.setSaveAccountData(result as iUser)
								this.messages.push({
									message: data.result.message,
									status: data.result.status,
								})
								break
							case AccountActions.UserData:
								this.setSaveAccountData(result as iUser)
								break
							case AccountActions.GuestLogin:
								this.setSaveAccountData(result as iUser)
								this.account.error = false
								break
						}
					}
				}
			}
		},
		setAccountData(account: iUser) {
			this.setEmail(account.email)
			this.setUuid(account.uuid)
			this.setRole(account.role)
			this.setIdentifier(account.identifier)
			this.account.data = account
		},
		saveAccountData() {
			this.saveEmail()
			this.saveUuid()
			this.saveRole()
		},
		setSaveAccountData(account: iUser) {
			this.setAccountData(account)
			this.saveAccountData()
		},
		sendViewRequest(data: iRequestViewData) {
			if (this.view.socket.readyState === this.view.socket.OPEN) {
				this.view.socket.send(JSON.stringify(data))
			}
		},
		sendAccountRequest(request: iRequestData) {
			if (this.account.socket.readyState === this.account.socket.OPEN)
				this.account.socket.send(JSON.stringify(request))
		},
		setDevice() {
			this.device = window.innerWidth > 768 ? Device.Desktop : Device.Mobile
		},
		getViewRequest(action = 'viewData'): { [key: string]: iRequestViewData } {
			return {
				Home: {
					viewName: Routes.Home,
					actionName: action,
					actionParams: {
						theme: this.theme,
						device: this.device,
					},
				},
				Booking: {
					viewName: Routes.Booking,
					actionName: action,
					actionParams: {
						period: {
							month: this.view.params.month || today.getMonth() + 1,
							year: this.view.params.year || today.getFullYear(),
						},
						device: this.device,
					}
				},
				Gallery: {
					viewName: Routes.Gallery,
					actionName: action,
					actionParams: {
						device: this.device,
					}
				},
				Feedback: {
					viewName: Routes.Feedback,
					actionName: action,
					actionParams: {
						device: this.device,
					}
				}
			}
		},
		setParams(viewParams: iObject) {
			this.view.params = viewParams
		},
		scrollToElement(idElement: string) {
			const element = document.getElementById(idElement)
			if (element) {
				element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
			}
		},
		initTheme() {
			if (!localStorage.getItem('theme'))
				this.setTheme((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? Theme.Dark : Theme.Light)
		},
		async initRequests() {
			if (window.location.search.includes('?') && this.searchNotIncluded) {
				const response = await handleRequests()
				if (response.show)
					this.addMessage(response)
			}
			else {
				// pass
			}
		},
		manageViewAction(event: iEventData) {
			switch (event.action) {
				case EmitActions.ScrollElement:
					this.scrollToElement(event.params as string)
					break
				case EmitActions.SetParams:
					this.setParams(event.params as iObject)
					break
				case EmitActions.Account:
					this.account.external = true
					if (event.params.params.email !== undefined && event.params.params.email !== '') {
						this.setEmail(event.params.params.email)
						this.saveEmail()
					}
					if (event.params.params.uuid !== undefined && event.params.params.uuid !== '') {
						this.setUuid(event.params.params.uuid)
						this.saveUuid()
					}
					this.sendAccountRequest({
						actionName: event.params.action,
						actionParams: {
							...event.params.params,
							identifier: this.identifier,
							uuid: this.uuid,
						},
					})
					break
				case EmitActions.GetImageData:
					this.sendViewRequest({
						viewName: Routes.Gallery,
						actionName: ViewActions.Gallery.GetImageData,
						actionParams: {
							id: event.params.id,
						},
					})
					break
				case EmitActions.GetNextImages:
					this.sendViewRequest({
						viewName: Routes.Gallery,
						actionName: ViewActions.Gallery.GetNextImages,
						actionParams: {
							device: this.device,
							len: event.params.len,
						},
					})
					break
				case EmitActions.GetFeedbackData:
					this.sendViewRequest({
						viewName: Routes.Feedback,
						actionName: ViewActions.Feedback.GetFeedbackData,
						actionParams: {
							id: event.params.id,
						},
					})
					break
				case EmitActions.CrateNewFeedback:
					this.sendViewRequest({
						viewName: Routes.Feedback,
						actionName: ViewActions.Feedback.CreateNewFeedback,
						actionParams: {
							...event.params,
							identifier: this.identifier,
						},
					})
					break
				case EmitActions.GetNextFeedbacks:
					this.sendViewRequest({
						viewName: Routes.Feedback,
						actionName: ViewActions.Feedback.GetNextFeedbacks,
						actionParams: {
							device: this.device,
							len: event.params.len,
						},
					})
					break
				default:
					break
			}
		},
		addMessage(content: iMessageContent) {
			if (content.message !== '' && (content.show || !content.status))
				this.messages.push({
					message: content.message,
					status: content.status,
				})
		},
		guestLogin() {
			this.sendAccountRequest({
				actionName: AccountActions.GuestLogin,
				actionParams: {},
			})
		},
		login() {
			this.sendAccountRequest({
				actionName: AccountActions.Login,
				actionParams: {
					email: this.email,
					uuid: this.uuid,
					identifier: this.identifier,
				},
			})
		},
		setBodyBackground() {
			document.body.style.backgroundColor = String(this.palettes[this.theme].primary)
		},
		sendCurrentViewRequest() {
			this.clearViewData()
			if (this.views.viewBased.includes(this.viewSettings.currentPage)) {
				this.sendViewRequest(this.getViewRequest()[this.viewSettings.currentPage])
				if (this.viewSettings.currentPage === Routes.Booking) {
					if (this.view.data.selectOptions === defaultViewDataBooking.selectOptions || this.view.data.selectOptions === undefined) {
						const now = new Date()
						this.sendViewRequest({
							viewName: Routes.Booking,
							actionName: ViewActions.Booking.GetSelectedData,
							actionParams: {
								now: now.getFullYear() + '-' + fill(now.getMonth() + 1, 2) + '-' + fill(now.getDate(), 2),
							},
						})
					}
				}
			}
		},
		clearViewData() {
			switch (this.viewSettings.currentPage) {
				case Routes.Booking:
					this.view.data.calendar = []
					break
				default:
					this.view.data = {}
					break
			}
		}
	},
	watch: {
		theme() {
			this.setBodyBackground()
			if (this.views.themeBased.includes(this.viewSettings.currentPage)) {
				this.sendViewRequest(this.getViewRequest(ViewActions.Home.ThemeData)[this.viewSettings.currentPage])
			}
		},
		device() {
			if (this.views.deviceBased.includes(this.viewSettings.currentPage)) {
				this.sendViewRequest(this.getViewRequest(ViewActions.DeviceData)[this.viewSettings.currentPage])
			}
		},
		$route() {
			this.viewSettings.currentPage = String(this.$route.name)
			this.view.params = {}
			this.sendCurrentViewRequest()
		},
		'account.connected'() {
			if (this.account.connected) {
				if (this.uuid !== '') this.login()
				else this.guestLogin()
			}
		},
		'view.connected'() {
			if (this.view.connected) {
				this.sendCurrentViewRequest()
			}
		},
		'view.socket.readyState'() {
			if (this.view.socket.readyState === this.view.socket.OPEN) {
				this.sendCurrentViewRequest()
			}
		},
		'view.params'() {
			if (Object.keys(this.view.params).length > 0) {
				this.sendCurrentViewRequest()
			}
		},
		messages: {
			handler: function () {
				if (this.messages.length > 0)
					window.setTimeout(() => {
						this.messages.shift()
					}, 3000)
			},
			deep: true,
		},
		identifier() {
			if (this.identifier === '') {
				this.login()
			}
		},
		'viewSettings.visible'() {
			if (this.viewSettings.visible) {
				if (this.view.socket.readyState === this.view.socket.CLOSED) {
					this.initViewSocket()
				}
				else {
					clearTimeout(this.timers.sockets.view)
				}
				if (this.account.socket.readyState === this.account.socket.CLOSED) {
					this.initAccountSocket()
				}
				else {
					clearTimeout(this.timers.sockets.account)
				}
			}
			else {
				if (this.view.socket.readyState === this.view.socket.OPEN) {
					this.timers.sockets.view = window.setTimeout(() => {
						try {
							this.view.socket.close()
						}
						catch (e) {
							//pass
						}
					}, halfMinute)
				}
				if (this.account.socket.readyState === this.account.socket.OPEN) {
					this.timers.sockets.account = window.setTimeout(() => {
						try {
							this.account.socket.close()
						}
						catch (e) {
							//pass
						}
					}, halfMinute)
				}
			}
		}
	},
	created() {
		this.init()
	},
	beforeUnmount() {
		this.view.restart = false
		this.view.socket.close()
		this.account.restart = false
		this.account.socket.close()
	},
})
</script>

<template>
	<Transition name='message'>
		<MessagePopup
			v-if='messages.length > 0'

			:colors='palettes[theme]'
			:status='messages[0].status'
			:message='messages[0].message'
		/>
	</Transition>
	<Horizontal
		v-if='device === Device.Desktop'

		:colors='palettes[theme]'
		:currentRoute='viewSettings.currentPage'
		:pages='pages'
		:theme='theme'

		@toggleTheme='toggleTheme'
	/>
	<Burger
		v-else

		:colors='palettes[theme]'
		:currentRoute='viewSettings.currentPage'
		:pages='pages'
		:theme='theme'

		@toggleTheme='toggleTheme'
	/>
	<RouterView
		:theme='theme'
		:colors='palettes[theme]'
		:device='device'
		:viewData='view.data'
		:userData='account.data'
		:settings='viewSettings'

		@action='manageViewAction'
		@messageContent='addMessage'
	/>
</template>

<style lang='scss'>
@import '@/assets/styles/global';
@import 'vue-skeletor/dist/vue-skeletor.css';
</style>
