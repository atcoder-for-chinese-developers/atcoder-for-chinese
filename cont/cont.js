/**
 * Read files from the web.
 * @param {string} file file name
 * @param {string} ext file extension
 * @param {function} callback callback function after the file fetches down
 * @param {boolean} isLocked set to true if the statement locks following statements
 */
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
/**
 * Create an object that can encode and decode base64.
 */
function Base64() {
	const _keyStr = "Csa56TWEOMFkpGH2cmb4Xi8vzYJo3efghldnSwDjNx9PVrI1uKBtRAZQ0qL7yU/+=";
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
let beg = 0, end = 0, flgshow = 0;
/**
 * Show problem list in current page.
 */
function showlist() {
	$("#list").css("display", "none");
	$("#table").css("display", "none");
	let cur = new Date();
	if (Number(cur) >= Number(beg))
		$("#list").css("display", "");
}
/**
 * Show ranking table in current page.
 */
function showtable() {
	$("#list").css("display", "none");
	$("#table").css("display", "none");
	let cur = new Date();
	if (Number(cur) >= Number(beg))
		$("#table").css("display", "");
}
/**
 * Time formatter. Using the folloing format: "yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
 * @param {object} A Date object.
 * @returns {string} A string with formatted time.
 */
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
		return fmt;
	}
	let cur = new Date(t).format("yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒");
	return cur.toString();
}
/**
 * Time formatter. Using the folloing format: "y M d h m s"
 * @param {number} A number representing time.
 * @returns {string} A string with formatted time.
 */
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
		return fmt;
	}
	let cur = new Date(t).format("y M d h m s");
	return cur.toString();
}
/**
 * Get the percentage of time passed in the contest.
 * @returns {number} The precentage.
 */
function getpercent() {
	let cur = new Date();
	return Math.max((Math.min(end, cur) - beg) / (end - beg), 0.0);
}
/**
 * Refresh the timing.
 */
function refreshtime() {
	let cur = new Date(), tst = (Number(beg) - Number(cur)) / 1000., rem = (Number(end) - Number(cur)) / 1000.;
	if (tst > 0)
		rem = tst;
	let da = Math.floor(rem / 86400), ho = Math.floor(rem % 86400 / 3600), mi = Math.floor(rem % 3600 / 60), se = rem % 60;
	if (!flgshow && cur > beg)
		showlist(), flgshow = 1;
	$("#remain-time").text(cur < beg ? "距离比赛开始 " + ((da ? da.toString() + " 天 " : "") + (ho ? ho.toString() + " 时 " : "") + (mi ? mi.toString() + " 分 " : "") + (se ? Math.floor(se).toFixed(0).toString() + " 秒 " : "")) : cur > end ? "已结束" : ((da ? da.toString() + " 天 " : "") + (ho ? ho.toString() + " 时 " : "") + (mi ? mi.toString() + " 分 " : "") + (se ? Math.floor(se).toFixed(0).toString() + " 秒 " : "")));
	$("#timeprog").progress({
		percent: getpercent() * 100
	});
}
/**
 * Refresh the ranking table.
 */
