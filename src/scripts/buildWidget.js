import createInputBlock from './createInputBlock'
import buildWidgetDOM from './buildWidgetDOM'
import { fields } from './fieldsParams'

export default function() {

	console.log(222, this)

	const blocks = {}
	const inputs = {}

	fields.forEach(field => {

		const { block, input } = createInputBlock(field)
		blocks[field.name] = block
		inputs[field.name] = input[0]

		const Input = this.createInput(input[0], field.name)

		if (field.droplist) {

			Input.addDropList()
		}
		// console.log(Input)
	})

	const { button:sendButton } = buildWidgetDOM.call(this, blocks)

	return { inputs, sendButton }
}