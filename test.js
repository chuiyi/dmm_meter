var dmm_parser = require('./dmm_parser.js');

// var url_search = dmm_parser.parseQueryUrl('木下柚花');
// var url_search = dmm_parser.parseQueryUrl('早乙女ルイ');
// var url_search = dmm_parser.parseQueryUrl('麻里梨夏');
// var url_search = dmm_parser.parseQueryUrl('柚月あい');
var url_search = dmm_parser.parseQueryUrl('abp 141');


console.log('search for: ' + url_search);
dmm_parser.parseList(url_search, function(videos) {
	var randVideo = videos[getRandomInt(1, videos.length) - 1];
	// console.log(randVideo);
	dmm_parser.parseVideo(randVideo.url, function(video) {
		console.log(video);
	});
});

// dmm_parser.parseVideo('http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=tek00092/', function(video) {
// 	console.log(video);
// });

// dmm_parser.parseList('http://www.dmm.co.jp/digital/videoa/-/list/=/article=maker/id=5456/limit=65536/', function(videos) {
// 	var randVideo = videos[getRandomInt(1, videos.length) - 1];
// 	console.log(randVideo);
// 	dmm_parser.parseVideo(randVideo.url, function(video) {
// 		console.log(video);
// 	});
// });


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}