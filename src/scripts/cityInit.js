export default function (params) {

	if (params) {

		this.val(params['EXTERNAL_NAME'])
	}

	if (this.val() !== '') {

		this.next('label').addClass('ttk__input__label--focused')
	}
}