var dmm_parser = require('./parser/dmm_parser.js');

// var url_search = dmm_parser.parseQueryUrl('木下柚花');
// var url_search = dmm_parser.parseQueryUrl('早乙女ルイ');
// var url_search = dmm_parser.parseQueryUrl('大橋未久');
// var url_search = dmm_parser.parseQueryUrl('神谷姫');
var url_search = dmm_parser.parseQueryUrl('金城アンナ');
// var url_search = dmm_parser.parseQueryUrl('麻里梨夏');
// var url_search = dmm_parser.parseQueryUrl('柚月あい');
// var url_search = dmm_parser.parseQueryUrl('abp 141');
// var url_search = dmm_parser.parseQueryUrl('Tokyo 流儀');
// var url_search = dmm_parser.parseQueryUrl('最初で最後の姉妹共演');
// var url_search = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=maker/id=40136/sort=date/';


console.log('search for: ' + url_search);
dmm_parser.parseList(url_search, function(videos) {
	// console.log(videos);
	var randVideo = videos[getRandomInt(1, videos.length) - 1];
	dmm_parser.parseVideo(randVideo.url, function(video) {
		console.log(video);
	});
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}