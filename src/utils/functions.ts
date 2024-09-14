import axios from 'axios'

import {RouteLocationNormalized} from 'vue-router'
import {iColor, iFormData, iObject, Props, iColors, iUser, iViewSettings, iResponseResult, iMessageContent, iDictArrayString, iParams, iPopup} from '@/utils/interfaces'
import {api_protocol, url} from '@/utils/constants'

const setProps = async (route: RouteLocationNormalized): Promise<Props> => ({
	theme: route.params.theme as unknown as number,
	colors: route.params.colors as unknown as iColors,
	device: route.params.device as unknown as number,
	viewData: route.params.viewData as object,
	userData: route.params.userData as object as iUser,
	settings: route.params.settings as object as iViewSettings,
})

const roundBorder = (index: number, length: number, radius = '8px') : string => {
	switch (index) {
		case 0:
			return `${radius} 0 0 0`
		case 6:
			return `0 ${radius} 0 0`
		case length - 7:
			return `0 0 0 ${radius}`
		case length - 1:
			return `0 0 ${radius} 0`
		default:
			return ''
	}
}

const getDataForm = (inputs: iObject[], defaults: iObject | null = null): iFormData => {
	const obj = {
		status: true,
		error: '',
		value: Object(),
	}
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i]
		if (!checkObject(input)) continue
		if (input.required) {
			if (input.value === '') {
				obj.error = `Compila il parametro '${input.placeholder}' per continuare`
				obj.status = false
				return obj
			}
			else if (['date'].includes(input.type) && isNaN(Date.parse(input.value))) {
				obj.error = `Il formato della data '${input.placeholder}' non è valido`
				obj.status = false
				return obj
			}
		}
		if (defaults === null || defaults[input.label] === undefined || defaults[input.label] !== input.value)
			obj.value[input.label] = input.value
	}
	return obj
}

const getDifference = (obj1: iObject, obj2: iObject): iObject => {
	const obj = Object()
	for (const key in obj1) {
		if (obj1[key] !== obj2[key])
			obj[key] = obj1[key]
	}
	return obj
}

const fill = (num: number, pad = 2, char = '0'): string => num.toString().padStart(pad, char)

const checkGeneral = (el: any): boolean => el !== undefined && el !== null
const checkString = (str: string | null | undefined): boolean => str !== '' && checkGeneral(str)
const checkArray = (arr: Array<any>): boolean => Array.isArray(arr) && arr.length > 0

const checkObject = (obj: iObject | null | undefined): boolean => obj !== null && obj !== undefined

const checkEmptyObject = (obj: iObject): boolean => checkObject(obj) && Object.keys(obj).length > 0

const checkStringArray = (arr: Array<string>): boolean => Array.isArray(arr) && arr.every(el => checkString(el))

class Color implements iColor {
	red: number
	green: number
	blue: number
	alpha: number
	constructor(color: string | Array<string>, alpha = 1) {
		if (typeof color === 'string') {
			const hex = color.replace('#', '')
			this.red = parseInt(hex.substring(0, 2), 16)
			this.green = parseInt(hex.substring(2, 4), 16)
			this.blue = parseInt(hex.substring(4, 6), 16)
		}
		else {
			this.red = parseInt(color[0])
			this.green = parseInt(color[1])
			this.blue = parseInt(color[2])
		}
		this.alpha = alpha
	}

	toRGB = () => `rgb(${this.red}, ${this.green}, ${this.blue})`
	toRGBA = (alpha: number | null | undefined) => `rgba(${this.red}, ${this.green}, ${this.blue}, ${checkGeneral(alpha) ? alpha : this.alpha})`
	toHEX = () => `#${this.red.toString(16).padStart(2, '0')}${this.green.toString(16).padStart(2, '0')}${this.blue.toString(16).padStart(2, '0')}`
	toString = () => this.toRGB()
}

const semiUrl = `${api_protocol}${url}/api`
const booking = 'booking'
const action = 'action'

