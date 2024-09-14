<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import {iUserData, iEventData, iSocketResult, iColors, iBookingContent, iObject, iProfile, iPopups, iParams, iMessageContent, iUser, iPopup} from '@/utils/interfaces'
import {Dark} from '@/utils/palette'
import {Device, Role, urlProfile, AccountActions, ProfilePagesGuest, ProfilePagesUser, ProfilePagesAdmin, EmitActions, Errors, ProfileActions, Messages, Status, profilePopups} from '@/utils/constants'
import {checkString, Popup} from '@/utils/functions'

import TemplateView from '@/views/Template.vue'

const ProfilePopup = defineAsyncComponent(() => import('@/components/popup/ProfileManage.vue'))
const AccessPopup = defineAsyncComponent(() => import('@/components/popup/Access.vue'))
const CouponPopup = defineAsyncComponent(() => import('@/components/popup/Coupon.vue'))
const Card = defineAsyncComponent(() => import('@/components/cards/Card.vue'))
const SvgIcon = defineAsyncComponent(() => import('@/components/buttons/Svg.vue'))
const BookingUpdate = defineAsyncComponent(() => import('@/components/popup/BookingUpdate.vue'))
const BookingRecap = defineAsyncComponent(() => import('@/components/popup/Bookings.vue'))
const BookingsManage = defineAsyncComponent(() => import('@/components/popup/BookingsManage.vue'))
const UsersManage = defineAsyncComponent(() => import('@/components/popup/UsersManage.vue'))
const UserUpdate = defineAsyncComponent(() => import('@/components/popup/UserUpdate.vue'))
const ForgotPassword = defineAsyncComponent(() => import('@/components/popup/ForgotPassword.vue'))
const RestorePassword = defineAsyncComponent(() => import('@/components/popup/RestorePassword.vue'))

