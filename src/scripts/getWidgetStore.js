import { readStore } from './Store'

export default function() {
	const thas = !!this.length ? this : $(this)
	const key = thas.closest('.ttk__order-widget').attr('ttk-widget-key')
	return readStore(key)
}