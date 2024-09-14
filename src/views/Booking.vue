<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iSocketResult, iEventData, iObject, iSelectedMonth, iViewDataBooking, iMessageContent, iRequestData, iCalendar, iBookingContent, iPopup, iPopups, iBooking} from '@/utils/interfaces'
import {Device, urlBooking, AccountActions, BookingActions, EmitActions, Status, Role, Errors, bookingPopups, Messages} from '@/utils/constants'
import {defaultCalendar, defaultBooking, defaultSelectedMonth, defaultViewDataBooking} from '@/utils/default'
import {checkArray, checkEmptyObject, checkObject, checkString, fill, Popup} from '@/utils/functions'

import TemplateView from '@/views/Template.vue'

const CalendarNav = defineAsyncComponent(() => import('@/components/nav/Calendar.vue'))
const CalendarContainer = defineAsyncComponent(() => import('@/components/containers/Calendar.vue'))
const BookingPopup = defineAsyncComponent(() => import('@/components/popup/BookingDetailed.vue'))
const NewBookingPopup = defineAsyncComponent(() => import('@/components/popup/NewBooking.vue'))
const BookingRecap = defineAsyncComponent(() => import('@/components/popup/Bookings.vue'))
const BookingUpdate = defineAsyncComponent(() => import('@/components/popup/BookingUpdate.vue'))