export default defineComponent({
	extends: TemplateView,
	inheritAttrs: false,
	name: 'ProfileView',
	components: {
		ForgotPassword,
		TemplateView,
		ProfilePopup,
		AccessPopup,
		CouponPopup,
		Card,
		SvgIcon,
		BookingUpdate,
		BookingRecap,
		BookingsManage,
		UsersManage,
		UserUpdate,
		RestorePassword,
	},
	props: {
		colors: {
			type: Object as () => iColors,
			default: Dark,
		},
		device: {
			type: Number,
			default: Device.Desktop,
		},
	},
	computed: {
		profilePopups: () => profilePopups,
		popups: function(): iPopups {
			return {
				...this.popups,
				[profilePopups.Access.key]: Popup(profilePopups.Access.key, profilePopups.Access.title, this.userData?.role === Role.Guest, 'login'),
				[profilePopups.Profile.key]: Popup(profilePopups.Profile.key, profilePopups.Profile.title, this.userData?.role !== Role.Guest, 'profile'),
				[profilePopups.Bookings.key]: Popup(profilePopups.Bookings.key, profilePopups.Bookings.title, this.userData?.role !== Role.Guest, 'bookings'),
				[profilePopups.EditBooking.key]: Popup(profilePopups.EditBooking.key, profilePopups.EditBooking.title, this.userData?.role !== Role.Guest),
				[profilePopups.Coupon.key]: Popup(profilePopups.Coupon.key, profilePopups.Coupon.title, this.userData?.role !== Role.Guest, 'coupons'),
				[profilePopups.Users.key]: Popup(profilePopups.Users.key, profilePopups.Users.title, this.userData?.role === Role.Admin, 'users'),
				[profilePopups.UsersBookings.key]: Popup(profilePopups.UsersBookings.key, profilePopups.UsersBookings.title, this.userData?.role === Role.Admin, 'list'),
				[profilePopups.UserUpdate.key]: Popup(profilePopups.UserUpdate.key, profilePopups.UserUpdate.title, this.userData?.role === Role.Admin),
				[profilePopups.ForgotPassword.key]: Popup(profilePopups.ForgotPassword.key, profilePopups.ForgotPassword.title, true),
				[profilePopups.RestorePassword.key]: Popup(profilePopups.RestorePassword.key, profilePopups.RestorePassword.title, true),
			}
		}
	},
	data() {
		return {
			profile: {
				socket: null as unknown as WebSocket,
				attempts: 0,
				connected: false,
				restart: true,
			},
			pages: Object.values(ProfilePagesGuest),
			lastRequest: {action: '', params: {}} as iParams,
		}
	},
	methods: {
		getActionAccount(data: iEventData) {
			let popup: iPopup | null
			switch (data.action) {
				case AccountActions.Update:
					this.openConfirmPopup(Messages.UpdateProfile, {
						action: this.sendAccountAction,
						params: [data]
					})
					break
				case AccountActions.Delete:
					this.openConfirmPopup(Messages.DeleteProfile, {
						action: this.sendAccountAction,
						params: [data]
					})
					break
				case AccountActions.Login:
				case AccountActions.Register:
				case AccountActions.ForgotPassword:
					this.sendAccountAction(data)
					this.closePopup()
					break
				case AccountActions.Logout:
					this.sendAccountAction(data)
					this.closePopup()
					break
				case AccountActions.UserData:
					this.sendAccountAction(data)
					break
				case AccountActions.OpenForgotPassword:
					popup = this.popups[profilePopups.ForgotPassword.key]
					this.popupManager.add(popup.open(false))
					break
				case AccountActions.RestorePassword:
					popup = this.popupManager.getPopup()
					if (popup && popup.getData())
					this.sendAccountAction({
						action: data.action,
						params: {
							...data.params,
							code: popup.getData().code,
						}
					})
					this.closePopup()
					break
				default:
					break
			}
		},
		sendAccountAction(data: iEventData) {
			this.sendEvent({
				action: EmitActions.Account,
				params: data
			})
		},
		setProfileData(popup: iPopup, data: iUser) {
			popup.setData({
				...data,
			})
		},
		manageProfilePopup(popup: iPopup) {
			this.setProfileData(popup, this.userData)
			return popup.open(false)
		},
		setBookingParams(popup: iPopup, active: boolean) {
			popup.setParams({
				action: ProfileActions.GetRecapBookings,
				params: {active: active}
			})
			this.requestDataFromPopup(popup)
		},
		setBookingData(popup: iPopup, active: boolean, bookings: iBookingContent[] = []) {
			popup.setData({active,bookings})
		},
		manageBookingPopup(popup: iPopup) {
			this.setBookingParams(popup, true)
			this.setBookingData(popup, true)
			return popup.open()
		},
		setCouponParams(popup: iPopup) {
			popup.setParams({
				action: ProfileActions.GetCoupon,
				params: {}
			})
			this.requestDataFromPopup(popup)
		},
		setCouponData(popup: iPopup, count: number, discount: number) {
			popup.setData({count, discount})
		},
		manageCouponPopup(popup: iPopup) {
			this.setCouponParams(popup)
			return popup.open()
		},
		setUsersParams(popup: iPopup, params: iObject, action=ProfileActions.GetUsers) {
			popup.setParams({
				action,
				params: params
			})
			this.requestDataFromPopup(popup)
		},
		setUsersData(popup: iPopup, users: iProfile[]) {
			popup.setData({users})
		},
		manageUsersPopup(popup: iPopup) {
			this.setUsersData(popup, [])
			return popup.open(false)
		},
		setUsersBookingsParams(popup: iPopup, params: iObject) {
			popup.setParams({
				action: ProfileActions.GetUsersBookings,
				params: params
			})
			this.requestDataFromPopup(popup)
		},
		setUsersBookingsData(popup: iPopup, bookings: iBookingContent[]) {
			popup.setData({bookings})
		},
		manageUsersBookingsPopup(popup: iPopup) {
			this.setUsersBookingsData(popup, [])
			return popup.open(false)
		},
		setEditBookingParams(popup: iPopup, action: string, id: number) {
			popup.setParams({
				action,
				params: {id}
			})
			this.requestDataFromPopup(popup)
		},
		setEditBookingData(popup: iPopup, booking: iBookingContent) {
			popup.setData({...booking})
		},
		setUserUpdateParams(popup: iPopup, params: iObject, action=ProfileActions.GetUserDetails) {
			popup.setParams({
				action,
				params: params
			})
			this.requestDataFromPopup(popup)
		},
		setUserUpdateData(popup: iPopup, user: iUserData) {
			popup.setData({...user})
		},
		openPopup(popup: iPopup) {
			let _popup;
			switch (popup.getKey()) {
				case profilePopups.Profile.key:
					_popup = this.manageProfilePopup(popup)
					break
				case profilePopups.Bookings.key:
					_popup = this.manageBookingPopup(popup)
					break
				case profilePopups.Coupon.key:
					_popup = this.manageCouponPopup(popup)
					break
				case profilePopups.Users.key:
					_popup = this.manageUsersPopup(popup)
					break
				case profilePopups.UsersBookings.key:
					_popup = this.manageUsersBookingsPopup(popup)
					break
				default:
					_popup = popup.open(false)
					break
			}
			this.popupManager.add(_popup)
		},
		closePopup() {
			this.popupManager.remove()
			const popup = this.popupManager.getPopup()
			if (popup !== null) {
				this.requestDataFromPopup(popup)
			}
		},
		socketOnMessage (response: iSocketResult, message: iMessageContent) {
			const content = response.result.content

			switch (response.actionName) {
				case ProfileActions.GetCoupon:
					if (content?.coupon) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.Coupon.key) {
							this.setCouponData(popup, content.coupon.count, content.coupon.discount)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetRecapBookings:
					if (content?.bookings) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.Bookings.key) {
							this.setBookingData(popup, popup.getData().active, content.bookings)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetBooking:
					if (content?.booking) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.EditBooking.key) {
							this.setEditBookingData(popup, content.booking)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetBookingInternalData:
					if (content?.internalNote) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.EditBooking.key) {
							popup.setData(
								{
									...popup.getData(),
									internalNote: content.internalNote
								}
							)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetAllBookingData:
					if (content?.booking) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.EditBooking.key) {
							this.setEditBookingData(popup, content.booking)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.CancelBooking:
				case ProfileActions.EditBookingInternalData:
				case ProfileActions.EditBooking:
				case ProfileActions.EditUser:
					message.show = true
					break
				case ProfileActions.GetUsersBookings:
					if (content?.bookings) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.UsersBookings.key) {
							this.setUsersBookingsData(popup, content.bookings)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetUsers:
					if (content?.users) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.Users.key) {
							this.setUsersData(popup, content.users)
							popup.setLoading(false)
						}
					}
					break
				case ProfileActions.GetUserDetails:
					if (content?.user) {
						const popup = this.popupManager.getPopup()
						if (popup?.getKey() === profilePopups.Users.key) {
							const users = popup.getData().users as iUserData[]
							const id = users.findIndex((u) => u.id === content.user.id)
							if (id !== -1) {
								users[id] = {
									...users[id],
									...content.user,
								}
								popup.setData({users})
							}
						}
						else if (popup?.getKey() === profilePopups.UserUpdate.key) {
							this.setUserUpdateData(popup, content.user)
							popup.setLoading(false)
						}
					}
					break
				default:
					break
			}
		},
		setPages() {
			switch (this.userData?.role) {
				case Role.Admin:
					this.pages = Object.values(ProfilePagesAdmin)
					break
				case Role.User:
					this.pages = Object.values(ProfilePagesUser)
					break
				default:
					this.pages = Object.values(ProfilePagesGuest)
					break
			}
		},
		getRecapBookingData(active = true) {
			const popup = this.popupManager.getPopupByKey(profilePopups.Bookings.key)
			if (popup !== null) {
				this.setBookingParams(popup, active)
				popup.setLoading(true)
			}
		},
		getBookingData(id: number) {
			const popup = this.popupManager.getPopupByKey(profilePopups.EditBooking.key)
			if (popup !== null) {
				const action = this.userData?.role === Role.Admin ? ProfileActions.GetAllBookingData : ProfileActions.GetBooking
				this.setEditBookingParams(popup, action, id)
				popup.setLoading(true)
			}
		},
		cancelBooking(booking: iBookingContent) {
			if ([Status.CANCELLED, Status.COMPLETED, Status.FREE].includes(booking.status)) {
				this.sendError(Errors.DeleteBookingCompletedFree)
				return
			}
			this.openConfirmPopup(Messages.CancelBooking, {
				action: this.sendSocketMessage,
				params: [{
					actionName: ProfileActions.CancelBooking,
					actionParams: {id: booking.id}
				}]
			})
		},
		cancelBookingUsersBookings(booking: iBookingContent) {
			this.cancelBooking(booking)
		},
		cancelBookingRecap(booking: iBookingContent) {
			this.cancelBooking(booking)
		},
		openEditBooking(booking: iBookingContent) {
			const popup = this.popups[profilePopups.EditBooking.key]
			this.popupManager.add(popup.open())
			this.getBookingData(booking.id)
		},
		openEditBookingRecap(booking: iBookingContent) {
			this.openEditBooking(booking)
		},
		openEditBookingUsersBookings(booking: iBookingContent) {
			this.openEditBooking(booking)
		},
		editBooking(bookingAttributes: iObject) {
			let title = Messages.EditInternalData
			let actionName = ProfileActions.EditBookingInternalData
			const editInternalKeys = ['id', 'internalNote']
			if (Object.keys(bookingAttributes).length === editInternalKeys.length) {
				for (const key of editInternalKeys) {
					if (!Object.keys(bookingAttributes).includes(key)) {
						title = Messages.EditBooking
						actionName = ProfileActions.EditBooking
						break
					}
				}
			}
			else {
				title = Messages.EditBooking
				actionName = ProfileActions.EditBooking
			}
			this.openConfirmPopup(title, {
				action: this.sendSocketMessage,
				params: [{
					actionName: actionName,
					actionParams: bookingAttributes
				}]
			})
		},
		searchBookings(params: iObject) {
			const popup = this.popupManager.getPopupByKey(profilePopups.UsersBookings.key)
			if (popup !== null) {
				this.setUsersBookingsParams(popup, params)
				popup.setLoading(true)
			}
		},
		searchUsers(params: iObject) {
			const popup = this.popupManager.getPopupByKey(profilePopups.Users.key)
			if (popup !== null) {
				this.setUsersParams(popup, params)
				popup.setLoading(true)
			}
		},
		openEditUser(id: number) {
			const popup = this.popups[profilePopups.UserUpdate.key]
			this.setUserUpdateParams(popup, {id})
			this.popupManager.add(popup.open())
		},
		editUser(userAttributes: iObject) {
			this.openConfirmPopup(Messages.EditUser, {
				action: this.sendSocketMessage,
				params: [{
					actionName: ProfileActions.EditUser,
					actionParams: userAttributes
				}]
			})
		},
		getDetails(id: number) {
			const popup = this.popupManager.getPopupByKey(profilePopups.Users.key)
			if (popup !== null) {
				this.sendSocketMessage({
					actionName: ProfileActions.GetUserDetails,
					actionParams: {id: id}
				})
			}
		},
		async initRequests() {
			if (window.location.search.includes('?') && window.location.pathname.toLowerCase() === '/profile') {
				const urlParams = new URLSearchParams(window.location.search)
				if (urlParams.has('restore_password')) {
					const popup = this.popups[profilePopups.RestorePassword.key]
					popup.setData({code: String(urlParams.get('restore_password'))})
					this.popupManager.add(popup.open(false))
				}
			}
			else {
				// pass
			}
		},
		requestDataFromPopup(popup: iPopup) {
			this.sendSocketMessage({
				actionName: popup.getParams().action,
				actionParams: popup.getParams().params
			})
		}
	},
	watch: {
		userData: {
			handler: function() {
				if (this.popupManager.isOpen()) {
					const popup = this.popupManager.getPopup()
					if (popup?.getKey() === profilePopups.Profile.key) {
						this.setProfileData(popup, this.userData)
					}
				}
			},
			deep: true
		},
		'userData.identifier'() {
			if (checkString(this.userData.identifier)) {
				this.initSocket(urlProfile, this.socketOnMessage)
			}
		},
		'settings.visible'() {
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
	},
	mounted() {
		this.setPages()
		if (checkString(this.userData.identifier)) {
			this.initSocket(urlProfile, this.socketOnMessage)
		}
		this.initRequests()
	},
	emits: [EmitActions.Account,]
})
</script>

