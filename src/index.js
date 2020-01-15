import './styles/main.sass'
import "@babel/polyfill";
import { Widget } from './scripts/Widget'

;(function($) {

	$.fn.ttkOrderWidget = function(params) {


		if ( params.styles !== false ) {
			this.addClass('ttk__order-widget')
		}
		if ( params.clear !== false ) {
			this.html('')
		}
		const widget = new Widget(this[0], params)
		widget.show()
	}

})(jQuery)