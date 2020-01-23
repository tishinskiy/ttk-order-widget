const ru = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "Х", "Ъ", "Ж", "Э", "Б", "Ю", ","]
const en = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "{", "}", ":", "\"", "<", ">", "?"]

export default function () {

	let str = $(this.node).val()


	if (!this.lang) {

		return false
	}

	const lang = this.lang == 'ru' ? [en, ru] : [ru, en]

	str = str.replace(/[!@#$%^&*+="~_`'"№;:?*{}\[\]<>|]/g, '')

	let result = ''

	str.split('').forEach(function(item, i, arr){

		const pos = lang[0].indexOf(item.toLowerCase()) 

		if (pos !== -1) {

			result += ((item.toLowerCase()) !== item) ? lang[1][pos].toUpperCase() : lang[1][pos]
		}
		else {
			result += item
		}
	})

	$(this.node).val(result)
}
