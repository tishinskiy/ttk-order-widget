import './styles/main.sass'
import "@babel/polyfill";
import { Widget } from './scripts/Classes'


// import fieldsAction  from './scripts/fieldsAction'
// import sendButtonActions  from './scripts/sendButtonActions'
// import cityInit from './scripts/cityInit'
// import { readStore } from './scripts/Store'
// import buildWidget from './scripts/buildWidget'
// import observerBehaviors from './scripts/observerBehaviors'


;(function($) {

	$.fn.ttkOrderWidget = function(params) {


		if ( params.styles !== false ) {
			this.addClass('ttk__order-widget')
		}
		if ( params.clear !== false ) {
			this.html('')
		}
		const widget = new Widget(this[0], params)
		// widget.buildWidget()
		widget.show()


		// const { inputs, sendButton } = buildWidget.call(this, params.fields)

		// for (let i in inputs) {

		// 	inputs[i].Store = this.Store
		// }

		// observerBehaviors.call(this, inputs)

		// cityInit.call(inputs.city, params.currentCity)
		// fieldsAction(inputs)
		// sendButtonActions(sendButton)

	}

})(jQuery)