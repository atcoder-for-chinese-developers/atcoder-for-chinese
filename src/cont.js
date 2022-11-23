function readTextFile(file, ext, callback) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/" + ext);
	xhr.open("GET", file, false);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4)
			callback(xhr.responseText, xhr.status);
	}
	xhr.send();
}
function Base64() {
	_keyStr = "Csa56TWEOMFkpGH2cmb4Xi8vzYJo3efghldnSwDjNx9PVrI1uKBtRAZQ0qL7yU/+=";
	this.encode = function (input) {
		let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	this.decode = function (input) {
		let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g, "\n");
		let utftext = "";
		for (let n = 0; n < string.length; n++) {
			let c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
	_utf8_decode = function (utftext) {
		let string = "", i = 0, c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
function ext2(con) {
	return (Math.floor(con / 10)).toString() + (con % 10).toString();
}
function redr() {
	if (window.localStorage.getItem('inv-code') == undefined)
		window.localStorage.setItem('inv-code', document.getElementById("inv-code").value);
	window.location.href = "?id=" + escape(document.getElementById("inv-code").value);
}
function closeall() {
	document.getElementById("list").setAttribute("style", "display: none;");
	document.getElementById("table").setAttribute("style", "display: none;");
}
let beg = 0, end = 0, flgshow = 0;
function showlist() {
	closeall();
	let cur = new Date();
	if (Number(cur) >= Number(beg))
		document.getElementById("list").setAttribute("style", "");
}
function showtable() {
	closeall();
	let cur = new Date();
	if (Number(cur) >= Number(beg))
		document.getElementById("table").setAttribute("style", "");
}
function dateToString(t) {
	Date.prototype.format = function (fmt) {
		let o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt
	}
	let cur = new Date(t).format("yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒")
	return cur.toString()
}
function timeToString(t) {
	Date.prototype.format = function (fmt) {
		let o = {
			"y+": this.getYear() > 70 ? (this.getYear() - 70) + " 年" : "",
			"M+": this.getUTCMonth() > 0 ? this.getUTCMonth() + " 月" : "",
			"d+": this.getUTCDate() > 1 ? (this.getUTCDate() - 1) + " 天" : "",
			"h+": this.getUTCHours() > 0 ? this.getUTCHours() + " 小时" : "",
			"m+": this.getUTCMinutes() > 0 ? this.getUTCMinutes() + " 分钟" : "",
			"s+": this.getUTCSeconds() > 0 ? this.getUTCSeconds() + " 秒" : "",
		};
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, o[k]);
			}
		}
		return fmt
	}
	let cur = new Date(t).format("y M d h m s")
	return cur.toString()
}
function jumplink1() {
	window.open("https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/")
}
function getpercent() {
	let cur = new Date()
	return Math.max((Math.min(end, cur) - beg) / (end - beg), 0.0)
}
function refreshtime() {
	let cur = new Date(), tst = (Number(beg) - Number(cur)) / 1000., rem = (Number(end) - Number(cur)) / 1000.
	if (tst > 0)
		rem = tst
	let da = Math.floor(rem / 86400), ho = Math.floor(rem % 86400 / 3600), mi = Math.floor(rem % 3600 / 60), se = rem % 60
	if (!flgshow && cur > beg)
		showlist(), flgshow = 1
	document.getElementById("remain-time").innerText = cur < beg ? "距离比赛开始 " + ((da ? da.toString() + " 天 " : "") + (ho ? ho.toString() + " 时 " : "") + (mi ? mi.toString() + " 分 " : "") + (se ? Math.floor(se).toFixed(0).toString() + " 秒 " : "")) : cur > end ? "已结束" : ((da ? da.toString() + " 天 " : "") + (ho ? ho.toString() + " 时 " : "") + (mi ? mi.toString() + " 分 " : "") + (se ? Math.floor(se).toFixed(0).toString() + " 秒 " : ""))
	$("#timeprog").progress({
		percent: getpercent() * 100
	});
}

function rankfresh(data) {
	beg = Number(data.st), end = Number(data.ed)
	let subs = {}, acc = [], ple = [], id = [], hascf = 0, extp = []
	for (let i = 0; i < data.players.length; i++)
		acc.push(0), ple.push(0), id.push(i), extp.push(0)
	for (let i in data.problems)
		if (data.problems[i].substr(0, 2) == 'CF')
			hascf = 1
	let cfid = []
	for (var i in data.players) {
		var li = data.players[i].split('(')
		if (li.length == 2)
			data.players[i] = li[0], cfid.push(li[1].substr(0, li[1].length - 1));
		else cfid.push(data.players[i])
	}
	for (let i = 0; i < data.players.length; i++) {
		let sub, cfsub;
		readTextFile('https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=' +
			data.players[i] + '&from_second=' + Math.floor(beg / 1000), 'json', function (text) {
				sub = JSON.parse(text)
			})
		if (hascf == 1) {
			readTextFile('https://codeforces.com/api/user.status?handle=' + cfid[i] + '&from=1&count=100', 'json', function (text) {
				cfsub = JSON.parse(text)
			})
			cfsub = cfsub.result
		}
		subs[i] = {
			ac: {},
			pl: {},
			tm: {},
			wj: {}
		}
		for (let t = 0; t < sub.length; t++) {
			let c = sub[t]
			if (Number(c.epoch_second) * 1000 >= end)
				continue	
			for (var j = 0; j < data.problems.length; j++)
				if (c.problem_id == data.problems[j]) {
					if (c.result == 'AC') {
						subs[i].wj = 0
						if (subs[i].ac[data.problems[j]] != 1) {
							if (data.mod == 'atcoder') acc[i] += data.score[j];
							else acc[i] += 1;
						}
						subs[i].ac[data.problems[j]] = 1
						subs[i].tm[data.problems[j]] = c.epoch_second
						if (subs[i].pl[data.problems[j]] == undefined)
							subs[i].pl[data.problems[j]] = 0
						if (data.mod == undefined || data.mod == "ICPC") ple[i] += (c.epoch_second * 1000 - beg) / 1000
						else if (data.mod == "atcoder") ple[i] = Math.max(ple[i], (c.epoch_second * 1000 - beg) / 1000);
					} else if (47 < c.result[0] || c.result[0] < 58 || c.result == 'WJ') {
						subs[i].wj = 1
					} else if (c.result != 'CE') {
						subs[i].wj = 0
						if (subs[i].pl[data.problems[j]] == undefined)
							subs[i].pl[data.problems[j]] = 0
						subs[i].pl[data.problems[j]] += 1
						if (subs[i].ac[data.problems[j]]) extp[i] += 300;
					}
				}
		}
		if (hascf) {
			for (let t = 0; t < cfsub.length; t++) {
				let c = cfsub[t];
				if (Number(c.creationTimeSeconds) * 1000 >= end)
					continue;
				for (let j = 0; j < data.problems.length; j++) {
					let problem_id = c.problem.contestId + c.problem.index;
					if (problem_id == data.problems[j].substr(2)) {
						if (c.verdict == 'OK') {
							subs[i].wj = 0;
							if (subs[i].ac[data.problems[j]] != 1) {
								if (data.mod == 'atcoder') acc[i] += data.score[j];
								else acc[i] += 1;
							}
							subs[i].ac[data.problems[j]] = 1;
							subs[i].tm[data.problems[j]] = c.creationTimeSeconds;
							if (subs[i].pl[data.problems[j]] == undefined)
								subs[i].pl[data.problems[j]] = 0;
							if (data.mod == undefined || data.mod == "ICPC") ple[i] += (c.creationTimeSeconds * 1000 - beg) / 1000
							else if (data.mod == "atcoder") ple[i] = Math.max(ple[i], (c.creationTimeSeconds * 1000 - beg) / 1000);
						} else if (c.verdict == 'TESTING') {
							subs[i].wj = 1;
						} else if (c.verdict != 'COMPILATION_ERROR') {
							subs[i].wj = 0;
							if (subs[i].pl[data.problems[j]] == undefined)
								subs[i].pl[data.problems[j]] = 0;
							subs[i].pl[data.problems[j]] += 1;
							if (subs[i].ac[data.problems[j]]) extp[i] += 300;
						}
					}
				}
			}
		}
		let w = Date.now()
		while (Date.now() < w + 1000);
	}
	function getp(x) { return ple[x] + extp[x]; }
	id.sort(function (a, b) {
		if (acc[a] == acc[b]) {
			return getp(a) - getp(b);
		}
		else
			return acc[b] - acc[a]
	})
	res = '<thead><tr><th>选手列表</th>'
	if (data.mod == 'atcoder') res += '<th>分数</th>'
	else res += '<th>过题数</th>'
	if (data.mod == undefined || data.mod != "practice")
		res += '<th>罚时</th>'
	for (let i = 0; i < data.problems.length; i++) {
		let p = data.problems[i].lastIndexOf('_'), con = data.problems[i].substr(0, p)
		while (con.match("_") != null)
			con = con.replace("_", "-")
		if (data.problems[i].substr(0, 2) != 'CF')
			res += ('<th>' + '<a href="https://atcoder.jp/contests/' + con + '/tasks/' + data.problems[i] + '">' + (i + 1) + '</a></th>');
		else {
			let c = data.problems[i].substr(2), p, q, pos = 0;
			for (let j = 0; j < c.length; j++)
				if (c[j] >= 'A') {
					pos = j;
					break;
				}
			p = c.substr(0, pos), q = c.substr(pos);
			res += ('<th>' + '<a href="https://codeforces.com/problemset/problem/' + p + '/' + q + '">' + (i + 1) + '</a></th>');
		}
	}
	res += ('</tr></thead><tbody>');
	for (let t = 0; t < data.players.length; t++) {
		let i = id[t];
		res += ('<tr><td>(' + (t + 1) + ') <a href=\"https://atcoder.jp/users/' + data.players[i] + "\">" + data.players[i] + '</a></td>');
		let dr = Math.floor(getp(i));
		let	hours = Math.floor(dr / 3600),
			minu = Math.floor(dr % 3600 / 60),
			seco = dr % 60;
		res += '<td> ' + acc[i] + '</td>'
		if (data.mod == undefined || data.mod != "practice") res += ('<td> ' + ext2(hours) + ':' + ext2(minu) + ':' + ext2(seco) + '</td>');
		for (let j = 0; j < data.problems.length; j++) {
			if (subs[i].wj[data.problems[j]] == 1) {
				res += ("<td class=\"warning\"><i class=\"icon hourglass half\"></i>");
			} else if (subs[i].ac[data.problems[j]] == 1) {
				res += ('<td class="positive"><i class="icon checkmark"></i>');
			} else if (subs[i].pl[data.problems[j]] != 0 && subs[i].pl[data.problems[j]] != undefined) {
				res += ('<td class="negative"><i class="icon close"></i>');
			} else
				res += ('<td>-');
			if (subs[i].ac[data.problems[j]] == 1) {
				let dr = Math.floor((Number(subs[i].tm[data.problems[j]]) * 1000 - beg) / 1000),
					h = Math.floor(dr / 3600), m = Math.floor(dr % 3600 / 60), s = dr % 60;
				res += (' ' + ext2(h) + ':' + ext2(m) + ':' + ext2(s));
			}
			if (subs[i].pl[data.problems[j]])
				res += (' (' + subs[i].pl[data.problems[j]] + ')');
			res += ('</td>');
		}
		res += ('</tr>')
	}
	res += ('<tbody>');
	document.getElementById('table').innerHTML = res;
}

function buildpage() {
	let s = window.location.href, trans = new Base64();
	if (s.split('?id=').length == 1) {
		document.write("<div class=\"ui container\">");
		document.write("<div class=\"ui input\"><input id=\"inv-code\" style=\"width: 150;\" placeholder=\"输入邀请码\"></input></div>");
		if (window.localStorage.getItem('inv-code') != undefined)
			document.getElementById('inv-code').value = window.localStorage.getItem('inv-code')
		document.write("<button class=\"ui button\" onclick=\"redr()\">跳转到比赛界面</button>");
	} else {
		while (s.match('%22') != null)
			s = s.replace('%22', '"');
		while (s.match('%3D') != null)
			s = s.replace('%3D', '=');
		s = trans.decode(s.split('?')[1].substr(3));
		let data = JSON.parse(s);
		beg = Number(data.st), end = Number(data.ed);
		let start = new Date(beg), finish = new Date(end);
		beg = Number(data.st), end = Number(data.ed);
		start = new Date(beg), finish = new Date(end);
		
		document.write("<p></p><div><h1 style=\"display: inline;\">" + data['title'] + "</h1><i class=\"ui home link icon\" style=\"font-size: 1.5em; float: right;\" onclick=\"jumplink1()\"></i></div>");
		document.write("<div class=\"ui divided selection list\">");
		document.write('<a class=\"item\"><div class=\"ui red horizontal label\">开始时间</div><p style=\"color: #000; display: inline-block\">' + dateToString(start) + '</p>');
		document.write('<a class=\"item\"><div class=\"ui green horizontal label\">结束时间</div><p style=\"color: #000; display: inline-block\">' + dateToString(finish) + '</p>');
		document.write('<a class=\"item\"><div class=\"ui yellow horizontal label\">持续时间</div><p style=\"color: #000; display: inline-block\">' + timeToString(new Date(Number(finish) - Number(start))) + '</p>');
		document.write('<a class=\"item\"><div class=\"ui blue horizontal label\">倒计时</div><p style=\"color: #000; display: inline-block\" id=\"remain-time\"></p></div>');
		document.write("<div class=\"ui top attached indicating progress\" id=\"timeprog\"><div class=\"bar\"></div></div>")
		document.write("<div class=\"ui menu\">");
		document.write("<a class=\"item\" onclick=\"showlist()\">题目列表</a>");
		document.write("<a class=\"item\" onclick=\"showtable()\">排行榜</a></div>");

		document.write("<table class=\"ui celled table\" id=\"list\">");
		document.write("<thead><tr><th>题目编号</th>");
		if (data.mod == "atcoder") document.write("<th  class=\"collapsing\">题目分数</th>");
		document.write("<th>题目标题</th></tr></thead><tbody>");
		for (let i in data.problems) {
			let p = data.problems[i].lastIndexOf('_'), con = data.problems[i].substr(0, p);
			while (con.match("_") != null)
				con = con.replace("_", "-");
			let ext = ""
			if (data.mod == 'atcoder') ext = '<td>' + data.score[i] + '</td>';
			if (data.problems[i].substr(0, 2) != 'CF')
				document.write('<tr><td>' + (Number(i) + 1) + '</td>' + ext + '<td>' + '<a href="https://atcoder.jp/contests/' + con + '/tasks/' + data.problems[i] + '">' + data.problems[i] + '</a></td></tr>');
			else {
				let c = data.problems[i].substr(2), p, q, pos = 0;
				for (let j = 0; j < c.length; j++)
					if (c[j] >= 'A') {
						pos = j;
						break;
					}
				p = c.substr(0, pos), q = c.substr(pos);
				document.write('<tr><td>' + (Number(i) + 1) + '</td>' + ext + '<td>' + '<a href="https://codeforces.com/problemset/problem/' + p + '/' + q + '">' + c + '</a></td></tr>');
			}
		}
		document.write("</tbody></table>");
		document.write('<table class="ui fixed celled table" id="table">');
		document.write('</table>');
		showlist();
		rankfresh(data);
		setInterval(rankfresh, 1000 * 120, data);
		$(function () {
			setInterval("refreshtime();", 500);
		})
	}
}
