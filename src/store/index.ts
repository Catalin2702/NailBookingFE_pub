import {createStore} from 'vuex'
import {Role} from "@/utils/constants"

export default createStore({
	state: {
		email: localStorage.getItem('email') || '',
		uuid: localStorage.getItem('uuid') || '',
		identifier: '',
		role: Number(localStorage.getItem('role')) || Role.Guest,
		theme: Number(localStorage.getItem('theme')),
	},
	getters: {
		getEmail: state => state.email,
		getUuid: state => state.uuid,
		getIdentifier: state => state.identifier,
		getRole: state => state.role,
		getTheme: state => state.theme,
	},
	mutations: {
		setEmail(state, email) {
			state.email = email
		},
		saveEmail(state) {
			if (state.email === '') {
				localStorage.removeItem('email')
				return
			}
			localStorage.setItem('email', state.email)
		},
		setUuid(state, uuid) {
			state.uuid = uuid
		},
		saveUuid(state) {
			if (state.uuid === '') {
				localStorage.removeItem('uuid')
				return
			}
			localStorage.setItem('uuid', state.uuid)
		},
		setIdentifier(state, identifier) {
			state.identifier = identifier
		},
		setRole(state, role) {
			state.role = role
		},
		saveRole(state) {
			localStorage.setItem('role', String(state.role))
		},
		setTheme(state, theme) {
			state.theme = theme
		},
		saveTheme(state) {
			localStorage.setItem('theme', String(state.theme))
		},
	},
	actions: {
		setEmail({commit}, email) {
			commit('setEmail', email)
		},
		setUuid({commit}, uuid) {
			commit('setUuid', uuid)
		},
		setIdentifier({commit}, identifier) {
			commit('setIdentifier', identifier)
		},
		setRole({commit}, role) {
			commit('setRole', role)
		},
		saveEmail({commit}) {
			commit('saveEmail')
		},
		saveUuid({commit}) {
			commit('saveUuid')
		},
		saveRole({commit}) {
			commit('saveRole')
		},
		setTheme({commit}, theme) {
			commit('setTheme', theme)
		},
		saveTheme({commit}) {
			commit('saveTheme')
		},
	},
	modules: {}
})
