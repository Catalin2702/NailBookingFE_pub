const url = process.env.VUE_APP_API_URL || window.location.host.split(':')[0] + ':8000'
const api_protocol = process.env.VUE_APP_API_PROTOCOL || 'http://'
const ws_protocol = process.env.VUE_APP_WS_PROTOCOL || 'ws://'
const urlView = `${ws_protocol}${url}/ws/view/`
const urlBooking = `${ws_protocol}${url}/ws/booking/`
const urlAccount = `${ws_protocol}${url}/ws/account/`
const urlProfile = `${ws_protocol}${url}/ws/profile/`

const Messages = {
	UpdateProfile: 'Sei sicuro di voler modificare il tuo profilo?',
	DeleteProfile: 'Sei sicuro di voler eliminare il tuo profilo?',
	CancelBooking: 'Sei sicuro di voler annullare la prenotazione?',
	EditInternalData: 'Sei sicuro di voler modificare i dati interni?',
	EditBooking: 'Sei sicuro di voler modificare la prenotazione?',
	EditUser: 'Sei sicuro di voler modificare l\'utente?',
	RequestBooking: 'Richiedi prenotazione',
	NewBooking: 'Nuova prenotazione',
	ConfirmBooking: 'Conferma prenotazione',
	AcceptBooking: 'Accetta prenotazione',
	DeleteBooking: 'Sei sicuro di voler eliminare la prenotazione?',
}

const Errors = {
	NoData: 'Nessun dato disponibile',
	NoBooking: 'Nessuna prenotazione disponibile',
	NoBookingRegistered: 'Nessuna prenotazione registrata',
	DeleteBookingCompletedFree: 'Impossibile cancellare una prenotazione già completata, cancellata o libera',
	NoUser: {
		Coupon: 'Accedi o registrati per vedere i tuoi coupon!',
	}
}

enum Theme {
	Dark ,
	Light,
}
const themeLabel = [
	'Dark', 'Light'
]
enum Device {
	Desktop,
	Mobile
}
enum Role {
	Guest,
	Anon,
	User,
	Admin
}
const NoAuth = [Role.Guest, Role.Anon]
enum Justify {
	SpaceBetween,
	SpaceAround,
	SpaceEvenly,
	Center,
	Left,
	Right,
	Justify,
}
enum Align {
	Center,
	Top,
	Bottom,
	SpaceBetween,
	SpaceAround,
	SpaceEvenly,
}
enum CardType {
	// noinspection JSUnusedGlobalSymbols
	Icon,
	Card,
}

enum Buttons {
	Left,
	Top,
	Right,
	Bottom,
}
const Input = {
	Date: 'date',
	DateTime: 'datetime-local',
	Time: 'time',
	Number: 'number',
	Email: 'email',
	Password: 'password',
	Text: 'text',
	Phone: 'tel',
	Url: 'url',
	Area: 'textarea',
	Select: 'select',
	Checkbox: 'checkbox',
}
const Status = {
	BOOKED: 'BOOKED',
	CANCELLED: 'CANCELLED',
	COMPLETED: 'COMPLETED',
	CONFIRMED: 'CONFIRMED',
	FREE: 'FREE',
	PENDING: 'PENDING',
	PAUSED: 'PAUSED',
}
const StatusLabel = {
	[Status.BOOKED]: 'Prenotato',
	[Status.CANCELLED]: 'Annullato',
	[Status.COMPLETED]: 'Completato',
	[Status.CONFIRMED]: 'Confermato',
	[Status.FREE]: 'Libero',
	[Status.PENDING]: 'In attesa',
	[Status.PAUSED]: 'In pausa',
}
const RolesLabel = {
	[Role.Guest]: 'Ospite',
	[Role.Anon]: 'Anonimo',
	[Role.User]: 'Utente',
	[Role.Admin]: 'Amministratore',
}
const States = Object.entries(StatusLabel).map(([value, label]) => ({value, label}))
const Roles = Object.entries(RolesLabel).map(([value, label]) => ({value, label}))
const Days = {
	MONDAY: 0,
	TUESDAY: 1,
	WEDNESDAY: 2,
	THURSDAY: 3,
	FRIDAY: 4,
	SATURDAY: 5,
	SUNDAY: 6,
}
const DayLabel = {
	[Days.MONDAY]: 'Lunedì',
	[Days.TUESDAY]: 'Martedì',
	[Days.WEDNESDAY]: 'Mercoledì',
	[Days.THURSDAY]: 'Giovedì',
	[Days.FRIDAY]: 'Venerdì',
	[Days.SATURDAY]: 'Sabato',
	[Days.SUNDAY]: 'Domenica',
}
const BirthdayDefault = () => {
	const date = new Date()
	date.setFullYear(date.getFullYear() - 20)
	return date.toISOString().slice(0, 10)
}
const minPasswordLength = 8
const Routes = {
	Home: 'Home',
	Booking: 'Booking',
	Gallery: 'Gallery',
	// Contact: 'Contact',
	Feedback: 'Feedback',
	Profile: 'Profile',
}