export default defineComponent({
	extends: TemplateView,
	inheritAttrs: false,
	name: 'BookingView',
	components: {
		TemplateView,
		BookingPopup,
		CalendarContainer,
		CalendarNav,
		NewBookingPopup,
		BookingRecap,
		BookingUpdate,
	},
	props: {
		viewData: {
			type: Object as () => iViewDataBooking,
			default: defaultViewDataBooking
		},
	},
	computed: {
		bookingPopups: () => bookingPopups,
		popups: function(): iPopups {
			return {
				...this.popups,
				[bookingPopups.Booking.key]: Popup(bookingPopups.Booking.key, bookingPopups.Booking.title, true),
				[bookingPopups.NewBooking.key]: Popup(bookingPopups.NewBooking.key, bookingPopups.NewBooking.title, this.userData?.role === Role.Admin),
				[bookingPopups.RequestBooking.key]: Popup(bookingPopups.RequestBooking.key, bookingPopups.RequestBooking.title, true),
				[bookingPopups.Bookings.key]: Popup(bookingPopups.Bookings.key, bookingPopups.Bookings.title, this.userData?.role === Role.Admin),
				[bookingPopups.EditBooking.key]: Popup(bookingPopups.EditBooking.key, bookingPopups.EditBooking.title, this.userData?.role !== Role.Guest),
			}
		}
	},
	data() {
		return{
			selected: defaultSelectedMonth,
			calendar: {} as iBooking,
		}
	},
	methods: {
		socketOnMessage (response: iSocketResult, message: iMessageContent): void {
			const content = response.result.content
			switch (response.actionName) {
				case BookingActions.GetCalendarData:
					this.calendar = content as iBooking
					break
				case BookingActions.BookBooking:
					message.show = true
					if (checkEmptyObject(content) && content.email !== '' && content.uuid !== '')
						this.sendEvent( {
							action: EmitActions.Account,
							params: {
								action: AccountActions.Login,
								params: {
									email: content.email,
									uuid: content.uuid,
								}
							}
						})
					break
				case BookingActions.CreateBooking:
				case BookingActions.CancelBooking:
				case BookingActions.DeleteBooking:
				case BookingActions.EditBooking:
				case BookingActions.AcceptBooking:
				case BookingActions.ConfirmBooking:
				case BookingActions.RequestBooking:
				case BookingActions.EditBookingInternalData:
					message.show = true
					break
				case BookingActions.GetBooking:
					if (checkEmptyObject(content) && content?.booking && this.popupManager.isOpen()) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === bookingPopups.Booking.key)
							this.setBookingData(popup, content.booking as iBookingContent)
						else if (popup?.getKey() === bookingPopups.EditBooking.key)
							this.setEditBookingData(popup, content.booking as iBookingContent)
					}
					break
				case BookingActions.GetBookingInternalData:
					if (checkEmptyObject(content) && content?.internalNote && this.popupManager.isOpen()) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === bookingPopups.Booking.key)
							this.setBookingData(popup, {
								...popup.getData().booking,
								internalNote: content.internalNote
							})
					}
					break
				case BookingActions.GetAllBookingData:
					if (checkEmptyObject(content) && content?.booking && this.popupManager.isOpen()) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === bookingPopups.Booking.key)
							this.setBookingData(popup, content.booking as iBookingContent)
					}
					break
				case BookingActions.GetBookings:
					if (checkEmptyObject(content) && content?.bookings && this.popupManager.isOpen()) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === bookingPopups.Bookings.key)
							this.setBookingsData(popup, content.bookings as iBookingContent[])
					}
					break
				case BookingActions.Reload:
					if (checkEmptyObject(content)) {
						if (content?.year === this.selected.year && content?.month === this.selected.month) {
							this.sendSocketMessage({
								actionName: BookingActions.GetCalendarData,
								actionParams: {
									month: content.month,
									year: content.year,
								}
							})
						}
						if (content?.id && this.popupManager.isOpen()) {
							const popup = this.popupManager.getPopup()
							if (popup && [bookingPopups.Booking.key, bookingPopups.Bookings.key, bookingPopups.EditBooking.key].includes(popup.getKey())) {
								const popupData = popup.getData()
								switch (popup.getKey()) {
									case bookingPopups.Booking.key:
										if (content.id === popupData.booking.id) {
											this.requestDataFromPopup(popup)
										}
										break
									case bookingPopups.Bookings.key:
										if ((popupData.bookings as iBookingContent[]).find((element) => element.id === content.id)) {
											this.requestDataFromPopup(popup)
										}
										break
									case bookingPopups.EditBooking.key:
										if (content.id === popupData.booking.id) {
											this.requestDataFromPopup(popup)
										}
										break
								}
							}
						}
					}
					break
			}
		},
		setSelectedValue(value: iSelectedMonth): void {
			this.selected = value
		},
		setSelected(value: iSelectedMonth): void {
			this.setSelectedValue(value)
			this.sendSocketMessage({
				actionName: BookingActions.GetCalendarData,
				actionParams: {
					month: value.month,
					year: value.year,
				}
			})
		},
		backMonth(flag: boolean): void {
			const index = this.viewData.selectOptions.findIndex((element) => element.year === this.selected.year && element.month === this.selected.month)
			if (flag && index > 0) {
				this.setSelectedValue(this.viewData.selectOptions[index - 1])
			}
			else if (!flag && index < this.viewData.selectOptions.length - 1) {
				this.setSelectedValue(this.viewData.selectOptions[index + 1])
			}
		},
		setBookings(): void {
			if(
				this.viewData.calendar && this.viewData.calendar !== [defaultCalendar] &&
				this.calendar && this.calendar !== defaultBooking
			) {
				this.viewData.calendar.forEach((day) => {
					day.r = this.calendar[''.concat(day.y.toString(), fill(day.m), fill(day.d))]
				})
			}
		},
		showToday(): void {
			const today = new Date()
			if(this.device === Device.Mobile) {
				const element = today.getFullYear().toString() + fill(today.getMonth()+1) + fill(today.getDate())
				const event: iEventData = {
					action: EmitActions.ScrollElement,
					params: element,
				}
				this.sendEvent(event)
			}
			else if (this.$refs.calendarContainer) {
				(this.$refs.calendarContainer as InstanceType<typeof CalendarContainer>).underlineToday()
			}
		},
		openBooking(id: number): void {
			this.popupManager.add(this.manageBookingPopup(this.popups[bookingPopups.Booking.key], id))
		},
		openBookings(date: iCalendar): void {
			const popup = this.popups[bookingPopups.Bookings.key]
			popup.setTitle(`Prenotazioni del ${fill(date.d)}/${fill(date.m)}/${date.y}`)
			this.popupManager.add(this.manageBookingsPopup(popup, date))
		},
		bookBooking(bookingAttributes: iObject): void {
			const date = new Date(bookingAttributes.date)
			const title = `Prenota il ${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} alle ${bookingAttributes.start.slice(0, 5)}`
			this.openConfirmPopup(title, {
				action: this.sendSocketMessage,
				params: [{
					actionName: BookingActions.BookBooking,
					actionParams: bookingAttributes
				}]
			})
		},
		editBooking(bookingAttributes: iObject): void {
			let title = Messages.EditInternalData
			let actionName = BookingActions.EditBookingInternalData
			const editInternalKeys = ['id', 'internalNote']
			if (Object.keys(bookingAttributes).length === editInternalKeys.length) {
				for (const key of editInternalKeys) {
					if (!Object.keys(bookingAttributes).includes(key)) {
						title = Messages.EditBooking
						actionName = BookingActions.EditBooking
						break
					}
				}
			}
			else {
				title = Messages.EditBooking
				actionName = BookingActions.EditBooking
			}
			this.openConfirmPopup(title, {
				action: this.sendSocketMessage,
				params: [{
					actionName: actionName,
					actionParams: bookingAttributes
				}]
			})
		},
		cancelBooking(booking: iBookingContent): void {
			if ([Status.CANCELLED, Status.COMPLETED, Status.FREE, Status.PAUSED].includes(booking.status)) {
				this.sendError(Errors.DeleteBookingCompletedFree)
				return
			}
			this.openConfirmPopup(Messages.CancelBooking, {
				action: this.sendSocketMessage,
				params: [{
					actionName: BookingActions.CancelBooking,
					actionParams: {id: booking.id}
				}]
			})
		},
		deleteBooking(booking: iBookingContent): void {
			this.openConfirmPopup(Messages.DeleteBooking, {
				action: this.sendSocketMessage,
				params: [{
					actionName: BookingActions.DeleteBooking,
					actionParams: {id: booking.id}
				}]
			})
		},
		acceptBooking(booking: iBookingContent): void {
			this.openConfirmPopup(Messages.AcceptBooking, {
				action: this.sendSocketMessage,
				params: [{
					actionName: BookingActions.AcceptBooking,
					actionParams: {id: booking.id}
				}]
			})
		},
		confirmBooking(booking: iBookingContent): void {
			this.openConfirmPopup(Messages.ConfirmBooking, {
				action: this.sendSocketMessage,
				params: [{
					actionName: BookingActions.ConfirmBooking,
					actionParams: {id: booking.id}
				}]
			})
		},
		openNewBooking(date: Date) {
			const popup = this.popups[bookingPopups.NewBooking.key]
			popup.setTitle(`${Messages.NewBooking} ${fill(date.getDate())}/${fill(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2, 4)}`)
			this.popupManager.add(this.manageNewBookingPopup(popup, date))
		},
		openRequestNewBooking() {
			const popup = this.popups[bookingPopups.RequestBooking.key]
			popup.setTitle(Messages.RequestBooking)
			this.popupManager.add(this.manageRequestBookingPopup(popup, new Date()))
		},
		createBooking(date: iObject) {
			const _date = new Date(date.date)
			const data = {
				start: date.start,
				end: date.end,
				date: `${_date.getFullYear()}-${fill(_date.getMonth() + 1)}-${fill(_date.getDate())}`,
			}
			this.sendSocketMessage({
				actionName: BookingActions.CreateBooking,
				actionParams: data
			})
			this.closePopup()
		},
		requestBooking(date: iObject) {
			const _date = new Date(date.date)
			const data = {
				start: date.start,
				end: date.end,
				date: `${_date.getFullYear()}-${fill(_date.getMonth() + 1)}-${fill(_date.getDate())}`,
				note: date.note,
			}
			this.sendSocketMessage({
				actionName: BookingActions.RequestBooking,
				actionParams: data
			})
			this.closePopup()
		},
		openUpdateBooking(booking: iBookingContent) {
			const popup = this.popups[bookingPopups.EditBooking.key]
			this.popupManager.add(this.manageEditBookingPopup(popup, booking))
		},
		getViewData() {
			this.sendEvent({
				action: EmitActions.SetParams,
				params: this.selected
			})
		},
		requestDataFromPopup(popup: iPopup) {
			this.sendSocketMessage({
				actionName: popup.getParams().action,
				actionParams: popup.getParams().params
			} as iRequestData)
		},
		setBookingParams(popup: iPopup, id: number) {
			popup.setParams({
				action: this.userData?.role === Role.Admin ? BookingActions.GetAllBookingData : BookingActions.GetBooking,
				params: {id}
			})
			this.requestDataFromPopup(popup)
		},
		setBookingData(popup: iPopup, booking: iBookingContent) {
			popup.setData({booking})
			popup.setLoading(false)
		},
		manageBookingPopup(popup: iPopup, booking: iBookingContent | number) {
			if (typeof booking === 'number')
				this.setBookingParams(popup, booking)
			else
				this.setBookingParams(popup, booking.id)
			return popup.open()
		},
		setNewBookingParams(popup: iPopup, date: Date) {
			popup.setParams({
				action: BookingActions.CreateBooking,
				params: {
					date: date,
					create: true,
				}
			})
		},
		setNewBookingData(popup: iPopup, date: Date) {
			popup.setData({date})
		},
		manageNewBookingPopup(popup: iPopup, date: Date) {
			this.setNewBookingParams(popup, date)
			this.setNewBookingData(popup, date)
			return popup.open(false)
		},
		setRequestBookingParams(popup: iPopup) {
			popup.setParams({
				action: BookingActions.RequestBooking,
				params: {}
			})
		},
		setRequestBookingData(popup: iPopup, date: Date) {
			popup.setData({date})
		},
		manageRequestBookingPopup(popup: iPopup, date: Date) {
			this.setRequestBookingParams(popup)
			this.setRequestBookingData(popup, date)
			return popup.open(false)
		},
		setBookingsParams(popup: iPopup, date: iCalendar) {
			popup.setParams({
				action: BookingActions.GetBookings,
				params: {
					d: date.d,
					m: date.m,
					y: date.y,
				}
			})
			this.requestDataFromPopup(popup)
		},
		setBookingsData(popup: iPopup, bookings: iBookingContent[]) {
			popup.setData({bookings})
			popup.setLoading(false)
		},
		manageBookingsPopup(popup: iPopup, date: iCalendar) {
			this.setBookingsParams(popup, date)
			return popup.open()
		},
		setEditBookingParams(popup: iPopup, booking: iBookingContent) {
			popup.setParams({
				action: BookingActions.GetBooking,
				params: {id: booking.id}
			})
			this.requestDataFromPopup(popup)
		},
		setEditBookingData(popup: iPopup, booking: iBookingContent) {
			popup.setData({booking})
			popup.setLoading(false)
		},
		manageEditBookingPopup(popup: iPopup, booking: iBookingContent) {
			this.setEditBookingParams(popup, booking)
			this.setEditBookingData(popup, booking)
			return popup.open(false)
		},
		closePopup() {
			this.popupManager.remove()
			const popup = this.popupManager.getPopup()
			if (popup !== null) {
				this.requestDataFromPopup(popup)
			}
		},
	},
	watch: {
		selected() {
			this.getViewData()
		},
		'connection.connected': {
			handler: function () {
				if (this.connection.connected) {
					this.sendSocketMessage({
						actionName: BookingActions.GetCalendarData,
						actionParams: {
							month: this.selected.month,
							year: this.selected.year,
						}
					})
				}
			},
			deep: true,
		},
		calendar() {
			if (!checkEmptyObject(this.calendar))
				return
			this.setBookings()
		},
		'viewData.calendar'() {
			if (!checkArray(this.viewData.calendar))
				return
			this.setBookings()
		},
		'userData.identifier': {
			handler: function () {
				if (checkString(this.userData.identifier)) {
					if (!checkObject(this.connection.socket) || this.connection.socket.readyState === WebSocket.CLOSED)
						this.initSocket(urlBooking, this.socketOnMessage, defaultBooking)
					else
						this.sendSocketMessage({
							actionName: BookingActions.GetCalendarData,
							actionParams:{
								month: this.selected.month,
								year: this.selected.year,
							}
						})
				}
			},
			deep: true,
		},
		'settings.visible': {
			handler: function () {
				if (this.settings.visible) {
				clearTimeout(this.timers.socket)
			}
			else
				this.timers.socket = window.setTimeout(() => {
					try {
						this.connection.socket.close()
					}
					catch (e) {
						//pass
					}
				}, this.halfMinute)
			},
			deep: true,
		},
	},
	mounted() {
		if (checkString(this.userData.identifier)) {
			this.initSocket(urlBooking, this.socketOnMessage, defaultBooking)
		}
	},
})
</script>

