import { getCaretPosition, setCaretPosition } from './inputCaretPosition'

let m = 0

const matrix = "+7 (___) ___ ____"

export default function(e) {
	// console.log(e)
	// return false
	const node = this.node
	const obj = $(this.node)
	// if (e.type == 'input' || e.type == 'focusin') {

		const num = $(node).val().replace(/\D/g, '').split('')
		const mat = matrix.split('')

		let newStr = ''

		let k = 1

		for ( let i = 0; i < mat.length; i++ ) {

			const char = mat[i]

			if (i <= 3 || char !== '_'){

				newStr += char

			} else {

				if (!!num[k] && char == "_") {

					newStr += num[k++]

				} else {
					
					break
				}
			}
		}

		const pos = getCaretPosition(node)

		let a = 0
		
		$(node).val(newStr.replace(/[\s)]*$/, ''))

		if ([ 9, 12, 13].indexOf(pos) !== -1) { a = 1 }

		if ([7, 8].indexOf(pos) !== -1) { a = 2 }

		setCaretPosition (node, pos > 4 ? pos + a : 4 )

	// }

	// if (e.type == 'click' || e.type == 'keydown') {

	// 	if(getCaretPosition(node) < 4) {

	// 		setCaretPosition (node, 4 )
	// 	}
	// }

	const maskValue = $(node).val() + matrix.slice($(node).val().length)
	let fakeInput
	if (!$('div.ttk__input__fake').length) {

		fakeInput = $('<div>', {
			class: 'ttk__input ttk__input__fake',
		})


		$(node).after(fakeInput)
	} else {
		fakeInput = $(node).next('div.ttk__input__fake')
	}
		console.log('fakeInput', fakeInput, maskValue)
		fakeInput.html(maskValue)

	// } else {
	// 	if (e.type !== "focusout") {
	// 		$(node).next('div.ttk_fake-input').show()
	// 	} else {
	// 		if ($(node).val() === "+7 (") {
	// 			$(node).val('').focusout()
	// 		}
	// 	}
	// }

	// $(node).next('div.ttk_fake-input').html(maskValue)
}
