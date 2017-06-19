function parse_string_bango(src) {
	var strArray = src.split(/[0-9]+/);
	var strResult = '';
	if (strArray.length > 1) {
		for (var i = 0; i < strArray.length - 1; i++)
			strResult += strArray[i];
		strResult += ('00000' + strArray[strArray.length - 1]).substr(-5);
	}
	else
		strResult = strArray[0];

	return strResult;
}

console.log(parse_string_bango('ABP8r84FV004'));