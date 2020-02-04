export const params = {
	styles: true,
	clear: true,
	test: 1,
	thankyouUrl: false,
	actionBefore: false,
	actionAfter: false,
	fields: false,
	hideCity: false,
	currentCity: false,
	coverage: true,
	collector: false,
	comment: false,
	other: false,
	readCoockie: true,
	writeCoockie: true,
}

export const strict = {
	api: {
		city: 'https://gate.myttk.ru/gate/jsonp/city.php',
		street: 'https://gate.myttk.ru/gate/jsonp/street.php',
		building: 'https://gate.myttk.ru/gate/jsonp/building.php',
	},
	requestUrl: 'http://localhost:7000/jsonp/200',
	collectorUrl: 'http://localhost:7000/collector/200',
}
