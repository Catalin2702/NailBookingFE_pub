import {iBookingColors, iColors} from '@/utils/interfaces'
import {Color} from '@/utils/functions'

const Dark : iColors = {
	primary: new Color('#08044D', 1),
	secondary: new Color('#4A2E87', 1),
	tertiary: new Color('#FF76AD', 1),
	forth: new Color('#F1D1D0', 1),
	text: new Color('#E0E0E0', 1),
}

const Light : iColors = {
	primary: new Color('#E0E0E0', 1),
	secondary: new Color('#F1D1D0', 1),
	tertiary: new Color('#FF76AD', 1),
	forth: new Color('#4A2E87', 1),
	text: new Color('#08044D', 1),
}

const BookingPalette : iBookingColors = {
	free: new Color('#B0F0A5', 1),
	pending: new Color('#FFD09E', 1),
	booked: new Color('#AEF0FF', 1),
	confirmed: new Color('#FFA9DD', 1),
	completed: new Color('#A1B4FF', 1),
	cancelled: new Color('#FB9F9E', 1),
	paused: new Color('#9CAFAA', 1),
}

export {
	Dark,
	Light,
	BookingPalette,
}
