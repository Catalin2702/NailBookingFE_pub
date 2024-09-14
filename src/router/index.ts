import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {Routes} from "@/utils/constants"
import {setProps} from "@/utils/functions"

const routes: RouteRecordRaw[] = [
	{
		name: Routes.Home,
		path: '/',
		component: () => import('@/views/Home.vue'),
		props: route => setProps(route),
		alias: ['/home', '/index', '/Home'],
		meta: {title: Routes.Home}
	},
	{
		name: Routes.Booking,
		path: '/booking',
		component: () => import('@/views/Booking.vue'),
		props: (route) => setProps(route),
		alias: ['/Booking',],
		meta: {title: Routes.Booking}
	},
	{
		name: Routes.Gallery,
		path: '/gallery',
		component: () => import('@/views/Gallery.vue'),
		props: (route) => setProps(route),
		alias: ['/Gallery',],
		meta: {title: Routes.Gallery}
	},
	// {
	// 	name: Routes.Contact,
	// 	path: '/contact',
	// 	component: () => import('@/views/Contact.vue'),
	// 	props: (route) => setProps(route),
	// 	alias: ['/Contact',],
	// 	meta: {title: Routes.Contact}
	// },
	{
		name: Routes.Feedback,
		path: '/feedback',
		component: () => import('@/views/Feedback.vue'),
		props: (route) => setProps(route),
		alias: ['/Feedback',],
		meta: {title: Routes.Feedback}
	},
	{
		name: Routes.Profile,
		path: '/profile',
		component: () => import('@/views/Profile.vue'),
		props: (route) => setProps(route),
		alias: ['/Profile', '/Login', '/Register', '/Logout', '/login', '/register', '/logout'],
		meta: {title: Routes.Profile}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
})

export default router
