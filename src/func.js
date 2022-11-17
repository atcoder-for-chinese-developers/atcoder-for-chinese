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

function copyToClipboard(txt) {
	const t = document.createElement('textarea');
	t.value = txt;
	document.body.appendChild(t);
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
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
function getabccnt(id) {
	return id < 126 ? 4 : id < 212 ? 6 : 8;
}
function getarccnt(id) {
	return id < 104 ? 4 : id == 120 ? 7 : 6;
}
function getagccnt(id) {
	return id == 28 ? 7 : id == 9 ? 5 : 6;
}
function ext3(con) {
	return (Math.floor(con / 100)).toString() + (Math.floor(con % 100 / 10)).toString() + (con % 10).toString();
}
function transdiff(d) {
	return Math.round(d >= 400 ? d : 400 / Math.exp(1.0 - d / 400));
}
let abctoarc = new Array(233);
function getabcname(con, id) {
	if (abctoarc[con] != undefined && id > 1)
		return "arc" + ext3(abctoarc[con]) + "_" + String.fromCharCode(id + 95);
	return "abc" + ext3(con) + "_" + (con > 19 ? String.fromCharCode(id + 97) : (id + 1).toString());
}
function getarcname(con, id) {
	if (con == 120 && id == 6)
		return "arc120_f2";
	return "arc" + ext3(con) + "_" + (con > 34 ? String.fromCharCode(id + 97) : (id + 1).toString());
}
function getagcname(con, id) {
	if (con == 28 && id == 6)
		return "agc028_f2";
	return "agc" + ext3(con) + "_" + String.fromCharCode(id + 97);
}
function getabcname_u(con, id) {
	return "ABC" + ext3(con) + "_" + (id > 6 ? "Ex" : String.fromCharCode(id + 65));
}
function getarcname_u(con, id) {
	if (con == 120 && id == 6)
		return "ARC120_F2";
	return "ARC" + ext3(con) + "_" + String.fromCharCode(id + 65);
}
function getagcname_u(con, id) {
	if (con == 28 && id == 6)
		return "AGC028_F2";
	return "AGC" + ext3(con) + "_" + String.fromCharCode(id + 65);
}
function sidebartoggle() {
	$('.ui.sidebar').sidebar('toggle');
}
function closealltables() {
	document.getElementById("abc-table").setAttribute("style", "display: none;");
	document.getElementById("arc-table").setAttribute("style", "display: none;");
	document.getElementById("agc-table").setAttribute("style", "display: none;");
	document.getElementById("prob-list").setAttribute("style", "display: none;");
	document.getElementById("cont-page").setAttribute("style", "display: none;");
}
function abctabletoggle() {
	closealltables();
	document.getElementById("abc-table").setAttribute("style", "display: block;");
}
function arctabletoggle() {
	closealltables();
	document.getElementById("arc-table").setAttribute("style", "display: block;");
}
function agctabletoggle() {
	closealltables();
	document.getElementById("agc-table").setAttribute("style", "display: block;");
}
function listtoggle() {
	closealltables();
	document.getElementById("prob-list").setAttribute("style", "display: block;");
}
function contesttoggle() {
	closealltables();
	document.getElementById("cont-page").setAttribute("style", "display: block;");
}
function abctagtoggle(i, j) {
	document.getElementById("tag-" + getabcname(i, j)).setAttribute("style",
		document.getElementById("tag-" + getabcname(i, j)).getAttribute("style") == "display: block;" ? "display: none;" : "display: block;");
}
function arctagtoggle(i, j) {
	document.getElementById("tag-" + getarcname(i, j)).setAttribute("style",
		document.getElementById("tag-" + getarcname(i, j)).getAttribute("style") == "display: block;" ? "display: none;" : "display: block;");
}
function agctagtoggle(i, j) {
	document.getElementById("tag-" + getagcname(i, j)).setAttribute("style",
		document.getElementById("tag-" + getagcname(i, j)).getAttribute("style") == "display: block;" ? "display: none;" : "display: block;");
}
function getColor(k) {
	if (k == 100000) {
		return {
			rgb: "rgb(0,0,0)",
			val: "0",
			name: "black"
		};
	} else if (k < 400) {
		return {
			rgb: "rgb(128,128,128)",
			val: (k / 4).toString(),
			name: "grey"
		};
	} else if (k < 800) {
		return {
			rgb: "rgb(128,64,0)",
			val: ((k - 400) / 4).toString(),
			name: "brown"
		};
	} else if (k < 1200) {
		return {
			rgb: "rgb(0,128,0)",
			val: ((k - 800) / 4).toString(),
			name: "green"
		};
	} else if (k < 1600) {
		return {
			rgb: "rgb(0,192,192)",
			val: ((k - 1200) / 4).toString(),
			name: "cyan"
		};
	} else if (k < 2000) {
		return {
			rgb: "rgb(0,0,255)",
			val: ((k - 1600) / 4).toString(),
			name: "blue"
		};
	} else if (k < 2400) {
		return {
			rgb: "rgb(192,192,0)",
			val: ((k - 2000) / 4).toString(),
			name: "yellow"
		};
	} else if (k < 2800) {
		return {
			rgb: "rgb(255,128,0)",
			val: ((k - 2400) / 4).toString(),
			name: "orange"
		};
	} else {
		return {
			rgb: "rgb(255,0,0)",
			val: ((k - 2800) / 4).toString(),
			name: "red"
		};
	}
}
let problist = [], rawd, tralist, sollist, tags, prbs, taglist;
function formatDate(s) {
	if (s == "")
		return "";
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
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
	let t = new Date(s).format("yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒");
	return t.toString();
}
function showProbModal(cid, pid, title, op) {
	let list = (op ? sollist : tralist)[cid][pid], content = "<div class=\"ui segment\"><H2 class=\"ui medium block top attached header\">" + title + "</h2>";
	if (list == 0) {
		content += "<div class=\"ui placeholder attached segment\"><div class=\"ui icon header\"><i aria-hidden=\"true\" class=\"hdd outline icon\ \"></i>没有内容</div></div>";
	} else {
		content += "<div class=\"ui attached segment\"><table class=\"ui single line table fixed\"> <thead><tr><th>标题</th><th>作者</th><th>创建时间</th><th>最后修改时间</th></tr></thead><tbody>";
		for (let i in list) {
			let cur = list[i];
			content += "<tr>";
			content += "<td><a href=\"?page=" + (op ? "S" : "T") + cid + "." + pid + "." + i + "\">" + cur.title + "</a></td>";
			content += "<td>" + cur.author + "</td>";
			content += "<td>" + formatDate(cur.created) + "</td>";
			content += "<td>" + formatDate(cur.lastCommit.date) + "</td>";
			content += "</tr>";
		}
		content += "</tbody></table></div></div>";
	}
	document.getElementById("show-prob-list").innerHTML = content;
	$("#show-prob-list").modal("show");
}

function writeabc(rawd, tags, list_tre, list_sol, prbs) {
	let Lim = 8, abccnt = 0, mx = 1005, y = new Array(mx), siz = new Array(mx), CCC = new Array(mx), Val = new Array(mx), RG = new Array(mx), Ava_tre = new Array(mx), Ava_sol = new Array(mx), x = new Array(mx), tg = new Array(mx),
		cnt = 0, cnte = 0, cnts = 0, cntt = 0, nametoid = [], abctitle = new Array(mx);
	while (getabcname(abccnt + 1, 1) in rawd)
		abccnt++;
	for (let i = 1; i <= abccnt; i++)
		Ava_tre[i] = new Array(10);
	for (let i = 1; i <= abccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_tre[i][j] = [];
	for (let i = 1; i <= abccnt; i++)
		Ava_sol[i] = new Array(10);
	for (let i = 1; i <= abccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_sol[i][j] = [];
	for (let i = 1; i <= abccnt; i++)
		if (("abc" + ext3(i)) in list_tre)
			for (let j = 0; j < getabccnt(i); j++)
				if (getabcname(i, j) in list_tre["abc" + ext3(i)])
					Ava_tre[i][j] = list_tre["abc" + ext3(i)][getabcname(i, j)];
	for (let i = 1; i <= abccnt; i++)
		if (("abc" + ext3(i)) in list_sol)
			for (let j = 0; j < getabccnt(i); j++)
				if (getabcname(i, j) in list_sol["abc" + ext3(i)])
					Ava_sol[i][j] = list_sol["abc" + ext3(i)][getabcname(i, j)];
	for (let i = 1, ri = 58; i <= abccnt; i++) {
		x[i] = new Array(getabccnt(i));
		tg[i] = new Array(getabccnt(i));
		abctitle[i] = new Array(getabccnt(i));
		cnt += x[i].length;
		let flg = 0;
		for (let j = 0; j < getabccnt(i); j++) {
			if (i < 42 || i > 125 || j < 2 || getabcname(i, j) in rawd)
				x[i][j] = !(getabcname(i, j) in rawd) || !("difficulty" in rawd[getabcname(i, j)]) ? 100000 : transdiff(rawd[getabcname(i, j)].difficulty, 0);
			else
				x[i][j] = !("difficulty" in rawd[getarcname(ri, j - 2)]) ? 100000 : transdiff(rawd[getarcname(ri, j - 2)].difficulty, 0), flg = 1, abctoarc[i] = ri;
		}
		ri += flg;
	}
	for (let i = 1; i <= abccnt; i++)
		for (let j = 0; j < getabccnt(i); j++)
			nametoid[getabcname(i, j)] = [i, j];
	for (let i in prbs)
		if (prbs[i].id in nametoid)
			abctitle[nametoid[prbs[i].id][0]][nametoid[prbs[i].id][1]] = prbs[i].title;
	for (let i = 1; i <= abccnt; i++)
		for (let j = 0; j < getabccnt(i); j++) {
			tg[i][j] = tags[getabcname_u(i, j)];
			problist[getabcname(i, j)] = {
				"tag": tg[i][j],
				"diff": x[i][j],
				"title": abctitle[i][j],
				"org_a": "<a href=\"https://atcoder.jp/contests/abc" + ext3(i) + "/tasks/" + getabcname(i, j) + "\">" + getabcname_u(i, j) + "</a>",
				"prob_a": Ava_tre[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"abc" + ext3(i) + "\", \"" + getabcname(i, j) + "\", \"" + getabcname_u(i, j) + "&nbsp;题面\", 0)'>题面</a>&nbsp;&nbsp;" : "",
				"solu_a": Ava_sol[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"abc" + ext3(i) + "\", \"" + getabcname(i, j) + "\", \"" + getabcname_u(i, j) + "&nbsp;题解\", 1)'>题解</a>" : ""
			};
		}
	for (let i = abccnt; i >= 1; i--) {
		siz[i] = getabccnt(i);
		y[i] = new Array(siz[i]);
		Val[i] = new Array(siz[i]);
		RG[i] = new Array(siz[i]);
		CCC[i] = new Array(siz[i]);
		for (let j = 0; j < siz[i]; j++) {
			CCC[i][j] = "难度：" + x[i][j].toString();
			let c = getColor(x[i][j]);
			RG[i][j] = c.rgb;
			Val[i][j] = c.val;
			y[i][j] = "class=\"diff-" + c.name + "\"";
		}
	}
	document.write("<div id=\"abc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H/Ex</th></thead><tbody>");
	for (let i = abccnt; i; i--) {
		let t = ext3(i);
		document.write('<tr><td id="abc' + t + '-cell"' + "><a href=\"https://atcoder.jp/contests/abc" + t + "\">ABC" + t + "</a></td>");
		for (let j = 0; j < siz[i]; j++) {
			let uC = String.fromCharCode(j + 65), traLink = "", solLink = "";
			if (j == 7 && i > 232)
				uC = "Ex";
			if (Ava_tre[i][j] != 0)
				traLink = problist[getabcname(i, j)].prob_a, cnte++;
			if (Ava_sol[i][j] != 0)
				solLink = problist[getabcname(i, j)].solu_a, cnts++;
			document.write("<td id='" + getabcname(i,j) + "-cell-1'><a href=\"https://atcoder.jp/contests/abc" + t + "/tasks/" + getabcname(i, j) + "\" " + y[i][j] + ">");
			if (x[i][j] < 3200) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle\" style=\"border-color: " + RG[i][j] + "; background: linear-gradient(to top, " + RG[i][j] + " " + Val[i][j] + "%, rgba(0, 0, 0, 0) " + Val[i][j] + "%) border-box;\"></span></ta>");
			} else if (x[i][j] < 3600) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle bronze-circle\"></span></ta>");
			} else if (x[i][j] < 4000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle silver-circle\"></span></ta>");
			} else if (x[i][j] < 10000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle gold-circle\"></span></ta>");
			} else {
				document.write("<ta href=\"\" title=\"难度：暂未评定\"><span class=\"diff-unavailable\">?</span></ta>");
			}
			document.write(uC + " </a>" + traLink + solLink);
			if (tg[i][j] != undefined)
				document.write("<div onclick=\"abctagtoggle(" + i.toString() + "," + j.toString() + ")\" style=\"position: relative; right: -5\"><a class=\"floating ui circular teal right label\" style=\"background-color: #50d0d0!important;\">" + tg[i][j].length.toString() + "</a></div>");
			document.write("<div id=\"tag-" + getabcname(i, j) + "\" style=\"display: none;\">");
			if (tg[i][j] != undefined) {
				cntt++;
				for (let t = 0; t < tg[i][j].length; t++) {
					document.write("<p class=\"ui tag label\">" + tg[i][j][t] + "</p>");
				}
			}
			document.write("</div></td>");
		}
		for (let j = siz[i]; j < Lim; j++)
			document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	let eper = (cnte / cnt * 100).toFixed(3).toString(), sper = (cnts / cnt * 100).toFixed(3).toString(), tper = (cntt / cnt * 100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + eper + "\" id=\"progress-tre-abc\"><div class=\"bar\"></div><div class=\"label\">" + eper + "% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + sper + "\" id=\"progress-sol-abc\"><div class=\"bar\"></div><div class=\"label\">" + sper + "% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + tper + "\" id=\"progress-tag-abc\"><div class=\"bar\"></div><div class=\"label\">" + tper + "% 标签已完成</div></div></p></div>");
	$('#progress-tre-abc').progress({
		percent: cnte / cnt * 100
	});
	$('#progress-sol-abc').progress({
		percent: cnts / cnt * 100
	});
	$('#progress-tag-abc').progress({
		percent: cntt / cnt * 100
	});
	console.log(cnt, cnte, cnts, cntt);
}

