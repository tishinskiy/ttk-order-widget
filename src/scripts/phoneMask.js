import { getCaretPosition, setCaretPosition } from './inputCaretPosition'

const matrix = "+7 (___) ___ ____"

export default function() {
	const node = this.node
	const obj = $(this.node)

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

	fakeInput.html(maskValue)
}
