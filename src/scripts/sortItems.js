export default (arr = [], str = false, fieldName = 'EXTERNAL_NAME') => {

	if (!!str) {

		return arr.filter(item => {
			return item[fieldName].toLowerCase().indexOf(str.toLowerCase()) !== -1
		})
			.sort(function (a, b) {
				return a[fieldName].toLowerCase().indexOf(str.toLowerCase()) - b[fieldName].toLowerCase().indexOf(str.toLowerCase())
			})

			.map((item, i) => {
				return {
					...item,
					position: i
				}
			})

		} else {

			return arr
				.sort(function (a, b) {

					if ( a[fieldName].toLowerCase() < b[fieldName].toLowerCase() ){
						return -1
					}

					if ( a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ){
						return 1
					}
					return 0;
				})
				.map((item, i) => {
					return {
						...item,
						position: i
					}
				})
		}
}