function writearc(rawd, tags, list_tre, list_sol, prbs) {
	let Lim = 7, arccnt = 0, mx = 1005, y = new Array(mx), siz = new Array(mx), CCC = new Array(mx), Val = new Array(mx), RG = new Array(mx), Ava_tre = new Array(mx), Ava_sol = new Array(mx), x = new Array(mx), tg = new Array(mx),
		cnt = 0, cnte = 0, cnts = 0, cntt = 0, nametoid = [], arctitle = new Array(mx);
	while (getarcname(arccnt + 1, 1) in rawd)
		arccnt++;
	for (let i = 1; i <= arccnt; i++)
		Ava_tre[i] = new Array(10);
	for (let i = 1; i <= arccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_tre[i][j] = [];
	for (let i = 1; i <= arccnt; i++)
		Ava_sol[i] = new Array(10);
	for (let i = 1; i <= arccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_sol[i][j] = [];
	for (let i = 1; i <= arccnt; i++)
		if (("arc" + ext3(i)) in list_tre)
			for (let j = 0; j < getarccnt(i); j++)
				if (getarcname(i, j) in list_tre["arc" + ext3(i)])
					Ava_tre[i][j] = list_tre["arc" + ext3(i)][getarcname(i, j)];
	for (let i = 1; i <= arccnt; i++)
		if (("arc" + ext3(i)) in list_sol)
			for (let j = 0; j < getarccnt(i); j++)
				if (getarcname(i, j) in list_sol["arc" + ext3(i)])
					Ava_sol[i][j] = list_sol["arc" + ext3(i)][getarcname(i, j)];

	for (let i = 1; i <= arccnt; i++) {
		x[i] = new Array(getarccnt(i));
		tg[i] = new Array(getarccnt(i));
		arctitle[i] = new Array(getarccnt(i));
		cnt += x[i].length;
		for (let j = 0; j < getarccnt(i); j++)
			x[i][j] = !(getarcname(i, j) in rawd) || !("difficulty" in rawd[getarcname(i, j)]) ? 100000 : transdiff(rawd[getarcname(i, j)].difficulty, 0);
	}
	for (let i = 1; i <= arccnt; i++)
		for (let j = 0; j < getarccnt(i); j++)
			nametoid[getarcname(i, j)] = [i, j];
	for (let i in prbs)
		if (prbs[i].id in nametoid)
			arctitle[nametoid[prbs[i].id][0]][nametoid[prbs[i].id][1]] = prbs[i].title;
	for (let i = 1; i <= arccnt; i++)
		for (let j = 57 < i && i < 104 ? 2 : 0; j < getarccnt(i); j++) {
			tg[i][j] = tags[getarcname_u(i, j)];
			problist[getarcname(i, j)] = {
				"tag": tg[i][j],
				"diff": x[i][j],
				"title": arctitle[i][j],
				"org_a": "<a href=\"https://atcoder.jp/contests/arc" + ext3(i) + "/tasks/" + getarcname(i, j) + "\">" + getarcname_u(i, j) + "</a>",
				"prob_a": Ava_tre[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"arc" + ext3(i) + "\", \"" + getarcname(i, j) + "\", \"" + getarcname_u(i, j) + "&nbsp;题面\", 0)'>题面</a>&nbsp;&nbsp;" : "",
				"solu_a": Ava_sol[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"arc" + ext3(i) + "\", \"" + getarcname(i, j) + "\", \"" + getarcname_u(i, j) + "&nbsp;题解\", 1)'>题解</a>" : ""
			};
		}
	for (let i = arccnt; i >= 1; i--) {
		siz[i] = getarccnt(i);
		y[i] = new Array(siz[i]);
		Val[i] = new Array(siz[i]);
		RG[i] = new Array(siz[i]);
		CCC[i] = new Array(siz[i]);
		for (let j = 0; j < siz[i]; j++) {
			CCC[i][j] = "难度：" + x[i][j].toString();
			let c = getColor(x[i][j]);
			RG[i][j] = c.rgb;
			Val[i][j] = c.val;
			y[i][j] = "class=\"diff-" + c.name + "\"";
		}
	}
	document.write("<div id=\"arc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	for (let i = arccnt; i >= 1; i--) {
		let t = ext3(i), w = 57 < i && i < 104 ? 2 : 0;
		document.write("<tr><td id=\"arc" + t + "-cell\"><a href=\"https://atcoder.jp/contests/arc" + t + "\">ARC" + t + "</a></td>");
		for (let j = 0; j < w; j++)
			document.write("<td></td>");
		for (let j = 0; j < siz[i]; j++) {
			let uC = String.fromCharCode(j + 65), traLink = "", solLink = "";
			if (i == 120 && j == 6)
				uC = "F2";
			if (Ava_tre[i][j] != 0)
				traLink = problist[getarcname(i, j)].prob_a, cnte++;
			if (Ava_sol[i][j] != 0)
				solLink = problist[getarcname(i, j)].solu_a, cnts++;
			document.write("<td id=\"" + getarcname(i, j) + "-cell-2\"><a href=\"https://atcoder.jp/contests/arc" + t + "/tasks/" + getarcname(i, j) + "\" " + y[i][j] + ">");
			if (x[i][j] < 3200) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle\" style=\"border-color: " + RG[i][j] + "; background: linear-gradient(to top, " + RG[i][j] + " " + Val[i][j] + "%, rgba(0, 0, 0, 0) " + Val[i][j] + "%) border-box;\"></span></ta>");
			} else if (x[i][j] < 3600) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle bronze-circle\"></span></ta>");
			} else if (x[i][j] < 4000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle silver-circle\"></span></ta>");
			} else if (x[i][j] < 10000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle gold-circle\"></span></ta>");
			} else {
				document.write("<ta href=\"\" title=\"难度：暂未评定\"><span class=\"diff-unavailable\">?</span></ta>");
			}
			document.write(uC + " </a>" + traLink + solLink);
			if (tg[i][j] != undefined)
				document.write("<div onclick=\"arctagtoggle(" + i.toString() + "," + j.toString() + ")\" style=\"position: relative; right: -5\"><a class=\"floating ui circular teal right label\" style=\"background-color: #50d0d0!important;\">" + tg[i][j].length.toString() + "</a></div>");
			document.write("<div id=\"tag-" + getarcname(i, j) + "\" style=\"display: none;\">");
			if (tg[i][j] != undefined) {
				cntt++;
				for (let t = 0; t < tg[i][j].length; t++) {
					document.write("<p class=\"ui tag label\">" + tg[i][j][t] + "</p>");
				}
			}
			document.write("</td>");
		}
		for (let j = siz[i] + w; j < Lim; j++)
			document.write("<td></td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");

	let eper = (cnte / cnt * 100).toFixed(3).toString(), sper = (cnts / cnt * 100).toFixed(3).toString(), tper = (cntt / cnt * 100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + eper + "\" id=\"progress-tre-arc\"><div class=\"bar\"></div><div class=\"label\">" + eper + "% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + sper + "\" id=\"progress-sol-arc\"><div class=\"bar\"></div><div class=\"label\">" + sper + "% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + tper + "\" id=\"progress-tag-arc\"><div class=\"bar\"></div><div class=\"label\">" + tper + "% 标签已完成</div></div></p></div>");
	$('#progress-tre-arc').progress({
		percent: cnte / cnt * 100
	});
	$('#progress-sol-arc').progress({
		percent: cnts / cnt * 100
	});
	$('#progress-tag-arc').progress({
		percent: cntt / cnt * 100
	});
	console.log(cnt, cnte, cnts, cntt);
}