<template>
	<TemplateView>
		<Transition name='popup'>
			<div
				class='Profile'
			>
				<Card
					v-for='popup in Object.values(popups).filter((p) => p.getPermission() && p.getIcon())'
					height='30vh'

					:key='popup.getKey()'
					:colors='colors'
					:label='popup.getTitle()'

					@click='openPopup(popup)'
				>
					<SvgIcon
						size='90px'
						:effect='false'

						:icon='popup.getIcon()'
					/>
				</Card>
			</div>
		</Transition>
		<Transition name='popup'>
			<AccessPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.Access.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@action='getActionAccount'
				@error='sendMessage'
			/>
		</Transition>
		<Transition name='popup'>
			<ProfilePopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.Profile.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:title='popupManager.getPopup()?.getTitle()'
				:defaultData='popupManager.getPopup()?.getData()'

				@action='getActionAccount'
				@close='closePopup'
				@error='sendMessage'
			/>
		</Transition>
		<Transition name='popup'>
			<CouponPopup
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.Coupon.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:defaultData='popupManager.getPopup()?.getData()'
				:title='popupManager.getPopup()?.getTitle()'
				:role='userData.role'
				:isLoading='popupManager.getPopup()?.isLoading()'
				:lines='Math.ceil(popupManager.getPopup()?.getData()?.count/4)'
				:max='Math.ceil(popupManager.getPopup()?.getData()?.count/4)*4'

				@action='getActionAccount'
				@close='closePopup'
			/>
		</Transition>
		<Transition name='popup'>
			<BookingRecap
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.Bookings.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:bookings='popupManager.getPopup()?.getData()?.bookings'
				:role='userData.role'
				:title='popupManager.getPopup()?.getTitle()'
				:isLoading='popupManager.getPopup()?.isLoading()'

				@close='closePopup'
				@cancelBooking='cancelBookingRecap'
				@error='sendMessage'
				@active='getRecapBookingData'
				@edit='openEditBookingRecap'
			/>
		</Transition>
		<Transition name='popup'>
			<BookingUpdate
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.EditBooking.key)?.isVisible()'

				:booking='popupManager.getPopup()?.getData()'
				:title='popupManager.getPopup()?.getTitle()'
				:role='userData.role'
				:colors='colors'
				:isViewOnly='false'
				:device='device'

				@editBooking='editBooking'
				@close='closePopup'
			/>
		</Transition>
		<Transition name='popup'>
			<BookingsManage
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.UsersBookings.key)?.isVisible()'

				:bookings='popupManager.getPopup()?.getData()?.bookings'
				:title='popupManager.getPopup()?.getTitle()'
				:colors='colors'
				:device='device'
				:isLoading='popupManager.getPopup()?.isLoading()'
				:params='popupManager.getPopup()?.getParams()?.params'

				@close='closePopup'
				@search='searchBookings'
				@error='sendMessage'
				@cancelBooking='cancelBookingUsersBookings'
				@edit='openEditBookingUsersBookings'
			/>
		</Transition>
		<Transition name='popup'>
			<UsersManage
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.Users.key)?.isVisible()'

				:users='popupManager.getPopup()?.getData()?.users'
				:title='popupManager.getPopup()?.getTitle()'
				:colors='colors'
				:device='device'
				:isLoading='popupManager.getPopup()?.isLoading()'
				:params='popupManager.getPopup()?.getParams()?.params'

				@close='closePopup'
				@edit='openEditUser'
				@getDetails='getDetails'
				@search='searchUsers'
				@error='sendMessage'
			/>
		</Transition>
		<Transition name='popup'>
			<UserUpdate
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.UserUpdate.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:title='popupManager.getPopup()?.getTitle()'
				:isLoading='popupManager.getPopup()?.isLoading()'
				:user='popupManager.getPopup()?.getData()'

				@close='closePopup'
				@editUser='editUser'
				@error='sendMessage'
			/>
		</Transition>
		<Transition name='popup'>
			<ForgotPassword
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.ForgotPassword.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@action='getActionAccount'
				@error='sendMessage'
			/>
		</Transition>
		<Transition name='popup'>
			<RestorePassword
				v-if='popupManager.isOpen() && popupManager.getPopupByKey(profilePopups.RestorePassword.key)?.isVisible()'

				:colors='colors'
				:device='device'
				:title='popupManager.getPopup()?.getTitle()'

				@close='closePopup'
				@action='getActionAccount'
				@error='sendMessage'
			/>
		</Transition>
	</TemplateView>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/views/Profile';
</style>