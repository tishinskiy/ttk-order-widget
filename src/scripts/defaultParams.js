export const params = {
	styles: true,
	// clear: true,
	// thankyouUrl: false,
	hideCity: false,
	currentCity: false,
	// coverage: true,
	// collector: false,
	// comment: false,
	// other: false,
	readCoockie: true,
	writeCoockie: true,
	onButtonAction: false,
	onComplite: false,
}

export const strict = {
	api: {
		city: 'https://gate.myttk.ru/gate/jsonp/city.php',
		street: 'https://gate.myttk.ru/gate/jsonp/street.php',
		building: 'https://gate.myttk.ru/gate/jsonp/building.php',
	},
	// requestUrl:   'https://myttk.ru/gate/jsonp/send.php',
	// requestUrl: 'http://localhost:7000/jsonp/200',
	// collectorUrl: 'https://myttk.ru/gate/jsonp/send.php',
	// collectorUrl: 'http://localhost:7000/collector/200',
}