function writeagc(rawd, tags, list_tre, list_sol, prbs) {
	let Lim = 7, agccnt = 0, mx = 1005, y = new Array(mx), siz = new Array(mx), CCC = new Array(mx), Val = new Array(mx), RG = new Array(mx), Ava_tre = new Array(mx), Ava_sol = new Array(mx), x = new Array(mx), tg = new Array(mx),
		cnt = 0, cnte = 0, cnts = 0, cntt = 0, nametoid = [], agctitle = [];
	while (agccnt == 41 || getagcname(agccnt + 1, 1) in rawd)
		agccnt++;
	for (let i = 1; i <= agccnt; i++)
		Ava_tre[i] = new Array(10);
	for (let i = 1; i <= agccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_tre[i][j] = [];
	for (let i = 1; i <= agccnt; i++)
		Ava_sol[i] = new Array(10);
	for (let i = 1; i <= agccnt; i++)
		for (let j = 0; j <= 10; j++)
			Ava_sol[i][j] = [];
	for (let i = 1; i <= agccnt; i++)
		if (("agc" + ext3(i)) in list_tre)
			for (let j = 0; j < getagccnt(i); j++)
				if (getagcname(i, j) in list_tre["agc" + ext3(i)])
					Ava_tre[i][j] = list_tre["agc" + ext3(i)][getagcname(i, j)];
	for (let i = 1; i <= agccnt; i++)
		if (("agc" + ext3(i)) in list_sol)
			for (let j = 0; j < getagccnt(i); j++)
				if (getagcname(i, j) in list_sol["agc" + ext3(i)])
					Ava_sol[i][j] = list_sol["agc" + ext3(i)][getagcname(i, j)];
	for (let i = 1; i <= agccnt; i++) {
		x[i] = new Array(getarccnt(i));
		tg[i] = new Array(getarccnt(i));
		agctitle[i] = new Array(getagccnt(i));
		cnt += x[i].length;
		for (let j = 0; j < getagccnt(i); j++)
			x[i][j] = !(getagcname(i, j) in rawd) || !("difficulty" in rawd[getagcname(i, j)]) ? 100000 : transdiff(rawd[getagcname(i, j)].difficulty, 0);
	}
	for (let i = 1; i <= agccnt; i++)
		for (let j = 0; j < getagccnt(i); j++)
			nametoid[getagcname(i, j)] = [i, j];
	for (let i in prbs)
		if (prbs[i].id in nametoid)
			agctitle[nametoid[prbs[i].id][0]][nametoid[prbs[i].id][1]] = prbs[i].title;
	for (let i = 1; i <= agccnt; i++)
		for (let j = 0; j < getagccnt(i); j++) {
			tg[i][j] = tags[getagcname_u(i, j)];
			problist[getagcname(i, j)] = {
				"tag": tg[i][j],
				"diff": x[i][j],
				"title": agctitle[i][j],
				"org_a": "<a href=\"https://atcoder.jp/contests/agc" + ext3(i) + "/tasks/" + getagcname(i, j) + "\">" + getagcname_u(i, j) + "</a>",
				"prob_a": Ava_tre[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"agc" + ext3(i) + "\", \"" + getagcname(i, j) + "\", \"" + getagcname_u(i, j) + "&nbsp;题面\", 0)'>题面</a>" : "",
				"solu_a": Ava_sol[i][j] != 0 ? "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"agc" + ext3(i) + "\", \"" + getagcname(i, j) + "\", \"" + getagcname_u(i, j) + "&nbsp;题解\", 1)'>题解</a>" : ""
			};
		}
	for (let i = agccnt; i >= 1; i--) {
		siz[i] = getagccnt(i);
		y[i] = new Array(siz[i]);
		Val[i] = new Array(siz[i]);
		RG[i] = new Array(siz[i]);
		CCC[i] = new Array(siz[i]);
		for (let j = 0; j < siz[i]; j++) {
			CCC[i][j] = "难度：" + x[i][j].toString();
			let c = getColor(x[i][j]);
			RG[i][j] = c.rgb;
			Val[i][j] = c.val;
			y[i][j] = "class=\"diff-" + c.name + "\"";
		}
	}
	document.write("<div id=\"agc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	for (let i = agccnt; i; i--) {
		if (i == 42)
			continue;
		document.write("<tr>");
		let t = ext3(i);
		document.write("<td id=\"agc" + t + "-cell\"><a href=\"https://atcoder.jp/contests/agc" + t + "\">AGC" + t + "</a></td>");
		for (let j = 0; j < siz[i]; j++) {
			let uC = String.fromCharCode(j + 65), traLink = "", solLink = "";
			if (i == 28 && j == 6)
				uC = "F2", lC = "_F2\" ";
			if (Ava_tre[i][j] != 0)
				traLink = problist[getagcname(i, j)].prob_a, cnte++;
			if (Ava_sol[i][j] != 0)
				solLink = problist[getagcname(i, j)].solu_a, cnts++;
			document.write("<td id=\"" + getagcname(i, j) + "-cell-3\"><a href=\"https://atcoder.jp/contests/agc" + t + "/tasks/" + getagcname(i, j) + "\" " + y[i][j] + ">");
			if (x[i][j] < 3200) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle\" style=\"border-color: " + RG[i][j] + "; background: linear-gradient(to top, " + RG[i][j] + " " + Val[i][j] + "%, rgba(0, 0, 0, 0) " + Val[i][j] + "%) border-box;\"></span></ta>");
			} else if (x[i][j] < 3600) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle bronze-circle\"></span></ta>");
			} else if (x[i][j] < 4000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle silver-circle\"></span></ta>");
			} else if (x[i][j] < 10000) {
				document.write("<ta href=\"\" title=\"" + CCC[i][j] + "\"><span class=\"difficulty-circle gold-circle\"></span></ta>");
			} else {
				document.write("<ta href=\"\" title=\"难度：暂未评定\"><span class=\"diff-unavailable\">?</span></ta>");
			}
			document.write(uC + " </a>" + traLink + solLink);
			if (tg[i][j] != undefined)
				document.write("<div onclick=\"agctagtoggle(" + i.toString() + "," + j.toString() + ")\" style=\"position: relative; right: -5\"><a class=\"floating ui circular teal right label\" style=\"background-color: #50d0d0!important;\">" + tg[i][j].length.toString() + "</a></div>");
			document.write("<div id=\"tag-" + getagcname(i, j) + "\" style=\"display: none;\">");
			if (tg[i][j] != undefined) {
				cntt++;
				for (let t = 0; t < tg[i][j].length; t++) {
					document.write("<p class=\"ui tag label\">" + tg[i][j][t] + "</p>");
				}
			}
			document.write("</td>");
		}
		for (let j = siz[i]; j < Lim; j++)
			document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	let eper = (cnte / cnt * 100).toFixed(3).toString(), sper = (cnts / cnt * 100).toFixed(3).toString(), tper = (cntt / cnt * 100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + eper + "\" id=\"progress-tre-agc\"><div class=\"bar\"></div><div class=\"label\">" + eper + "% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + sper + "\" id=\"progress-sol-agc\"><div class=\"bar\"></div><div class=\"label\">" + sper + "% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\"" + tper + "\" id=\"progress-tag-agc\"><div class=\"bar\"></div><div class=\"label\">" + tper + "% 标签已完成</div></div></p></div>");
	$('#progress-tre-agc').progress({
		percent: cnte / cnt * 100
	});
	$('#progress-sol-agc').progress({
		percent: cnts / cnt * 100
	});
	$('#progress-tag-agc').progress({
		percent: cntt / cnt * 100
	});
	console.log(cnt, cnte, cnts, cntt);
}