const HomeViewTypes = {
	Header: 'HEADER',
	Section: 'SECTION',
	BeforeAfter: 'BEFORE_AFTER',
	Carousel: 'CAROUSEL',
}

const GeneralViewActions = {
	ViewData: 'viewData',
	DeviceData: 'deviceData',
}
const HomeViewActions = {
	ThemeData: 'themeData',
}
const BookingViewActions = {
	GetSelectedData: 'getSelectedData',
}

const GalleryViewActions = {
	GetImageData: 'getImageData',
	GetNextImages: 'getNextImages',
}

const FeedbackViewActions = {
	GetFeedbackData: 'getFeedbackData',
	GetNextFeedbacks: 'getNextFeedbacks',
	CreateNewFeedback: 'createNewFeedback',
}
const ViewActions = {
	...GeneralViewActions,
	Home: HomeViewActions,
	Booking: BookingViewActions,
	Gallery: GalleryViewActions,
	Feedback: FeedbackViewActions,
}

const AccountActions = {
	Login: 'login',
	Register: 'register',
	Logout: 'logout',
	Delete: 'delete',
	Update: 'update',
	UserData: 'userData',
	GuestLogin: 'guestLogin',
	OpenForgotPassword: 'openForgotPassword',
	ForgotPassword: 'forgotPassword',
	RestorePassword: 'restorePassword',
}

const BookingActions = {
	GetCalendarData: 'getCalendarData',
	BookBooking: 'bookBooking',
	CreateBooking: 'createBooking',
	CancelBooking: 'cancelBooking',
	DeleteBooking: 'deleteBooking',
	EditBooking: 'editBooking',
	EditBookingInternalData: 'editBookingInternalData',
	RequestBooking: 'requestBooking',
	GetBooking: 'getBooking',
	GetBookings: 'getBookings',
	AcceptBooking: 'acceptBooking',
	ConfirmBooking: 'confirmBooking',
	GetBookingInternalData: 'getBookingInternalData',
	GetAllBookingData: 'getAllBookingData',
	Reload: 'reload',
}

const ProfileActions = {
	GetRecapBookings: 'getRecapBookings',
	GetCoupon: 'getCoupon',
	CancelBooking: 'cancelBooking',
	EditBooking: 'editBooking',
	GetBooking: 'getBooking',
	GetBookingInternalData: 'getBookingInternalData',
	GetAllBookingData: 'getAllBookingData',
	EditBookingInternalData: 'editBookingInternalData',
	GetUsersBookings: 'getUsersBookings',
	GetUsers: 'getUsers',
	EditUser: 'editUser',
	GetUserDetails: 'getUserDetails',
}

const EmitActions = {
	ScrollElement: 'scrollElement',
	SetParams: 'setParams',
	Account: 'account',
	GetImageData: 'getImageData',
	GetNextImages: 'getNextImages',
	GetFeedbackData: 'getFeedbackData',
	GetNextFeedbacks: 'getNextFeedbacks',
	CrateNewFeedback: 'createNewFeedback',
}

const ProfilePagesNames = {
	Bookings: 'Bookings',
	// Settings: 'Settings',
}

const ProfilePagesNamesGuest = {
	Access: 'Access',
	...ProfilePagesNames,
}

const ProfilePagesNamesUser = {
	Profile: 'Profile',
	...ProfilePagesNames,
	Coupons: 'Coupons',
}

const ProfilePagesNamesAdmin = {
	...ProfilePagesNamesUser,
	Users: 'Users',
	UsersBookings: 'UsersBookings',
}

