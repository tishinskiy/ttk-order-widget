import createInputBlock from './createInputBlock'
import buildWidgetDOM from './buildWidgetDOM'
import { Input, createInput } from './Classes'

export default function() {

	const fields = {
		'city': 'Город',
		'street': 'Улица',
		'building': 'Здание',
		'apartment': 'Квартира',
		'family': 'Фамилия',
		'name': 'Имя',
		'phone': 'Телефон',
	}

	const blocks = {}
	const inputs = {}

	for(let key in fields) {

		const { block, input } = createInputBlock(key, fields[key])
		blocks[key] = block
		inputs[key] = input[0]

		const a = this.createInput(input[0], key,)
		// console.log(a)
		a.test()
	}

	const { button:sendButton } = buildWidgetDOM.call(this.block, blocks)

	return { inputs, sendButton }
}