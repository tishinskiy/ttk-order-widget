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

	$(document).ready(function(){
		$('.ttk__order-widget .ttk__input').each((i, input) => {
			if ($(input).val() !== '' && !$(input).siblings('label').hasClass("ttk__input__label--focused")) {

				$(input).siblings('label').addClass("ttk__input__label--focused")
			}
		})
	})

})(jQuery)