let isd1 = {}, isd2 = {}, pcol = {}, presel = -1;

function refreshchart() {
	let ctg = new Array(44), cnt = new Array(44);
	for (let i = 0; i < 44; i++)
		ctg[i] = "<" + (i * 100 + 100).toString(), cnt[i] = {
			y: 0,
			color: i < 4 ? "rgb(128,128,128)" : i < 8 ? "rgb(128,64,0)" : i < 12 ? "rgb(0,128,0)" : i < 16 ? "rgb(0,192,192)" : i < 20 ? "rgb(0,0,255)" : i < 24 ? "rgb(192,192,0)" : i < 28 ? "rgb(255,128,0)" : "rgb(255,0,0)"
		};
	for (let i in problist)
		if (isd1[i] && isd2[i] && problist[i].diff < 4400)
			cnt[Math.floor(problist[i].diff / 100)].y++;
	Highcharts.chart('container', {
		chart: {
			type: "column",
			events: {
				click: function (event) {
					let p = Math.round(event.xAxis[0].value);
					if (presel != p) {
						presel = p;
						document.getElementById("diflb").value = p * 100;
						document.getElementById("difrb").value = p * 100 + 99;
					} else {
						presel = -1;
						document.getElementById("diflb").value = "";
						document.getElementById("difrb").value = "";
					}
					setfilter();
				}
			}
		},
		title: {
			text: "题目难度统计"
		},
		subtitle: {
			text: ""
		},
		xAxis: {
			categories: ctg,
			crosshair: true
		},
		yAxis: {
			title: {
				useHTML: true,
				text: "数量"
			}
		},
		tooltip: {
			headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>",
			pointFormat: "<tr><td style=\"font-size:10px;color:{series.color};padding:0\">{}:</td>" +
				"<td style=\"font-size:10px;padding:0\"><b>{point.y:.0f}</b></td></tr>",
			footerFormat: "</table>",
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: "题目数量",
			data: cnt
		}
		]
	});
}
function refreshList(){
	for (let i in problist) {
		document.getElementById(i + "-col").setAttribute("style", (isd1[i] && isd2[i] ? "display: auto; " : "display: none; ") + "background-color: " + pcol[i]);
	}
}