function rankfresh(data) {
	beg = Number(data.st), end = Number(data.ed);
	let subs = {}, acc = [], ple = [], id = [], hascf = 0, extp = [], cfid = [];
	for (let i = 0; i < data.players.length; i++)
		acc.push(0), ple.push(0), id.push(i), extp.push(0);
	for (let i in data.problems)
		hascf |= data.problems[i].substr(0, 2) === 'CF';
	for (let i in data.players) {
		let li = data.players[i].split('(');
		if (li.length == 2)
			data.players[i] = li[0], cfid.push(li[1].substr(0, li[1].length - 1));
		else cfid.push(data.players[i]);
	}
	new Promise(function(resolve, reject){
		!function(i) {
			if (i === data.players.length) {
				return;
			}
			let sub, cfsub;
			readTextFile('https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=' +
				data.players[i] + '&from_second=' + Math.floor(beg / 1000), 'json', function (text) {
					sub = JSON.parse(text);
				});
			if (hascf == 1) {
				readTextFile('https://codeforces.com/api/user.status?handle=' + cfid[i] + '&from=1&count=100', 'json', function (text) {
					cfsub = JSON.parse(text);
				});
				cfsub = cfsub.result;
			}
			subs[i] = {
				ac: {},
				pl: {},
				tm: {},
				wj: {}
			};
			for (let t = 0; t < sub.length; t++) {
				let c = sub[t];
				if (Number(c.epoch_second) * 1000 >= end)
					continue;
				for (var j = 0; j < data.problems.length; j++)
					if (c.problem_id == data.problems[j]) {
						if (c.result == 'AC') {
							subs[i].wj = 0;
							if (subs[i].ac[data.problems[j]] != 1) {
								if (data.mod == 'atcoder') acc[i] += data.score[j];
								else acc[i] += 1;
							}
							subs[i].ac[data.problems[j]] = 1;
							subs[i].tm[data.problems[j]] = c.epoch_second;
							if (subs[i].pl[data.problems[j]] == undefined)
								subs[i].pl[data.problems[j]] = 0;
							if (data.mod == undefined || data.mod == "ICPC") ple[i] += (c.epoch_second * 1000 - beg) / 1000;
							else if (data.mod == "atcoder") ple[i] = Math.max(ple[i], (c.epoch_second * 1000 - beg) / 1000);
						} else if (47 < c.result[0] || c.result[0] < 58 || c.result == 'WJ') {
							subs[i].wj = 1;
						} else if (c.result != 'CE') {
							subs[i].wj = 0;
							if (subs[i].pl[data.problems[j]] == undefined)
								subs[i].pl[data.problems[j]] = 0;
							subs[i].pl[data.problems[j]] += 1;
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
								if (data.mod == undefined || data.mod == "ICPC") ple[i] += (c.creationTimeSeconds * 1000 - beg) / 1000;
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
			setTimeout(arguments.callee(i + 1), 1000);
		}(0);
	}).then(!function() {
		function getp(x) { return ple[x] + extp[x]; }
		id.sort(function (a, b) {
			if (acc[a] == acc[b]) {
				return getp(a) - getp(b);
			}
			else
				return acc[b] - acc[a]
		})
		let res = '<thead><tr><th>选手列表</th>';
		if (data.mod === 'atcoder') res += '<th>分数</th>';
		else res += '<th>过题数</th>';
		if (data.mod === undefined || data.mod !== 'practice')
			res += '<th>罚时</th>';
		for (let i = 0; i < data.problems.length; i++) {
			let p = data.problems[i].lastIndexOf('_'), con = data.problems[i].substr(0, p);
			while (con.match("_") !== null)
				con = con.replace("_", "-");
			if (data.problems[i].substr(0, 2) != 'CF')
				res += '<th>' + '<a href="https://atcoder.jp/contests/' + con + '/tasks/' + data.problems[i] + '">' + (i + 1) + '</a></th>';
			else {
				let c = data.problems[i].substr(2), p, q, pos = 0;
				for (let j = 0; j < c.length; j++)
					if (c[j] >= 'A') {
						pos = j;
						break;
					}
				p = c.substr(0, pos), q = c.substr(pos);
				res += '<th>' + '<a href="https://codeforces.com/problemset/problem/' + p + '/' + q + '">' + (i + 1) + '</a></th>';
			}
		}
		res += '</tr></thead><tbody>';
		for (let t = 0; t < data.players.length; t++) {
			let i = id[t];
			res += '<tr><td>(' + (t + 1) + ') <a href=\"https://atcoder.jp/users/' + data.players[i] + "\">" + data.players[i] + '</a></td>';
			let dr = Math.floor(getp(i)), hours = Math.floor(dr / 3600), minu = Math.floor(dr % 3600 / 60), seco = dr % 60;
			res += '<td> ' + acc[i] + '</td>';
			function z2(x) {
				return String(x).padStart(2, '0');
			}
			if (data.mod === undefined || data.mod != "practice") res += '<td> ' + z2(hours) + ':' + z2(minu) + ':' + z2(seco) + '</td>';
			for (let j = 0; j < data.problems.length; j++) {
				if (subs[i].wj[data.problems[j]] == 1) {
					res += '<td class="warning"><i class="icon hourglass half"></i>';
				} else if (subs[i].ac[data.problems[j]] == 1) {
					res += '<td class="positive"><i class="icon checkmark"></i>';
				} else if (subs[i].pl[data.problems[j]] != 0 && subs[i].pl[data.problems[j]] != undefined) {
					res += '<td class="negative"><i class="icon close"></i>';
				} else {
					res += '<td>-';
				}
				if (subs[i].ac[data.problems[j]] == 1) {
					let dr = Math.floor((Number(subs[i].tm[data.problems[j]]) * 1000 - beg) / 1000),
						h = Math.floor(dr / 3600), m = Math.floor(dr % 3600 / 60), s = dr % 60;
					res += ' ' + z2(h) + ':' + z2(m) + ':' + z2(s);
				}
				if (subs[i].pl[data.problems[j]])
					res += ' (' + subs[i].pl[data.problems[j]] + ')';
				res += '</td>';
			}
			res += '</tr>'
		}
		res += '<tbody>';
		$("#table").html(res);
	}());
}

/**
 * Main function. Build the contest page.
 */
var data;
function buildPage() {
	let s = window.location.href, trans = new Base64();
	while (s.match('%22') !== null)
		s = s.replace('%22', '"');
	while (s.match('%3D') !== null)
		s = s.replace('%3D', '=');
	s = trans.decode(s.split('?')[1].substr(3));
	data = JSON.parse(s);
	beg = Number(data.st), end = Number(data.ed);
	let start = new Date(beg), finish = new Date(end);
	beg = Number(data.st), end = Number(data.ed);
	start = new Date(beg), finish = new Date(end);
	$("#title-name").text(data.title);
	$("#start-time").text(dateToString(start));
	$("#finish-time").text(dateToString(finish));
	$("#duration-time").text(timeToString(new Date(Number(finish) - Number(start))));
	$("#heading").html("<th>题目编号</th>" + (data.mod === "atcoder" ? "<th class='collapsing'>题目分数</th>" : "") + "<th>题目标题</th>");
	for (let i in data.problems) {
		let p = data.problems[i].lastIndexOf('_'), con = data.problems[i].substr(0, p);
		while (con.match("_") !== null)
			con = con.replace("_", "-");
		let ext = "", t = document.createElement("tr");
		if (data.mod === 'atcoder') ext = '<td>' + data.score[i] + '</td>';
		if (data.problems[i].substr(0, 2) !== 'CF')
			t.innerHTML = '<tr><td>' + (Number(i) + 1) + '</td>' + ext + '<td><a href="https://atcoder.jp/contests/' + con + '/tasks/' + data.problems[i] + '">' + data.problems[i] + '</a></td></tr>';
		else {
			let c = data.problems[i].substr(2), p, q, pos = 0;
			for (let j = 0; j < c.length; j++)
				if (c[j] >= 'A') {
					pos = j;
					break;
				}
			t.innerHTML = '<td>' + (Number(i) + 1) + '</td>' + ext + '<td><a href="https://codeforces.com/problemset/problem/' + c.substr(0, pos) + '/' + c.substr(pos) + '">' + c + '</a></td>';
		}
		$("#probs").append(t);
	}
	showlist();
	rankfresh(data);
	setInterval(rankfresh, 120000, data);
	$(function () {
		setInterval(function () {
			refreshtime();
		}, 500);
	});
}
