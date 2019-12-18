import './styles/main.sass'
import "@babel/polyfill";
import defaultParams from './scripts/defaultParams'
import buildWidget   from './scripts/buildWidget'
import fieldsAction  from './scripts/fieldsAction'
import sendButtonActions  from './scripts/sendButtonActions'
import cityInit from './scripts/cityInit'
import { createStore, readStore } from './scripts/Store'



;(function($) {

	$.fn.ttkOrderWidget = function(params) {




		params = {
			...defaultParams,
			...params
		}


		const key = (new Date()).getTime()

		createStore(key)
		this.Store = readStore(key)

		console.log(this)

		this.attr('ttk-widget-key', key)

		if ( params.styles ) {

			this.addClass('ttk__order-widget')
		}

		if ( params.clear ) {

			this.html('')
		}


		const { inputs, sendButton } = buildWidget.call(this, params.fields)

		console.log(inputs)

		for (let i in inputs) {

			inputs[i].Store = this.Store
		}



		cityInit.call(inputs.city, params.currentCity)
		fieldsAction(inputs)
		sendButtonActions(sendButton)

		console.log('Store', this.Store)
	}

})(jQuery)