<template>
	<TemplateView
		:scroll='device === Device.Desktop'
	>
		<div class='Booking'>
			<CalendarNav
				:colors='colors'
				:options='viewData.selectOptions'
				:device='device'
				:selected='selected'

				@selected='setSelected'
				@today='showToday'
				@request='openRequestNewBooking'
			/>
			<CalendarContainer
				ref='calendarContainer'

				:colors='colors'
				:calendar='viewData.calendar'
				:device='device'
				:role='userData.role'
				:month='selected.month'
				:year='selected.year'
				:min='viewData.selectOptions && viewData.selectOptions[0] === selected'
				:max='viewData.selectOptions && viewData.selectOptions[viewData.selectOptions.length - 1] === selected'

				@openBooking='openBooking'
				@openBookings='openBookings'
				@createBooking='openNewBooking'
				@backMonth='backMonth'
			/>
		</div>
		<Transition name='popup'>
			<BookingPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(bookingPopups.Booking.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:booking='popupManager.getPopup()?.getData()?.booking'
				:role='userData?.role'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@error='sendError'
				@sendBooking='bookBooking'
				@editBooking='editBooking'
				@cancelBooking='cancelBooking'
				@deleteBooking='deleteBooking'
				@acceptBooking='acceptBooking'
				@confirmBooking='confirmBooking'
			/>
		</Transition>
		<Transition name='popup'>
			<NewBookingPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(bookingPopups.NewBooking.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:params='popupManager.getPopup()?.getParams()?.params'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@error='sendError'
				@createBooking='createBooking'
			/>
		</Transition>
		<Transition name='popup'>
			<NewBookingPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(bookingPopups.RequestBooking.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:params='popupManager.getPopup()?.getParams()?.params'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@error='sendError'
				@requestBooking='requestBooking'
			/>
		</Transition>
		<Transition name='popup'>
			<BookingRecap
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(bookingPopups.Bookings.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:bookings='popupManager.getPopup()?.getData()?.bookings'
				:role='userData.role'
				:date='{...popupManager.getPopup()?.getParams()?.params, show: true}'
				:title='popupManager.getPopup()?.getTitle()'
				:isLoading='popupManager.getPopup()?.isLoading()'

				@close='closePopup'
				@edit='openUpdateBooking'
				@cancelBooking='cancelBooking'
				@error='sendError'
				@newBooking='openNewBooking'
			/>
		</Transition>
		<Transition name='popup'>
			<BookingUpdate
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(bookingPopups.EditBooking.key)?.isVisible()'

				:booking='popupManager.getPopup()?.getData()?.booking'
				:title='popupManager.getPopup()?.getTitle()'
				:role='userData.role'
				:colors='colors'
				:isViewOnly='false'
				:device='device'

				@close='closePopup'
				@error='sendError'
				@editBooking='editBooking'
			/>
		</Transition>
	</TemplateView>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/views/Booking';
</style>