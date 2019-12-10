const time = (new Date()).getTime()

const city = {
	autocomplete: `ttk__${time}`,
}

const street = {
	autocomplete: `ttk__${time}`,
}
const building = {
	autocomplete: `ttk__${time}`,
	maxlength: 10
}
const apartment = {
	autocomplete: `ttk__${time}`,
	maxlength: 5
}

export default { city, street, building, apartment }