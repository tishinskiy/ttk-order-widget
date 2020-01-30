export const fields = [
	{
		name: 'city',
		label: 'Город',
		maxlength: 20,
		language: 'ru',
		droplist: true
	},
	{
		name: 'street',
		label: 'Улица',
		maxlength: 30,
		language: 'ru',
		droplist: true
	},
	{
		name: 'building',
		label: 'Здание',
		maxlength: 15,
		language: 'ru',
		droplist: true
	},
	{
		name: 'apartment',
		label: 'Квартира',
		maxlength: 5,
		language: 'ru',
		droplist: false
	},
	{
		name: 'family',
		label: 'Фамилия',
		minLength: 2,
		maxlength: 20,
		language: 'ru',
		droplist: false
	},
	{
		name: 'name',
		label: 'Имя',
		minLength: 2,
		maxlength: 20,
		language: 'ru',
		droplist: false
	},
	{
		name: 'phone',
		label: 'Телефон',
		minLength: 17,
		droplist: false
	}
]
