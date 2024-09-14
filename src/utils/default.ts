import {iViewDataHome, iSection, iViewDataBooking, iCalendar, iSelectedMonth, iBookingContent, iBooking, iProfile, iCouponData, iSelected, iUser, iDate, iViewDataGallery, iGallery, iButton, iButtons, iScroll, iFeedback, iViewFeedback, iViewSettings, iUserData, iUserUpdateData} from '@/utils/interfaces'
import {Role} from '@/utils/constants'

const today = new Date()

const defaultViewSettings: iViewSettings = {
	visible: false,
	currentPage: '',
}

const defaultSection: iSection = {
	order: 0,
	title: '',
	description: '',
	images: [''],
	type: ''
}
const defaultViewDataHome: iViewDataHome = {
	headerImage: defaultSection,
	sections: [
		defaultSection
	],
}

const defaultGallery: iGallery = {
	id: -1,
	image: '',
	title: '',
	description: '',
	order: 0,
	loading: true,
}

const defaultFeedback: iFeedback = {
	id: -1,
	title: null,
	description: null,
	rating: 0,
}

const defaultViewGallery: iViewDataGallery = {
	gallery: [defaultGallery]
}

const defaultViewFeedback: iViewFeedback = {
	feedback: [defaultFeedback]
}
const defaultProfile: iProfile = {
	name: '',
	surname: '',
	email: '',
	phone: '',
	birthday: '',
	instagram: '',
	role: Role.Guest,
	valid: false,
}
const defaultUserData: iUser = {
	...defaultProfile,
	uuid: '',
	identifier: '',
}
const defaultBookingContent: iBookingContent = {
	...defaultProfile,
	id: -1,
	start: '',
	end: '',
	note: '',
	status: 'FREE',
	editable: false,
	date: '0000-00-00',
	other: false,
	acceptable: false,
	confirmable: false,
	disposable: false,
	erasable: false,
	internalNote: '',
}
const defaultBooking: iBooking = {
	'': [
		defaultBookingContent,
	]
}
const defaultCalendar: iCalendar = {
	d: 0,
	m: 0,
	y: 0,
	dw: '',
	r: [defaultBookingContent],
}
const defaultCalendarOptions: iCalendar[] = [defaultCalendar]

const defaultSelectedMonth: iSelectedMonth = {
	month: today.getMonth() + 1,
	year: today.getFullYear(),
	today: true,
}
const defaultViewDataBooking: iViewDataBooking = {
	selectOptions: [defaultSelectedMonth],
	calendar: [
		defaultCalendar
	]
}
const defaultSelected: iSelected = {
	value: '',
	label: '',
}
const defaultSelectOptions: iSelected[] = [defaultSelected]

const defaultSelectMonthOptions: iSelectedMonth[] = [defaultSelectedMonth]
const defaultCouponData: iCouponData = {
	discount: 0,
	count: 0,
}
const defaultUsersData: iUserData = {
	...defaultProfile,
	id: -1,
	coupon: defaultCouponData,
	internalNote: '',
}
const defaultUserUpdateData: iUserUpdateData = {
	...defaultProfile,
	id: -1,
	coupon: defaultCouponData,
	internalNote: '',
}

const defaultDate: iDate = {
	y: 0,
	m: 0,
	d: 0,
	show: false,
}

const defaultButton: iButton = {
	icon: '',
	size: '',
	effect: false,
	flipX: false,
	flipY: false,
}

const defaultButtons: iButtons = {
	left: defaultButton,
	top: defaultButton,
	right: defaultButton,
	bottom: defaultButton,
}

const defaultScroll: iScroll = {
	scroll: false,
	limit: 0,
}

export {
	defaultViewSettings,
	defaultSection,
	defaultViewDataHome,
	defaultCalendar,
	defaultFeedback,
	defaultCalendarOptions,
	defaultViewDataBooking,
	defaultSelected,
	defaultSelectOptions,
	defaultSelectedMonth,
	defaultSelectMonthOptions,
	defaultProfile,
	defaultUserData,
	defaultBooking,
	defaultBookingContent,
	defaultUsersData,
	defaultUserUpdateData,
	defaultCouponData,
	defaultDate,
	defaultGallery,
	defaultViewGallery,
	defaultViewFeedback,
	defaultButton,
	defaultButtons,
	defaultScroll,
}