export default function(name, event){

	console.log(name, $(this).val())

	switch (name) {
		case 'city':
			console.log('city')
			break

		default:
			break
	}
}