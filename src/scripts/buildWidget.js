import createInputBlock from './createInputBlock'
import buildWidgetDOM from './buildWidgetDOM'

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
	}

	const { button:sendButton } = buildWidgetDOM.call(this, blocks)

	return { inputs, sendButton }
}