function listtoggleabc() {
	let flg = document.getElementById("list-abc-btn").getAttribute("class") == "ui toggle button";
	document.getElementById("list-abc-btn").setAttribute("class", flg ? "ui toggle button active" : "ui toggle button");
	for (let i in problist) {
		if (i.substr(0, 3) == "abc") {
			isd1[i] = flg;
		}
	}
	refreshchart();
	refreshList();
}
function listtogglearc() {
	let flg = document.getElementById("list-arc-btn").getAttribute("class") == "ui toggle button";
	document.getElementById("list-arc-btn").setAttribute("class", flg ? "ui toggle button active" : "ui toggle button");
	for (let i in problist) {
		if (i.substr(0, 3) == "arc") {
			isd1[i] = flg;
		}
	}
	refreshchart();
	refreshList();
}
function listtoggleagc() {
	let flg = document.getElementById("list-agc-btn").getAttribute("class") == "ui toggle button";
	document.getElementById("list-agc-btn").setAttribute("class", flg ? "ui toggle button active" : "ui toggle button");
	for (let i in problist) {
		if (i.substr(0, 3) == "agc") {
			isd1[i] = flg;
		}
	}
	refreshchart();
	refreshList();
}

function isinarray(x, a) {
	if (a == undefined)
		return 0;
	let flg = 0;
	for (let i in a)
		flg |= x == a[i];
	return flg;
}

function setfilter() {
	document.getElementById("rndprob").innerHTML = "";
	let dl = document.getElementById("diflb").value, dr = document.getElementById("difrb").value, utg = $(".ui.dropdown").dropdown("get value"), flgor = $(".ui.checkbox").checkbox("is checked");
	dl = dl == "" || isNaN(Number(dl)) ? -10000 : Number(dl);
	dr = dr == "" || isNaN(Number(dr)) ? 10000 : Number(dr);
	utg = utg == '' ? 0 : utg.split(",");
	for (let i in problist) {
		let flg = (dl == -10000 && dr == 10000) || (dl <= problist[i].diff && problist[i].diff <= dr);
		if (!flgor) {
			for (let j in utg)
				flg &= isinarray(utg[j], problist[i].tag);
		} else {
			if (utg) {
				let flg1 = 0;
				for (let j in utg)
					flg1 |= isinarray(utg[j], problist[i].tag);
				flg &= flg1;
			}
		}
		isd2[i] = flg;
	}
	refreshchart();
	refreshList();
}

function clrfilter() {
	if (document.getElementById("list-abc-btn").getAttribute("class") == "ui toggle button")
		listtoggleabc();
	if (document.getElementById("list-arc-btn").getAttribute("class") == "ui toggle button")
		listtogglearc();
	if (document.getElementById("list-agc-btn").getAttribute("class") == "ui toggle button")
		listtoggleagc();
	document.getElementById("diflb").value = "";
	document.getElementById("difrb").value = "";
	$(".ui.dropdown").dropdown("clear");
	$(".ui.checkbox").checkbox("uncheck");
	setfilter();
}

