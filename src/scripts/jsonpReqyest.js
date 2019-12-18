const jsonpRequest = async function(url, data = {}) {

	const promise = new Promise((resolve, reject) => {

		$.ajax({
			url,
			data,
			jsonp: "callback",
			dataType: "jsonp",

			success: response => {

				resolve(response)
			},

			error: error => {

				reject(error)
			}

		})
	}).then(
		result => (result),
		error => (error)
	)

	const result = await promise
	return result
}

export default jsonpRequest