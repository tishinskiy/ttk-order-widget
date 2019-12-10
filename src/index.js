import './styles/main.sass'
import defaultParams from './scripts/defaultParams'
import buildWidget   from './scripts/buildWidget'

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

		const {inputs:fields} = buildWidget.call(this, params.fields)

		console.log('fields', fields)

	}

})(jQuery)