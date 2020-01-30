export default function(fields) {

	const store = this.store.readState()
	let result = true
	const revision = (item) => store[item].readState().Input.errorRevision()

	if (typeof fields == 'string') {
		return revision(fields)
	}

	for (let i = 0; i < fields.length; i++) {

		if (!revision(fields[i])) {

			result = false
			break
		}
	}

	return result
}
