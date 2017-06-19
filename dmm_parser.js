var request = require('request');
var cheerio = require('cheerio');
var urlhttp = require('url');

function parseQueryUrl(keyword) {
	var str_url = 'http://www.dmm.co.jp/search/=/searchstr=' + encodeURIComponent(keyword) + '/sort=date/';
	str_url += 'limit=65536/';
	str_url += 'n1=FgRCTw9VBA4GAVhfWkIHWw__/';
	str_url += 'n2=Aw1fVhQKX1ZRAlhMUlo5QQgBU1lR/';
	// console.log('search for: ' + str_url);
	return str_url;
}

function parseList(url, callback) {
	request({
		url: url,
		method: "GET"
	}, function(e,r,b) {
		if(!e) {
			$ = cheerio.load(b);

			var videos = new Array($('ul#list.li'));
			$('ul#list').find('li').each(function(i, elem) {
				var obj = new Object();
				obj.title = $(this).find('span.img img').attr('alt');
				obj.url = $(this).find('p.tmb a').attr('href').split("?").shift();
				obj.number = obj.url.split("/cid=")[1].split("/")[0];
				obj.urlCover = 'http://pics.dmm.co.jp/digital/video/' + obj.number + '/' + obj.number + 'pl.jpg'
				videos[i] = obj;
			});

			callback(videos);
			// return videos;
		}
	});
}

function parseVideo(url) {
	request({
		url: url,
		method: "GET"
	}, function(e,r,b) {
		if(!e) {
			$ = cheerio.load(b);

			var info = $('table.mg-b20');
			var obj = new Object();
			info.find('tr').each(function(i, elem) {
				if ($(this).text().includes('配信開始日：'))
				console.log($(this).text());
			});
		}
	});
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var url_search = parseQueryUrl('木下柚花');
var url_search = parseQueryUrl('早乙女ルイ');

console.log('search for: ' + url_search);
parseList(url_search, function(videos) {
	// console.log(videos);
	var randVideo = videos[getRandomInt(1, videos.length) - 1];
	console.log(randVideo);
	parseVideo(randVideo.url);
});