import {readStore} from './Store'

let timer

const hoverBlock = function() {

	if (timer) clearTimeout(timer)

	const EventBus = readStore.call(this).EventBus

	EventBus.updateState(state => ({
		...state,
		droplistItemBloc: true
	}))

	timer = setTimeout(() => {
		EventBus.updateState(state => ({
			...state,
			droplistItemBloc: false
		}))
	}, 100)
}

export { hoverBlock }