export const params = {
	styles: true,
	hideCity: false,
	currentCity: false,
	readCoockie: true,
	writeCoockie: true,
	onButtonAction: function(){
			document.location.href = "https://ttk.ru/";
		},
	onComplite: false,
}

export const strict = {
	api: {
		city: 'https://gate.myttk.ru/gate/jsonp/city.php',
		// street: 'https://gate.myttk.ru/gate/jsonp/street_new.php',
		street: 'https://gate.myttk.ru/gate/jsonp/street.php',
		// building: 'https://gate.myttk.ru/gate/jsonp/building_new.php',
		building: 'https://gate.myttk.ru/gate/jsonp/building.php',
	}
}
