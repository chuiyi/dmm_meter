var request = require('request');
var cheerio = require('cheerio');
var urlhttp = require('url');

exports.parseQueryUrl = function(keyword) {
	var str_url = 'http://www.dmm.co.jp/search/=/searchstr=' + encodeURIComponent(keyword) + '/sort=date/';
	str_url += 'limit=65536/';
	str_url += 'n1=FgRCTw9VBA4GAVhfWkIHWw__/';
	str_url += 'n2=Aw1fVhQKX1ZRAlhMUlo5QQgBU1lR/';
	// console.log('search for: ' + str_url);
	return str_url;
};

exports.parseList = function(url, callback) {
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
				obj.cid = obj.url.split("/cid=")[1].split("/")[0];
				obj.img_cover = 'http://pics.dmm.co.jp/digital/video/' + obj.cid + '/' + obj.cid + 'pl.jpg'
				videos[i] = obj;
			});

			//list-boxcaptside list-boxpagenation
			//parse 不只一頁狀況

			if(callback)
				callback(videos);
		}
	});
};

exports.parseVideo = function(url, callback) {
	request({
		url: url,
		method: "GET"
	}, function(e,r,b) {
		if(!e) {
			$ = cheerio.load(b);

			var video = new Object();
			video.link = url;
			video.title = $('h1#title').text();
			video.cid = video.link.split("cid=")[1].split("/")[0];
			video.img_cover = 'http://pics.dmm.co.jp/digital/video/' + video.cid + '/' + video.cid + 'pl.jpg'
			var number = video.cid.match(/[a-zA-Z]+|[0-9]+/g);
			video.number_array = number;
			video.number = number[number.length - 2] + '-' + getNumberWithDigit(parseInt(number[number.length - 1]), 3);
			video.number = video.number.toUpperCase();

			var info = $('table.mg-b20');
			info.find('tr').each(function(i, elem) {
				if ($(this).text().includes('配信開始日')) {
					$(this).find('td').each(function(i_s, elem_s) {
						if (i_s == 1) {
							video.date_online = $(elem_s).text().replaceAll('\n', '');
						}
					});
				}
				if ($(this).text().includes('商品発売日')) {
					$(this).find('td').each(function(i_s, elem_s) {
						if (i_s == 1) {
							video.date_sale = $(elem_s).text().replaceAll('\n', '');
						}
					});
				}
				if ($(this).text().includes('収録時間')) {
					$(this).find('td').each(function(i_s, elem_s) {
						if (i_s == 1) {
							video.time = $(elem_s).text().replaceAll('\n', '');
						}
					});
				}
				if ($(this).text().includes('出演者')) {
					video.actresses = [];
					$(this).find('span a').each(function(i_s, elem_s) {
						var actress = new Object();
						actress.name = $(elem_s).text();
						actress.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.actresses.push(actress);
					});
				}
				if ($(this).text().includes('監督')) {
					video.directors = [];
					$(this).find('a').each(function(i_s, elem_s) {
						var director = new Object();
						director.name = $(elem_s).text();
						director.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.directors.push(director);
					});
				}
				if ($(this).text().includes('シリーズ')) {
					video.series = [];
					$(this).find('a').each(function(i_s, elem_s) {
						var series = new Object();
						series.name = $(elem_s).text();
						series.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.series.push(series);
					});
				}
				if ($(this).text().includes('メーカー')) {
					video.makers = [];
					$(this).find('a').each(function(i_s, elem_s) {
						var maker = new Object();
						maker.name = $(elem_s).text();
						maker.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.makers.push(maker);
					});
				}
				if ($(this).text().includes('レーベル')) {
					video.labels = [];
					$(this).find('a').each(function(i_s, elem_s) {
						var label = new Object();
						label.name = $(elem_s).text();
						label.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.labels.push(label);
					});
				}
				if ($(this).text().includes('ジャンル')) {
					video.keywords = [];
					$(this).find('a').each(function(i_s, elem_s) {
						var keyword = new Object();
						keyword.name = $(elem_s).text();
						keyword.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
						video.keywords.push(keyword);
					});
				}
				// if ($(this).text().includes('平均評価'))
				// 	console.log($(this).html());

				video.img_sample = [];
				$('img.mg-b6').each(function(i_s, elem_s) {
					video.img_sample.push($(elem_s).attr('src').replace("-", "jp-"));
				});
				//http://pics.dmm.co.jp/digital/video/idbd00334/idbd00334-1.jpg
				//http://pics.dmm.co.jp/digital/video/idbd00334/idbd00334jp-1.jpg

			});
			video.filename = '[' + video.makers[0].name + '] ' + video.title + ' (' + video.number + ')';

			if (callback)
				callback(video);
		}
	});
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getNumberWithDigit(number, digit) {
	var result = String(number);
	while (result.length < digit) {
		result = '0' + result;
	}
	return result;
}