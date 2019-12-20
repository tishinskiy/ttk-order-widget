import './styles/main.sass'
import "@babel/polyfill";
import defaultParams from './scripts/defaultParams'
import buildWidget   from './scripts/buildWidget'
import fieldsAction  from './scripts/fieldsAction'
import sendButtonActions  from './scripts/sendButtonActions'
import cityInit from './scripts/cityInit'
import { readStore } from './scripts/Store'
import observerBehaviors from './scripts/observerBehaviors'


;(function($) {

	$.fn.ttkOrderWidget = function(params) {



		params = {
			...defaultParams,
			...params
		}


		const key = (new Date()).getTime()

		this.attr('ttk-widget-key', key)
		this.Store = readStore.call(this)

		if ( params.styles ) {

			this.addClass('ttk__order-widget')
		}

		if ( params.clear ) {

			this.html('')
		}


		const { inputs, sendButton } = buildWidget.call(this, params.fields)

		for (let i in inputs) {

			inputs[i].Store = this.Store
		}

		observerBehaviors.call(this, inputs)

		cityInit.call(inputs.city, params.currentCity)
		fieldsAction(inputs)
		sendButtonActions(sendButton)

	}

})(jQuery)