const ProfilePages = {
	[ProfilePagesNames.Bookings]: {
		title: 'Prenotazioni',
		icon: 'bookings',
		key: 'Bookings'
	},
	// [ProfilePagesNames.Settings]: {
	// 	title: 'Impostazioni',
	// 	icon: 'settings',
	// 	key: 'Settings',
	// },
}

const ProfilePagesGuest = {
	[ProfilePagesNamesGuest.Access]: {
		title: 'Login|Registrati',
		icon: 'login',
		key: 'Access'
	},
	...ProfilePages,
}

const ProfilePagesUser = {
	[ProfilePagesNamesUser.Profile]: {
		title: 'Profilo',
		icon: 'profile',
		key: 'Profile'
	},
	...ProfilePages,
	[ProfilePagesNamesUser.Coupons]: {
		title: 'Coupons',
		icon: 'coupons',
		key: 'Coupons'
	},
}

const ProfilePagesAdmin = {
	...ProfilePagesUser,
	[ProfilePagesNamesAdmin.Users]: {
		title: 'Utenti',
		icon: 'users',
		key: 'Users'
	},
	[ProfilePagesNamesAdmin.UsersBookings]: {
		title: 'Prenotazioni utenti',
		icon: 'list',
		key: 'UsersBookings'
	},
}

const commonPopups = {
	Confirm: {
		key: 'Confirm',
		title: '',
	},
}

const bookingPopups = {
	...commonPopups,
	Booking: {
		key: 'Booking',
		title: 'Prenotazione',
	},
	NewBooking: {
		key: 'NewBooking',
		title: 'Aggiungi prenotazione'
	},
	RequestBooking: {
		key: 'RequestBooking',
		title: 'Richiedi prenotazione'
	},
	Bookings: {
		key: 'Bookings',
		title: '',
	},
	EditBooking: {
		key: 'EditBooking',
		title: 'Modifica prenotazione',
	},
}

const profilePopups = {
	...commonPopups,
	Access: {
		key: 'Access',
		title: 'Login'
	},
	Profile: {
		key: 'Profile',
		title: 'Profilo',
	},
	Bookings: {
		key: 'Bookings',
		title: 'Prenotazioni',
	},
	EditBooking: {
		key: 'EditBooking',
		title: 'Modifica prenotazione',
	},
	Settings: {
		key: 'Settings',
		title: 'Impostazioni',
	},
	Coupon: {
		key: 'Coupon',
		title: 'Coupon',
	},
	Users: {
		key: 'Users',
		title: 'Utenti',
	},
	NewBookings: {
		key: 'NewBookings',
		title: 'Nuove prenotazioni',
	},
	UsersBookings: {
		key: 'UsersBookings',
		title: 'Prenotazioni utenti',
	},
	UserUpdate: {
		key: 'UserUpdate',
		title: 'Modifica utente',
	},
	ForgotPassword: {
		key: 'ForgotPassword',
		title: 'Password dimenticata',
	},
	RestorePassword: {
		key: 'RestorePassword',
		title: 'Ripristina password',
	},
}

const galleryPopups = {
	Image: {
		key: 'Image',
		title: '',
	}
}

const feedbackPopups = {
	Feedback: {
		key: 'Feedback',
		title: '',
	},
	NewFeedback: {
		key: 'NewFeedback',
		title: 'Aggiungi recensione',
	},
}

export {
	url,
	api_protocol,
	ws_protocol,
	urlView,
	urlBooking,
	urlAccount,
	urlProfile,
	Messages,
	Errors,
	Theme,
	themeLabel,
	Device,
	Role,
	NoAuth,
	Justify,
	Align,
	CardType,
	Buttons,
	Input,
	Status,
	StatusLabel,
	RolesLabel,
	States,
	Roles,
	Days,
	DayLabel,
	BirthdayDefault,
	minPasswordLength,
	Routes,
	HomeViewTypes,
	HomeViewActions,
	BookingViewActions,
	ViewActions,
	AccountActions,
	BookingActions,
	ProfileActions,
	FeedbackViewActions,
	EmitActions,
	ProfilePagesNames,
	ProfilePagesNamesGuest,
	ProfilePagesNamesUser,
	ProfilePagesNamesAdmin,
	ProfilePages,
	ProfilePagesGuest,
	ProfilePagesUser,
	ProfilePagesAdmin,
	commonPopups,
	bookingPopups,
	profilePopups,
	galleryPopups,
	feedbackPopups,
}