function getrandprob() {
	document.getElementById("rndprob").innerHTML = "";
	let cnt = 0, p;
	for (let i in problist) {
		if (isd1[i] && isd2[i]) {
			cnt++;
		}
	}
	if (!cnt)
		return;
	p = Math.floor(Math.random() * cnt);
	for (let i in problist) {
		if (isd1[i] && isd2[i]) {
			if (!p--){
				document.getElementById("rndprob").innerHTML = document.getElementById(i + "-col").innerHTML;
				document.getElementById("rndprob").setAttribute("style", document.getElementById(i + "-col").getAttribute("style"));
			}
		}
	}
}

function writelist(taglist) {
	document.write("<div id=\"prob-list\">");
	document.write("<figure class=\"highcharts-figure\"><div id=\"container\" style=\"height:300px\"></div><p class=\"highcharts-description\"></p></figure>");
	document.write("<p><button class=\"ui toggle button active\" id=\"list-abc-btn\" onclick=\"listtoggleabc()\">显示 ABC</button>");
	document.write("<button class=\"ui toggle button active\" id=\"list-arc-btn\" onclick=\"listtogglearc()\">显示 ARC</button>");
	document.write("<button class=\"ui toggle button active\" id=\"list-agc-btn\" onclick=\"listtoggleagc()\">显示 AGC</button></p>");
	document.write("<div class=\"ui input\"><input id=\"diflb\" style=\"width: 150;\" placeholder=\"筛选难度下界\"></input></div>");
	document.write("<div class=\"ui input\"><input id=\"difrb\" style=\"width: 150;\" placeholder=\"筛选难度上界\"></input></div>");
	document.write("<div id=\"get-tag\" class=\"ui selection multiple search dropdown\">\<input type=\"hidden\" name=\"intag\"/>\<div class=\"default text\">单击此处筛选题目标签</div>\<div class=\"menu\">");
	for (let i in taglist) {
		document.write("<div class=\"item\" data-value=\"" + taglist[i] + "\">" + taglist[i] + "</div>")
	}
	document.write("</div></div>");
	$(".ui.dropdown").dropdown({
		on: "hover",
		transition: "drop",
		allowAdditions: 1
	});
	document.write("&nbsp;&nbsp;<div class=\"ui checkbox\"><input type=\"checkbox\" name=\"example\"><label>按或合并标签</label></div>&nbsp;&nbsp;");
	document.write("<button class=\"ui violet basic button\" onclick=\"setfilter()\">筛选</button>");
	document.write("<button class=\"ui green basic button\" onclick=\"clrfilter()\" style=\"display: inline-block;\">重置</button>");
	document.write("<button class=\"ui orange basic button\" onclick=\"getrandprob()\" style=\"display: inline-block;\">随机跳题</button>");
	document.write("<p></p><table class=\"ui fixed celled table segment\"><tbody><tr id=\"rndprob\"></tr></tbody></table>");
	document.write("<table class=\"ui fixed sortable celled table segment\">");
	document.write("<thead><tr><th>编号</th><th>标题</th><th>链接</th><th>难度</th><th>标签</th></thead><tbody>");
	for (let i in problist) {
		isd1[i] = 1;
		isd2[i] = 1;
		pcol[i] = "#fff";
		document.write("<tr id=\"" + i + "-col\">");
		document.write("<td>" + problist[i].org_a + "</td>");
		document.write("<td>" + problist[i].title + "</td>");
		document.write("<td>" + problist[i].prob_a + problist[i].solu_a + "</td>");
		document.write("<td>" + (problist[i].diff == 100000 ? "unavailable" : problist[i].diff.toString()) + "</td>");
		document.write("<td>");
		if (problist[i].tag != undefined) {
			let t = problist[i].tag;
			for (let j = 0; j < t.length; j++) {
				document.write("<div class=\"ui tag label\">" + t[j] + "</div>");
			}
		}
		document.write("</td></tr>");
	}
	document.write("</tbody></table></div>");
	refreshchart();
}

function jumptotop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}
function jumptobottom() {
	window.scrollTo({
		top: $("#page-end").offset().top,
		behavior: "smooth"
	});
}

