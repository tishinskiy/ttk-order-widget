import fieldsActionInpit from './fieldsActionInpit'
import fieldsActionFocus from './fieldsActionFocus'
import fieldsActionblur from './fieldsActionblur'
import {readStore} from './Store'


export default function(inputs) {

	for (let key in inputs) {

		const Store = readStore.call(inputs[key])

		$(inputs[key])

			.on('input focus focusout', function(event){

				switch (event.type) {

					case 'focus':
						console.log('focus')
						fieldsActionFocus.call(this, key)
						break

					case 'input':
						console.log('input')
						fieldsActionInpit.call(this, key)
						break

					case 'focusout':
						console.log('focusout')
						fieldsActionblur.call(this, key)
						break

					default:
						break
				}
			})

			.focus(function() {

				$(this).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
				$(this).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')
			})

			.focusout(function(event) {

				const thas = $(this)
				console.log('thas', thas)
				thas.attr('placeholder', '')

				if ($(event.originalEvent.relatedTarget).hasClass('ttk__droplist__item')) {
					return false
				}
				if (!thas.val().length) {

					thas.siblings('.ttk__input__label').removeClass('ttk__input__label--focused')
				}

				$(this).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')

				thas.siblings('.ttk__input__droplist').hide()

			})


	}
}