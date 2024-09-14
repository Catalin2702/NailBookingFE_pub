<script lang='ts'>
import {defineComponent, defineAsyncComponent} from 'vue'

import TemplateView from '@/views/Template.vue'
import {iViewFeedback, iEventData, iObject, iPopup, iPopups} from '@/utils/interfaces'
import {defaultFeedback, defaultViewFeedback} from '@/utils/default'
import {EmitActions, feedbackPopups} from '@/utils/constants'
import {Popup} from '@/utils/functions';

const FeedbackMenu = defineAsyncComponent(() => import('@/components/nav/Feedback.vue'))
const Section = defineAsyncComponent(() => import('@/components/sections/views/Feedback/Feedback.vue'))
const NewFeedbackPopup = defineAsyncComponent(() => import('@/components/popup/NewFeedback.vue'))
const FeedbackPopup = defineAsyncComponent(() => import('@/components/popup/Feedback.vue'))

export default defineComponent({
	name: 'FeedbackView',
	inheritAttrs: false,
	extends: TemplateView,
	components: {NewFeedbackPopup, FeedbackPopup, FeedbackMenu, TemplateView, Section},
	props: {
		viewData: {
			type: Object as () => iViewFeedback,
			default: defaultViewFeedback,
		}
	},
	computed: {
		popups: function(): iPopups {
			return {
				[feedbackPopups.Feedback.key]: Popup(feedbackPopups.Feedback.key, feedbackPopups.Feedback.title, true, '', {feedback: defaultFeedback, index: 0}),
				[feedbackPopups.NewFeedback.key]: Popup(feedbackPopups.NewFeedback.key, feedbackPopups.NewFeedback.title, true, '', {})
			}
		},
		feedbackPopups: () => feedbackPopups,
	},
	data() {
		return {
			ready: true,
		}
	},
	methods: {
		manageNewFeedbackPopup(popup: iPopup): iPopup {
			return popup.open(false)
		},
		setFeedbackData(popup: iPopup, index: number) {
			popup.setData({
				feedback: this.viewData.feedback[index],
				index: index
			})
		},
		manageFeedbackPopup(popup: iPopup, index: number) {
			this.setFeedbackData(popup, index)
			return popup.open(false)
		},
		openCreate() {
			this.popupManager.add(this.manageNewFeedbackPopup(this.popups[feedbackPopups.NewFeedback.key]))
		},
		select(params: iObject) {
			if (params.index < 0)
				params.index = this.viewData.feedback.length - 1
			else if (params.index >= this.viewData.feedback.length)
				params.index = 0

			const event: iEventData = {
				action: EmitActions.GetFeedbackData,
				params: {
					id: this.viewData.feedback[params.index].id,
				}
			}
			this.sendEvent(event)
			if (!this.popupManager.isOpen())
				this.popupManager.add(this.manageFeedbackPopup(this.popups[feedbackPopups.Feedback.key], params.index))
			else{
				const popup = this.popupManager.getPopupByKey(feedbackPopups.Feedback.key)
				if (popup)
					this.setFeedbackData(popup, params.index)
			}
		},
		createNewFeedback(params: iObject) {
			const event: iEventData = {
				action: EmitActions.CrateNewFeedback,
				params: params
			}
			this.sendEvent(event)
			this.closePopup()
		},
		getNextFeedbacks() {
			if (this.ready) {
				this.ready = false
				const event: iEventData = {
					action: EmitActions.GetNextFeedbacks,
					params: {
						len: this.viewData.feedback.length
					}
				}
				this.sendEvent(event)

				window.setTimeout(() => {
					this.ready = true
				}, 1000)
			}
			else {
				// pass
			}
		}
	}
})
</script>

<template>
	<TemplateView
		:scroll='!popupManager.isOpen() && !popupManager.getPopupByKey(feedbackPopups.Feedback.key)?.isVisible()'
		:onScroll='scrollOptions'
		@bottom='getNextFeedbacks'
	>
		<FeedbackMenu
			v-if='userData?.role !== Role.Guest'
			:colors='colors'
			@add='openCreate'
		/>
		<Section
			:colors='colors'
			:feedback='viewData.feedback'

			@select='select'
		/>
		<NewFeedbackPopup
			v-if='popupManager.isOpen() && popupManager.getPopupByKey(feedbackPopups.NewFeedback.key)?.isVisible()'

			:title='popupManager.getPopup()?.getTitle()'
			:colors='colors'

			@close='closePopup'
			@error='sendError($event.message)'
			@create='createNewFeedback'
		/>
		<FeedbackPopup
			v-if='popupManager.isOpen() && popupManager.getPopupByKey(feedbackPopups.Feedback.key)?.isVisible()'

			:colors='colors'
			:feedback='popupManager.getPopup()?.getData().feedback'

			@close='closePopup'
			@before='select({index: popupManager.getPopup()?.getData().index - 1})'
			@after='select({index: popupManager.getPopup()?.getData().index + 1})'
		/>
	</TemplateView>
</template>