function redr() {
	window.localStorage.setItem('inv-code', document.getElementById("rev-code").value);
	window.location.href = "contest.html?id=" + escape(document.getElementById("rev-code").value);
}
function closecontestpage() {
	document.getElementById("join-page").setAttribute("style", "display: none;");
	document.getElementById("create-page").setAttribute("style", "display: none;");
}
function showjoinpage() {
	closecontestpage();
	document.getElementById("join-page").setAttribute("style", "display: block;");
}
function showcreatepage() {
	closecontestpage();
	document.getElementById("create-page").setAttribute("style", "display: block;");
}
function checknum(i) {
	return i == "" || isNaN(Number(i));
}
function printinvitecode() {
	let res = "", trans = new Base64();
	res += '{"title":"' + document.getElementById("get-title").value + '","st":';
	let ye = document.getElementById("get-start-ye").value,
		mo = document.getElementById("get-start-mo").value,
		da = document.getElementById("get-start-da").value,
		ho = document.getElementById("get-start-ho").value,
		mi = document.getElementById("get-start-mi").value,
		se = document.getElementById("get-start-se").value,
		time = new Date(), st = 0, ed = 0;
	if (checknum(ye) || checknum(mo) || checknum(da) || checknum(ho) || checknum(mi) || checknum(se)) {
		alert("开始时间不合法");
		return;
	}
	time.setYear(ye);
	time.setMonth(mo - 1);
	time.setDate(da);
	time.setHours(ho);
	time.setMinutes(mi);
	time.setSeconds(se), st = Number(time);
	res += '"' + Number(time) + '","ed":';
	ye = document.getElementById("get-finish-ye").value;
	mo = document.getElementById("get-finish-mo").value;
	da = document.getElementById("get-finish-da").value;
	ho = document.getElementById("get-finish-ho").value;
	mi = document.getElementById("get-finish-mi").value;
	se = document.getElementById("get-finish-se").value;
	time = new Date();
	if (checknum(ye) || checknum(mo) || checknum(da) || checknum(ho) || checknum(mi) || checknum(se)) {
		alert("结束时间不合法");
		return;
	}
	time.setYear(ye);
	time.setMonth(mo - 1);
	time.setDate(da);
	time.setHours(ho);
	time.setMinutes(mi);
	time.setSeconds(se), ed = Number(time);
	if (st > ed) {
		alert("开始时间在结束时间前");
		return;
	}
	res += '"' + Number(time) + '","problems":[';
	let prblist = document.getElementById("get-problems").value.split(' ');
	if (document.getElementById("get-problems").value == "") {
		alert("没有题目");
		return;
	}
	for (let i in prblist) {
		if (prblist[i] != "")
			res += '"' + prblist[i] + '",';
	}
	res = res.substr(0, res.length - 1);
	res += '],"players":[';
	let plylist = document.getElementById("get-players").value.split(' ');
	if (document.getElementById("get-players").value == "") {
		alert("没有参赛者");
		return;
	}
	for (let i in plylist) {
		if (plylist[i] != "")
			res += '"' + plylist[i] + '",';
	}
	res = res.substr(0, res.length - 1) + "]}";
	document.getElementById("print-code").value = trans.encode(res);
	copyToClipboard(trans.encode(res));
}
function buildcontestpage() {
	document.write("<div id=\"cont-page\">");
	// document.write("<p align=\"center\" style=\"font-style: italic;\">注意：该功能仍在施工，不保证没有锅；此处仍未开发完成，老版本的邀请码可能失效。</p>");
	document.write("<div class=\"ui secondary menu\"><a class=\"item\" onclick=\"showjoinpage()\">参加</a><a class=\"item\" onclick=\"showcreatepage()\">创建</a></div>");
	document.write("<div id=\"join-page\">");
	document.write("<div class=\"ui fluid input\"><input id=\"rev-code\" placeholder=\"输入邀请码\"></input><button class=\"ui button\" onclick=\"redr()\">跳转到比赛界面</button></div>");
	let p = document.getElementById('rev-code'), tm = new Date();
	if (window.localStorage.getItem('inv-code') != undefined)
		p.value = window.localStorage.getItem('inv-code');
	document.write("</div><div id=\"create-page\">");
	document.write("<h4 class=\"ui header\">设置比赛标题</h4>");
	document.write("<div class=\"ui fluid input\"><input id=\"get-title\" placeholder=\"比赛标题\"></input></div>");
	document.write("<h4 class=\"ui header\">设置开始时间</h4><div style=\"display: inline;\">");
	document.write("<div class=\"ui right labeled fluid input\"><input id=\"get-start-ye\" value=\"" + (tm.getYear() + 1900) + "\"></input><div class=\"ui label\">年</div><input id=\"get-start-mo\" value=\"" + (tm.getMonth() + 1) + "\"></input><div class=\"ui label\">月</div><input id=\"get-start-da\" value=\"" + tm.getDate() + "\"></input><div class=\"ui label\">日</div><input id=\"get-start-ho\" value=\"" + tm.getHours() + "\"></input><div class=\"ui label\">时</div><input id=\"get-start-mi\" value=\"" + tm.getMinutes() + "\"></input><div class=\"ui label\">分</div><input id=\"get-start-se\" value=\"" + tm.getSeconds() + "\"></input><div class=\"ui label\">秒</div></div></div>");
	document.write("<h4 class=\"ui header\">设置结束时间</h4><p>");
	document.write("<div class=\"ui right labeled fluid input\"><input id=\"get-finish-ye\" placeholder=\"年\" value=\"" + (tm.getYear() + 1900) + "\"></input><div class=\"ui label\">年</div><input id=\"get-finish-mo\" placeholder=\"月\" value=\"" + (tm.getMonth() + 1) + "\"></input><div class=\"ui label\">月</div><input id=\"get-finish-da\" placeholder=\"日\" value=\"" + tm.getDate() + "\"></input><div class=\"ui label\">日</div><input id=\"get-finish-ho\" placeholder=\"时\" value=\"" + tm.getHours() + "\"></input><div class=\"ui label\">时</div><input id=\"get-finish-mi\" placeholder=\"分\" value=\"" + tm.getMinutes() + "\"></input><div class=\"ui label\">分</div><input id=\"get-finish-se\" placeholder=\"秒\" value=\"" + tm.getSeconds() + "\"></input><div class=\"ui label\">秒</div></div></p>");
	document.write("<h4 class=\"ui header\">参赛选手<i class=\"ui question circle icon\" style=\"font-size: 10px!important; top: -8px; position: relative;\" id=\"getInfo\" data-content=\"如果需要使用 CodeForces 账号，请使用 '<AT账号>(<CF账号>)'（去掉引号）的格式，如：'houzhiyuan(houzhiyuan123)'\"></i></h4>");
	$("#getInfo").popup({
		on: "hover"
	});
	document.write("<div class=\"ui fluid input\"><input id=\"get-players\" placeholder=\"以半角空格分隔\"></input></div>");
	document.write("<h4 class=\"ui header\">比赛题目</h4>");
	document.write("<div class=\"ui accordion\" id=\"id-sample\"><div class=\"title\"><i class=\"dropdown icon\"></i>格式说明</div><div class=\"content\">");
	document.write("<p>请填写题目链接内的 AtCoder 格式标识符（<code>atcoder.jp/<比赛标识符>/tasks/<题目标识符></code>），例如下：</p>");
	document.write("<p><a href=\"https://atcoder.jp/contests/abc255/tasks/abc255_h\">ABC255Ex</a> 的标识符为 abc255_h</p>");
	document.write("<p><a href=\"https://atcoder.jp/contests/abc111/tasks/arc103_b\">ABC111D</a> 的标识符为 arc103_b</p>");
	document.write("<p><a href=\"https://atcoder.jp/contests/zone2021/tasks/zone2021_f\">ZONE2021F</a> 的标识符为 zone2021_f</p>");
	document.write("<p><a href=\"https://atcoder.jp/contests/code-festival-2017-qualc/tasks/code_festival_2017_qualc_f\">CF17QualcF</a> 的标识符为 code_festival_2017_qualc_f</p>")
	document.write("<p>同时支持 CodeForces 题目，格式为 'CFXXXI'（去掉引号），如 CF1A</div></div><p></p>");
	$("#id-sample").accordion();
	document.write("<div class=\"ui fluid input\"><input id=\"get-problems\" placeholder=\"以半角空格分隔\"></input></div>");
	document.write("<h4 class=\"ui header\">生成邀请码</h4>");
	document.write("<div class=\"ui fluid input\"><input id=\"print-code\" placeholder=\"邀请码\"></input><button class=\"ui primary button\" onclick=\"printinvitecode()\" id=\"getCode\" data-content=\"邀请码已复制\">获取邀请码</button></div>");
	$("#getCode").popup({
		on: "click"
	});
	document.write("</div></div>");
	showjoinpage();
}
let curProb = [];
function importUser() {
	for (let i in curProb) {
		let cellName = curProb[i] + "-cell-" + {abc: 1, arc: 2, agc: 3}[curProb[i].substr(0,3)], colName = curProb[i] + "-col";
		document.getElementById(cellName).setAttribute("class", prbStat[i] == "AC" ? "positive" : "negative");
		document.getElementById(cellName).setAttribute("style", prbStat[i] == "AC" ? "background-color: #c3e6cb!important" : "background-color: #ffeeba!important");
		pcol[colName] = "#fff";
	}
	let prbStat = {}, usr = document.getElementById("user-name").value, lst = 0,
		cookie = window.localStorage.getItem("prob-stat-" + usr);
	if (cookie != undefined) {
		cookie = JSON.parse(cookie);
		prbStat = cookie.value;
		lst = cookie.lastFetchTime;
	}
	for (let i = lst; i != -1; ) {
		readTextFile("https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=" + usr + "&from_second=" + i.toString(), "json", function(txt, sta){
			if (sta == "200") {
				let sub = JSON.parse(txt);
				if (sub == 0){
					i = -1;
					return;
				}
				for (let j in sub) {
					if (sub[j].result == "AC") {
						prbStat[sub[j].problem_id] = "AC";
					} else if (prbStat[sub[j].problem_id] != "AC") {
						prbStat[sub[j].problem_id] = "UA";
					}
					lst = i = sub[j].epoch_second + 1;
				}
			} else {
				alert("导入用户提交失败，请重试");
				i = -1;
				return;
			}
		});
		if (i == -1) {
			break;
		}
		let w = Date.now()
		while (Date.now() < w + 1000);
	}
	window.localStorage.setItem("prob-stat-" + usr, JSON.stringify({
		lastFetchTime: lst,
		value: prbStat
	}));
	curProb = [];
	for (let i in prbStat) {
		if (i.substr(0,3) == "abc" || i.substr(0,3) == "arc" || i.substr(0,3) == "agc") {
			let cellName = i + "-cell-" + {abc: 1, arc: 2, agc: 3}[i.substr(0,3)], colName = i + "-col";
			document.getElementById(cellName).setAttribute("class", prbStat[i] == "AC" ? "positive" : "negative");
			document.getElementById(cellName).setAttribute("style", prbStat[i] == "AC" ? "background-color: #c3e6cb!important" : "background-color: #ffeeba!important");
			pcol[i] = prbStat[i] == "AC" ? "#c3e6cb" : "#ffeeba";
			curProb.unshift(i);
		}
	}
	refreshList();
}

