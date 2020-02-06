import './styles/main.sass'
import "@babel/polyfill";
import { Widget } from './scripts/Widget'

;(function($) {

	$.fn.ttkCoverageWidget = function(params) {


		if ( params.styles !== false ) {
			this.addClass('ttk__coverage-widget')
		}
		if ( params.clear !== false ) {
			this.html('')
		}
		const widget = new Widget(this[0], params)
		widget.show()
	}

})(jQuery)
