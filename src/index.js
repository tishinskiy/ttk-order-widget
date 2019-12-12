import './styles/main.sass'
import defaultParams from './scripts/defaultParams'
import buildWidget   from './scripts/buildWidget'
import fieldsAction  from './scripts/fieldsAction'

;(function($) {

	$.fn.ttkOrderWidget = function(params) {

		params = {
			...defaultParams,
			...params
		}

		if ( params.styles ) {

			this.addClass('ttk__order-widget')
		}

		if ( params.clear ) {

			this.html('')
		}

		const { inputs, sendButton } = buildWidget.call(this, params.fields)

		fieldsAction(inputs)

		console.log('sendButton', sendButton)

	}

})(jQuery)