function buildw() {
	document.write("<div id=\"page-top\" class=\"display: inline;\"></div>");
	document.write("<button class=\"circular ui icon button\" onclick=\"jumptotop()\" style=\"z-index: 999; position: fixed; right: 50; top: 50;\" id=\"button-top\"><i style=\"font-size: 1em;\" class=\"arrow up icon\"></i><p style=\"font-size: 10px; display: inline-block;\">&nbsp;到顶部</p></button>");
	document.write("<button class=\"circular ui icon button\" onclick=\"jumptobottom()\" style=\"z-index: 999; position: fixed; right: 50; bottom: 80;\" id=\"button-end\"><i style=\"font-size: 1em;\" class=\"arrow down icon\"></i><p style=\"font-size: 10px; display: inline-block;\">&nbsp;到底部</p></button>");
	document.write("<div class=\"ui large basic modal\" id=\"show-prob-list\"></div>");
	document.write("<h1><p align=\"center\">AtCoder 中文版</p></h1>");
	window.onscroll = function () {
		let cur = $(document).scrollTop(), h = document.documentElement.clientHeight;
		document.getElementById("button-top").setAttribute("style", cur - $("#page-top").offset().top < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; top: 50;");
		document.getElementById("button-end").setAttribute("style", $("#page-end").offset().top - h - cur < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; bottom: 80;");
	};
	window.onclick = function () {
		let cur = $(document).scrollTop(), h = document.documentElement.clientHeight;
		document.getElementById("button-top").setAttribute("style", cur - $("#page-top").offset().top < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; top: 50;");
		document.getElementById("button-end").setAttribute("style", $("#page-end").offset().top - h - cur < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; bottom: 80;");
	};
	readTextFile("https://kenkoooo.com/atcoder/resources/problem-models.json", "json", function (text) {
		rawd = JSON.parse(text);
	});
	readTextFile("https://kenkoooo.com/atcoder/resources/problems.json", "json", function (text) {
		prbs = JSON.parse(text);
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/translations/list.json", "json", function (text) {
		tralist = JSON.parse(text).data;
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/solutions/list.json", "json", function (text) {
		sollist = JSON.parse(text).data;
	});
	readTextFile("tags.json", "json", function (text) {
		try {
			tags = JSON.parse(text);
		} catch {
			tags = {};
			alert("tags.json is not valid");
		}
	});
	readTextFile("src/tag-list.json", "json", function (text) {
		taglist = JSON.parse(text);
	});
	document.write("<div class=\"ui pointing menu\"><a class=\"item\" onclick=\"abctabletoggle()\">ABC</a><a class=\"item\" onclick=\"arctabletoggle()\">ARC</a><a class=\"item\" onclick=\"agctabletoggle()\">AGC</a><a class=\"item\" onclick=\"listtoggle()\">筛选</a><a class=\"item\" onclick=\"contesttoggle()\">比赛</a><div class=\"right menu\"><div class=\"item\"><div class=\"ui transparent icon input\"><input type=\"text\" id=\"user-name\" placeholder=\"导入用户\"><i class=\"search link icon\" onclick=\"importUser()\"></i></div></div></div></div>");
	$("#user-name").keydown(function (e) {
		if (event.keyCode == 13) {
			importUser();
		}
	});

	writeabc(rawd, tags, tralist, sollist, prbs);
	writearc(rawd, tags, tralist, sollist, prbs);
	writeagc(rawd, tags, tralist, sollist, prbs);
	writelist(taglist);
	buildcontestpage();

	document.write("<div class=\"ui vertical footer segment\">\
			<div class=\"ui center aligned container\">\
				<div class=\"ui section divider\"></div>\
					<div class=\"ui buttons\">\
						<script>\
							function jumplink1(){\
								window.open(\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\");\
							}\
							function jumplink2(){\
								window.open(\"https://atcoder.jp/\");\
							}\
							function jumplink3(){\
								window.open(\"https://kenkoooo.com/atcoder/#/table/\");\
							}\
							function jumplink4(){\
								window.open(\"https://semantic-ui.com/\");\
							}\
							function jumplink5(){\
								window.open(\"https://greasyfork.org/zh-CN/scripts/452449-atcoder-%E4%B8%AD%E6%96%87%E5%8A%A9%E6%89%8B\");\
							}\
						</script>\
						<button class=\"ui basic button\" onclick=\"jumplink1()\"><img src=\"images/logo1.png\"      class=\"ui centered mini image\"/></button>\
						<button class=\"ui basic button\" onclick=\"jumplink2()\"><img src=\"images/atcoder.png\"    class=\"ui centered mini image\"/></button>\
						<button class=\"ui basic button\" onclick=\"jumplink3()\"><img src=\"images/kenkoooo.png\"   class=\"ui centered mini image\"/></button>\
						<button class=\"ui basic button\" onclick=\"jumplink4()\"><img src=\"images/semantic.png\"   class=\"ui centered mini image\"/></button>\
						<button class=\"ui basic button\" onclick=\"jumplink5()\"><img src=\"images/greasyfork.png\" class=\"ui centered mini image\"/></button>\
					</div>\
					<p align=\"center\">\
						Powered by <a href=\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\">AtCoder for Chinese Develop Team</a>.\
					</p>\
			</div>\
		</div>");
	document.write("<div id=\"page-end\" style=\"display: inline;\"></div>");
	abctabletoggle();
	window.onclick();
}
