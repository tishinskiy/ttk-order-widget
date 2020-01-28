function getCaretPosition (oField) {
	// Initialize
	var iCaretPos = 0;

	// IE Support
	if (document.selection) {

		// Set focus on the element
		oField.focus();

		// To get cursor position, get empty selection range
		var oSel = document.selection.createRange();

		// Move selection start to 0 position
		oSel.moveStart('character', -oField.value.length);

		// The caret position is selection length
		iCaretPos = oSel.text.length;
	}

	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
		iCaretPos = oField.selectionStart;

	// Return results
	return iCaretPos;
}

function setCaretPosition (elem, caretPos) {

	if (document.selection) { // ie
		elem.focus ();
		var range = document.selection.createRange ();
		range.moveStart ('character', -elem.value.length);
		range.moveStart ('character', caretPos);
		range.moveEnd ('character', 0);
		range.select ();
	} else if (elem.selectionStart || elem.selectionStart === '0') { // Mozilla
		elem.selectionStart = caretPos;
		elem.selectionEnd = caretPos;
		elem.focus ();
	}
}

export { getCaretPosition, setCaretPosition }