const urlMapping: iDictArrayString = {
	confirm_booking: [booking, 'confirm_booking'],
	book_booking: [booking, 'book_booking'],
	new_booking: [booking, 'new_booking'],
	confirm_email: [action, 'confirm_email'],
	join_account: [action, 'join_account'],
	request_new_booking: [booking, 'request_new_booking'],
}

const handleRequests = (): Promise<iMessageContent> => {
	return new Promise((resolve) => {
		const urlParams = new URLSearchParams(window.location.search)
		for (const key in urlMapping) {
			if (urlParams.has(key)) {
				const finalUrl = [semiUrl, urlMapping[key].join('/'), String(urlParams.get(key)), ''].join('/')
				return axios.get(finalUrl,)
					.then((response) => {
						const result = response.data as unknown as iResponseResult
						resolve({
							message: result.message,
							status: result.status,
							show: true,
						})
					})
					.catch((error) => {
						console.error(error)
						resolve({
							message: error.toString(),
							status: false,
							show: true,
						})
					})
			}
		}
		resolve({
			message: '',
			status: false,
			show: false,
		})
	})
}

const Popup = (key: string, title: string, permission: boolean, icon = '', data: iObject = {}, params: iParams = {action: '', params: {}}): iPopup => {
	return {
		key: key,
		title: title,
		icon: icon,
		data: data,
		show: false,
		loading: false,
		permission: permission,
		params: params,

		toString: function() {
			return this.title
		},
		getKey: function(): string {
			return  this.key
		},
		isShow: function(): boolean {
			return this.show
		},
		getTitle: function(): string {
			return this.title
		},
		getIcon: function(): string {
			return this.icon
		},
		getData: function(): iObject {
			return this.data
		},
		isLoading: function(): boolean {
			return this.loading
		},
		getPermission: function(): boolean {
			return this.permission
		},
		getParams: function(): iParams {
			return this.params
		},
		setTitle: function(title: string) {
			this.title = title
		},
		setPermission: function(permission: boolean) {
			this.permission = permission
		},
		setParams: function(params: iParams) {
			this.params = Object.assign({}, params)
		},
		setData: function(data: iObject) {
			this.data = Object.assign({}, data)
		},
		setLoading: function(loading: boolean) {
			this.loading = loading
		},
		isVisible: function(): boolean {
			return this.isShow() && this.permission
		},

		open: function(loading = true): typeof this {
			this.show = true
			this.loading = loading
			return this
		},
		close: function() {
			this.show = false
			this.loading = true
			this.setData({})
			this.setParams({action: '', params: {}})
		},
		hide: function() {
			this.show = false
			this.loading = false
		}
	}
}

const PopupManager = {
    popups: [] as iPopup[],

    add(popup: iPopup) {
        if (this.findPopup(popup.getKey()) !== null)
            return
		const lastPopup = this.getPopup()
		if (lastPopup !== null)
			lastPopup.hide()
        this.popups.push(popup)
    },
	remove() {
		const lastPopup = this.popups.pop()
		if (lastPopup !== undefined)
			lastPopup.close()
		if (this.isOpen())
			this.popups[this.popups.length - 1].open()
	},

    isOpen() {
        return this.popups.length > 0
    },

    getPopup(): iPopup | null {
        return this.isOpen() ? this.popups[this.popups.length - 1] : null
    },

    getPopupByKey(key: string): iPopup | null {
        const popup = this.getPopup()
        return popup !== null && popup.getKey() === key ? popup : null
    },

    findPopup(key: string): iPopup | null {
        return this.popups.find(popup => popup.getKey() === key) || null
    }
}

export {
	setProps,
	roundBorder,
	getDataForm,
	getDifference,
	fill,
	checkArray,
	checkObject,
	checkEmptyObject,
	checkStringArray,
	checkString,
	checkGeneral,
	Color,
	handleRequests,
	Popup,
	PopupManager,
}