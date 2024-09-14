interface iObject {
	[key: string]: any,
}

interface iColor {
	red: number,
	green: number,
	blue: number,
	alpha: number,
	toRGB: () => string,
	toRGBA: (alpha: number | null | undefined) => string,
	toHEX: () => string,
	toString: () => string,
}
interface iColors {
	primary: iColor,
	secondary: iColor,
	tertiary: iColor,
	forth: iColor,
	text: iColor,
}
interface iBookingColors {
	free: iColor,
	pending: iColor,
	booked: iColor,
	confirmed: iColor,
	completed: iColor,
	cancelled: iColor,
	paused: iColor,
}
interface iViewSettings {
	visible: boolean,
	currentPage: string,
}
interface iSection {
	order: number,
	title: string,
	description: string,
	images: string[],
	type: string,
}

interface iGallery {
	id: number,
	order: number,
	title: string,
	description: string,
	image: string,
	loading: boolean,
}

interface iFeedback {
	id: number,
	title: string | null,
	description: string | null,
	rating: number,
}
interface iViewDataHome {
	headerImage: iSection,
	sections: iSection[],
}
interface iProfile {
	name: string,
	surname: string,
	email: string,
	phone: string,
	birthday: string,
	instagram: string,
	role: number,
	valid: boolean,
}
interface iUser extends iProfile {
	uuid: string,
	identifier: string,
}
interface iBookingContent extends iProfile {
	id: number,
	start: string,
	end: string,
	note: string,
	status: string,
	editable: boolean,
	date: string,
	other: boolean,
	acceptable: boolean,
	confirmable: boolean,
	disposable: boolean,
	erasable: boolean,
	internalNote: string | null,
}
interface iBooking {
	[key: string]: iBookingContent[],
}
interface iCalendar {
	d: number, // day
	m: number, // month
	y: number, // year
	dw: number | string, // day of the week
	r: iBookingContent[], // bookings
}
interface iSelected {
	value: string,
	label: string,
}
interface iSelectedMonth {
	month: number,
	year: number,
	today: boolean,
}
interface iViewDataBooking {
	selectOptions: iSelectedMonth[],
	calendar: iCalendar[],
}

interface iViewDataGallery {
	gallery: iGallery[],
}

interface iViewFeedback {
	feedback: iFeedback[],
}
interface Props {
	theme: number,
	colors: iColors,
	device: number,
	viewData: object,
	userData: iUser,
	settings: iViewSettings,
}
interface iRequestViewData {
	viewName: string,
	actionName: string,
	actionParams: object,
}
interface iRequestData {
	actionName: string,
	actionParams: iObject,
}
interface iEventData {
	action: string,
	params: any,
}
interface iParams {
	action: string,
	params: any,
}

interface iResponseResult {
	status: boolean,
	message: string,
	content: any,
}
interface iSocketResult {
	actionName: string,
	result: iResponseResult,
}
interface iViewResult extends iSocketResult {
	viewName: string,
}
interface iFormData {
	status: boolean,
	error: string,
	value: iObject,
}
interface iMessage {
	status: boolean,
	message: string,
}
interface iMessageContent extends iMessage{
	show: boolean,
}
interface iCouponData {
	discount: number,
	count: number,
}
interface iConfirmResponse {
	response: boolean,
	action: any,
	params: any,
}
interface iPopup {
    key: string
    title: string
    icon: string
    data: iObject
    show: boolean
    loading: boolean
    permission: boolean
    params: iParams

    toString(): string
    getKey(): string
    isShow(): boolean
    getTitle(): string
    getIcon(): string
    getData(): iObject
    isLoading(): boolean
    getPermission(): boolean
    getParams(): iParams
    setTitle(title: string): void
    setPermission(permission: boolean): void
    setParams(params: iParams): void
    setData(data: iObject): void
    setLoading(loading: boolean): void
    isVisible(): boolean
    open(loading?: boolean): this
	close(): void
	hide(): void
}
interface iPopups {
	[key: string]: iPopup,
}
interface iConfirm {
	action: (...params: any) => void,
	params: any
}
interface iUserData extends iProfile {
	id: number,
	coupon: iCouponData,
	internalNote: string,
}
interface iUserUpdateData extends iProfile {
	id: number,
	coupon: iCouponData,
	internalNote: string,
}
interface iDate {
	y: number,
	m: number,
	d: number,
	show: boolean,
}

interface iButton {
	icon: string,
	size: string,
	effect: boolean,
	flipX: boolean,
	flipY: boolean,
}

interface iButtons {
	left: iButton,
	top: iButton,
	right: iButton,
	bottom: iButton,
}

interface iScroll {
	scroll: boolean,
	limit: number,
}

interface iBookingManageForm {
	[key: string]: {
		placeholder: string,
		label: string,
		value: any,
	}
}

interface iTransformOptions {
  width?: number
  height?: number
  resize?: 'cover' | 'contain' | 'fill'
  quality?: number
  format?: 'origin'
}

interface iOptions {
	download?: string | boolean, transform?: iTransformOptions
}
interface iDictArrayString {
	[key: string]: string[],
}

export {
	iObject,
	iColor,
	iColors,
	iBookingColors,
	iViewSettings,
	iSection,
	iGallery,
	iFeedback,
	iCalendar,
	iProfile,
	iUser,
	iBookingContent,
	iBooking,
	iSelected,
	iSelectedMonth,
	iViewDataHome,
	iViewDataBooking,
	iViewDataGallery,
	iViewFeedback,
	Props,
	iRequestViewData,
	iRequestData,
	iEventData,
	iParams,
	iResponseResult,
	iSocketResult,
	iViewResult,
	iFormData,
	iMessage,
	iMessageContent,
	iCouponData,
	iUserUpdateData,
	iConfirmResponse,
	iPopup,
	iPopups,
	iConfirm,
	iUserData,
	iDate,
	iButton,
	iButtons,
	iScroll,
	iBookingManageForm,
	iTransformOptions,
	iOptions,
	iDictArrayString,
}