function readTextFile(file, ext, callback, isLocked = true) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/" + ext);
	xhr.open("GET", file, !isLocked);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4)
			callback(xhr.responseText, xhr.status);
	}
	try {
		xhr.send();
	} catch {
		alert("[Error] Can't fetch resource: " + file + "");
	}
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
const labels = {
	"abc": {
		name: "ABC",
		index: ["A", "B", "C", "D", "E", "F", "G", "H/Ex"]
	}, "arc": {
		name: "ARC",
		index: ["A", "B", "C", "D", "E", "F", "F2"]
	}, "agc": {
		name: "AGC",
		index: ["A", "B", "C", "D", "E", "F", "F2"]
	}, "abc_like": {
		name: "ABC-Like",
		index: ["A", "B", "C", "D", "E", "F", "G", "H/Ex"]
	}, "arc_like": {
		name: "ARC-Like",
		index: ["A", "B", "C", "D", "E", "F"]
	}, "agc_like": {
		name: "AGC-Like",
		index: ["A", "B", "C", "C1", "C2", "D", "E", "F", "G", "H", "I", "J"]
	}, "ahc": {
		name: "AHC"
	}, "others": {
		name: "其他"
	}
};
let problist = [], contlist = [], rawd, traList, solList, tags, prbs, tagList, nameList = [], probCell = {}, comboCell = {};
function transdiff(d) {
	return d === null ? 100000 : Math.round(d >= 400 ? d : 400 / Math.exp(1.0 - d / 400));
}
function closealltables() {
	for (let i in nameList) {
		document.getElementById(nameList[i].id).setAttribute("style", "display: none;");
	}
	document.getElementById("prob-list").setAttribute("style", "display: none;");
	document.getElementById("cont-page").setAttribute("style", "display: none;");
}
function labToggle(name) {
	closealltables();
	document.getElementById(name).setAttribute("style", "display: block;");
}
function tagToggle(id) {
	document.getElementById("tag-" + id).setAttribute("style", document.getElementById("tag-" + id).getAttribute("style") == "display: block;" ? "display: none;" : "display: block;");
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
function getDiffCirc(d) {
	let t = getColor(d);
	if (d < 3200) {
		return "<ta href=\"\" title=\"难度：" + d + "\"><span class=\"difficulty-circle\" style=\"border-color: " + t.rgb + "; background: linear-gradient(to top, " + t.rgb + " " + t.val + "%, rgba(0, 0, 0, 0) " + t.val + "%) border-box;\"></span></ta>";
	} else if (d < 3600) {
		return "<ta href=\"\" title=\"难度：" + d + "\"><span class=\"difficulty-circle bronze-circle\"></span></ta>";
	} else if (d < 4000) {
		return "<ta href=\"\" title=\"难度：" + d + "\"><span class=\"difficulty-circle silver-circle\"></span></ta>";
	} else if (d < 10000) {
		return "<ta href=\"\" title=\"难度：" + d + "\"><span class=\"difficulty-circle gold-circle\"></span></ta>";
	} else {
		return "<ta href=\"\" title=\"难度：暂未评定\"><span class=\"diff-unavailable\">?</span></ta>";
	}
}
function formatDate(s, fmt = "yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒") {
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
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").slice(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).slice(("" + o[k]).length)));
			}
		}
		return fmt;
	}
	let t = new Date(s).format(fmt);
	return t.toString();
}
function showProbModal(cid, pid, title, op) {
	let list = (op ? solList : traList)[cid][pid], content = "\
		<div class=\"ui segment\">\
			<H2 class=\"ui medium block top attached header\">" + title + "</h2>";
	if (list == 0) {
		content += "\
			<div class=\"ui placeholder attached segment\">\
				<div class=\"ui icon header\">\
					<i aria-hidden=\"true\" class=\"hdd outline icon\"></i>\
					没有内容\
				</div>\
			</div>\
		</div>";
	} else {
		content += "\
			<div class=\"ui attached segment\">\
				<table class=\"ui single line table fixed\">\
					<thead>\
						<tr>\
							<th>标题</th>\
							<th>作者</th>\
							<th>创建时间</th>\
							<th>最后修改时间</th>\
						</tr>\
					</thead>\
					<tbody>";
		for (let i in list) {
			let cur = list[i];
			content += "<tr>\
							<td><a href=\"?page=" + (op ? "S" : "T") + cid + "." + pid + "." + i + "\">" + cur.title + "</a></td>\
							<td>" + cur.author + "</td>\
							<td>" + formatDate(cur.created) + "</td>\
							<td>" + formatDate(cur.lastCommit.date) + "</td>\
						</tr>";
		}
		content += "</tbody>\
				</table>\
			</div>\
		</div>";
	}
	document.getElementById("show-prob-list").innerHTML = content;
	$("#show-prob-list").modal("show");
}

function buildTable(name, uname, data, prbIdx) {
	let c = prbIdx.length, cnt = 0, cnte = 0, cnts = 0, cntt = 0, cont = [], tbl = [], idxList = prbIdx;
	for (let i in idxList) {
		idxList[i] = prbIdx[i].split("/");
	}
	for (let i in data) {
		cont.push(data[i]);
	}
	cont.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
	for (let i in cont) {
		let prb = new Array(c);
		for (let j = 0; j < c; j++)
			prb[j] = {
				html: "<td></td>"
			};
		for (let j in cont[i].problems) {
			let idx = cont[i].problems[j].problem_index, p = prbIdx.findIndex((t) => t.find((a) => a == idx) != undefined), cid = cont[i].id, pid = cont[i].problems[j].id, dif = transdiff(cont[i].problems[j].difficulty), uname = cont[i].id.toUpperCase() + "_" + idx, lnk = "";
			cnt++;
			prb[p] =
				"<td id=\"cell-" + pid + "-" + name + "\">\
					<a href=\"https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "\" class=\"diff-" + getColor(dif).name + "\">\
						<ta href=\"javascript:void(0)\" title=\"难度：" + (dif == 100000 ? "暂未评定" : dif.toString()) + "\"" + getDiffCirc(dif) + idx + "&nbsp;\
						</ta>\
					</a>";
			problist[pid] = {
				tra: 0,
				sol: 0,
				cid: cid,
				diff: dif,
				type: name,
				uname: uname,
				tag: tags[uname],
				time: cont[i].start_epoch_second,
				title: cont[i].problems[j].title,
				org_a: "<a href=\"https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "\">" + uname + "</a>"
			};
			if ((cont[i].id in traList) && (pid in traList[cid])) {
				problist[pid].tra = 1;
				prb[p] += "<a class=\"link-black\" href=\"javascript:void(0);\" onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题面\", 0)'>题面</a>&nbsp;&nbsp;"
				cnte++;
			}
			if ((cont[i].id in solList) && (pid in solList[cid])) {
				problist[pid].sol = 1;
				prb[p] += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题解\", 1)'>题解</a>";
				cnts++;
			}
			if (uname in tags) {
				let tgLst = tags[uname];
				prb[p] +=
					"<div onclick=\"tagToggle('" + pid + "-" + name + "')\" style=\"position: relative; right: -5;\">\
						<a class=\"floating ui circular teal right label\" style=\"background-color: #50d0d0!important\">" + tgLst.length + "</a>\
					</div>\
					<div id=\"tag-" + pid + "-" + name + "\" style=\"display: none;\">";
				for (let t in tgLst) {
					prb[p] +=
						"<p class=\"ui tag label\">" + tgLst[t] + "</p>";
				}
				prb[p] +=
					"</div>";
				cntt++;
			}
			if (probCell[pid] == undefined) {
				probCell[pid] = [];
			}
			prb[p] = {
				html: prb[p],
				id: "cell-" + pid + "-" + name
			};
			probCell[pid].push(prb[p].id);
		}
		tbl.push(prb);
	}
	document.write("\
		<div id=\"" + name + "-table\">\
			<table class=\"ui fixed celled definition table segment\">\
				<thead class=\"full-width\">\
					<tr>\
						<th>比赛</th>");
	for (let i = 0; i < c; i++) {
		document.write("<th id='cell-" + i + "-" + name + "'>" + prbIdx[i] + "</th>");
		comboCell["cell-" + i + "-" + name] = [];
	}
	document.write("</tr>\
				</thead>\
			<tbody>");
	for (let i in cont) {
		let cid = cont[i].id;
		document.write("\
				<tr>\
					<td id=\"cell-" + cid + "-" + name + "\">\
						<a href=\"https://atcoder.jp/contests/" + cid + "\">" + cid.toUpperCase() + "</a>\
					</td>");
		comboCell["cell-" + cid + "-" + name] = [];
		for (let j in tbl[i]) {
			document.write(tbl[i][j].html);
			if (tbl[i][j].html != "<td></td>") {
				comboCell["cell-" + j + "-" + name].push(tbl[i][j].id);
				comboCell["cell-" + cid + "-" + name].push(tbl[i][j].id);
			}
		}
		document.write("\
				</tr>");
	}
	document.write("\
			</tbody>\
		</table>");
	let eper = (cnte / cnt * 100).toFixed(3), sper = (cnts / cnt * 100).toFixed(3), tper = (cntt / cnt * 100).toFixed(3);
	document.write("\
		<p align=\"center\">\
			<div class=\"ui indicating progress\" data-percent=\"" + eper + "\" id=\"progress-tre-" + name + "\">\
				<div class=\"bar\"></div>\
				<div class=\"label\">" + eper + "% 题面已完成</div>\
			</div>\
		</p>\
		<p align=\"center\">\
			<div class=\"ui indicating progress\" data-percent=\"" + sper + "\" id=\"progress-sol-" + name + "\">\
				<div class=\"bar\"></div>\
				<div class=\"label\">" + sper + "% 题解已完成</div>\
			</div>\
		</p>\
		<p align=\"center\">\
			<div class=\"ui indicating progress\" data-percent=\"" + tper + "\" id=\"progress-tag-" + name + "\">\
				<div class=\"bar\"></div>\
				<div class=\"label\">" + tper + "% 标签已完成</div>\
			</div>\
		</p>\
	</div>");
	$("#progress-tre-" + name).progress({
		percent: eper
	});
	$("#progress-sol-" + name).progress({
		percent: sper
	});
	$("#progress-tag-" + name).progress({
		percent: tper
	});
	console.log(cnt, cnte, cnts, cntt);
	nameList.push({
		id: name + "-table",
		name: uname
	});
}

function buildContList(name, uname, data) {
	let cnt = 0, cnte = 0, cnts = 0, cntt = 0, cont = [], tbl = [];
	for (let i in data) {
		cont.push(data[i]);
	}
	cont.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
	for (let i in cont) {
		let prb = [];
		for (let j in cont[i].problems) {
			let idx = cont[i].problems[j].problem_index, cid = cont[i].id, pid = cont[i].problems[j].id, dif = transdiff(cont[i].problems[j].difficulty), uname = cont[i].id.toUpperCase() + "_" + idx, lnk = "";
			cnt++;
			let cur =
				"<td class='elipsed' id=\"cell-" + pid + "-" + name + "\">\
					<a href=\"https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "\" class=\"diff-" + getColor(dif).name + "\">\
						<ta href=\"javascript:void(0)\" title=\"难度：" + (dif == 100000 ? "暂未评定" : dif.toString()) + "\"" + getDiffCirc(dif) + idx + "&nbsp;\
						</ta>\
					</a>";
			if ((cont[i].id in traList) && (pid in traList[cid])) {
				lnk += "<a class=\"link-black\" href=\"javascript:void(0);\" onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题面\", 0)'>题面</a>&nbsp;&nbsp;"
				cnte++;
			}
			if ((cont[i].id in solList) && (pid in solList[cid])) {
				lnk += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题解\", 1)'>题解</a>";
				cnts++;
			}
			lnk = "<div>" + lnk + "</div>";
			problist[pid] = {
				pid: pid,
				cid: cid,
				diff: dif,
				lnks: lnk,
				type: name,
				uname: uname,
				tag: tags[uname],
				time: cont[i].start_epoch_second,
				title: cont[i].problems[j].title,
				org_a: "<a href=\"https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "\">" + uname + "</a>"
			};
			if (uname in tags) {
				let tgLst = tags[uname];
				cur +=
					"<div onclick=\"tagToggle('" + pid + "-" + name + "')\" style=\"position: relative; right: -5;\">\
						<a class=\"floating ui circular teal right label\" style=\"background-color: #50d0d0!important\">" + tgLst.length + "</a>\
					</div>\
					<div id=\"tag-" + pid + "-" + name + "\" style=\"display: none;\">";
				for (let t in tgLst) {
					cur +=
						"<p class=\"ui tag label\">" + tgLst[t] + "</p>";
				}
				cur +=
					"</div>";
				cntt++;
			}
			if (probCell[pid] == undefined) {
				probCell[pid] = [];
			}
			cur = {
				html: cur,
				id: cur == "<td></td>" ? 0 : "cell-" + pid + "-" + name
			};
			probCell[pid].push(cur.id);
			prb.push(cur);
		}
		tbl.push(prb);
	}
	document.write("\
		<div id=\"" + name + "-lst\">");
	for (let i in cont) {
		let cid = cont[i].id;
		document.write("\
			<div class=\"ui segment\">\
				<div class=\"ui top attached large label\" id=\"cell-" + cid + "\">\
					<a href=\"https://atcoder.jp/contests/" + cid + "\">" + cont[i].title + "（" + cid.toUpperCase() + "）</a>\
				</div>\
				<div style=\"overflow-x: " + (tbl[i].length < 10 ? "hidden" : "scroll") + ";\">\
					<div style=\"width: " + (tbl[i].length < 10 ? "auto" : 7 * tbl[i].length) + "em;\">\
						<table class=\"ui fixed celled table\">\
							<tbody>\
								<tr>");
		comboCell["cell-" + cid] = [];
		for (let j in tbl[i]) {
			document.write(tbl[i][j].html);
			comboCell["cell-" + cid].push(tbl[i][j].id);
		}
		document.write("</tr>\
							</tbody>\
						</table>\
					</div>\
				</div>\
			</div>");
	}
	let eper = (cnte / cnt * 100).toFixed(3).toString(), sper = (cnts / cnt * 100).toFixed(3).toString(), tper = (cntt / cnt * 100).toFixed(3);
	document.write("\
			<p align=\"center\">\
				<div class=\"ui indicating progress\" data-percent=\"" + eper + "\" id=\"progress-tre-" + name + "\">\
					<div class=\"bar\"></div>\
					<div class=\"label\">" + eper + "% 题面已完成</div>\
				</div>\
			</p>\
			<p align=\"center\">\
				<div class=\"ui indicating progress\" data-percent=\"" + sper + "\" id=\"progress-sol-" + name + "\">\
					<div class=\"bar\"></div>\
					<div class=\"label\">" + sper + "% 题解已完成</div>\
				</div>\
			</p>\
			<p align=\"center\">\
				<div class=\"ui indicating progress\" data-percent=\"" + tper + "\" id=\"progress-tag-" + name + "\">\
					<div class=\"bar\"></div>\
					<div class=\"label\">" + tper + "% 标签已完成</div>\
				</div>\
			</p>\
		</div>");
	$("#progress-tre-" + name).progress({
		percent: cnte / cnt * 100
	});
	$("#progress-sol-" + name).progress({
		percent: cnts / cnt * 100
	});
	$("#progress-tag-" + name).progress({
		percent: cntt / cnt * 100
	});
	console.log(cnt, cnte, cnts, cntt);
	nameList.push({
		id: name + "-lst",
		uname: uname
	});
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
					setFilter();
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

function getStatPriority(stat) {
	if (stat == "AC in contest")
		return 4;
	if (stat == "AC")
		return 3;
	if (stat == "UA in contest")
		return 2;
	if (stat == "UA")
		return 1;
	return 0;
}
function getStatColor(stat) {
	if (stat == "AC in contest")
		return "#9ad59e";
	if (stat == "AC")
		return "#c3e6cb";
	if (stat == "UA in contest")
		return "#fd9";
	if (stat == "UA")
		return "#ffeeba";
	return "#fff";
}
function getStatClass(stat) {
	if (stat == undefined)
		return "";
	if (stat.slice(0, 2) == "AC")
		return "positive";
	if (stat.slice(0, 2) == "UA")
		return "negative";
	return "";
}

let curPage = 1;
function refreshMenu() {
	let cnt = 0, html = "";
	for (let i in problist)
		if (isd1[i] && isd2[i])
			cnt++;
	cnt = Math.floor((cnt + 19) / 20);
	html += "<a class='item' onclick='jumpToPage(1)'><i class='angle double left icon'></i></a>";
	if (curPage > 5) {
		html += "<a class='item'><i class='ellipsis horizontal icon'></i></a>";
	}
	let l = Math.max(1, curPage - 3), r = Math.min(cnt, curPage + 3);
	for (let i = l; i < r; i++) {
		html += "<a class='item' onclick='jumpToPage(" + i + ")'>" + i + "</a>";
	}
	if (curPage < cnt - 4) {
		html += "<a class='item'><i class='ellipsis horizontal icon'></i></a>";
	}
	html += "<a class='item' onclick='jumpToPage(" + cnt + ")'><i class='angle double right icon'></i></a>";
	document.getElementById("prob-list-menu").innerHTML = html;
}
function jumpToPage(x) {
	curPage = x;
	let cnt = 0;
	for (let i in problist)
		if (isd1[i] && isd2[i]) {
			cnt++;
			if (curPage * 20 - 19 <= cnt && cnt <= curPage * 20) {
				document.getElementById(i + "-col").setAttribute("class", getStatClass(pcol[i]));
				document.getElementById(i + "-col").setAttribute("style", "background-color: " + getStatColor(pcol[i]) + "!important");
			} else {
				document.getElementById(i + "-col").setAttribute("style", "display: none;");
			}
		}
	refreshMenu();
}
function refreshList() {
	for (let i in probCell)
		for (let j in probCell[i]) {
			let name = probCell[i][j];
			document.getElementById(name).setAttribute("class", getStatClass(pcol[i]));
			document.getElementById(name).setAttribute("style", "background-color: " + getStatColor(pcol[i]) + "!important");
		}
	for (let i in comboCell) {
		let flg = 1;
		for (let j in comboCell[i]) {
			try {
				flg &= document.getElementById(comboCell[i][j]).getAttribute("style") == "positive";
			} catch {
				console.log(comboCell[i][j]);
			}
		}
		if (flg) {
			document.getElementById(i).setAttribute("class", "positive");
			document.getElementById(i).setAttribute("color", "background-color: #c3e6cb!important");
		}
	}
	jumpToPage(curPage = 1);
}
function isinarray(x, a) {
	if (a == undefined)
		return 0;
	let flg = 0;
	for (let i in a)
		flg |= x == a[i];
	return flg;
}
function setFilter() {
	for (let i in problist)
		isd1[i] = isd2[i] = 1;
	for (let i in labels) {
		let val = $("#" + i + "-checkbox").checkbox("is checked");
		for (let j in problist)
			if (problist[j].type == i)
				isd1[j] = val;
	}
	document.getElementById("rndprob").innerHTML = "";
	let dl = document.getElementById("diflb").value, dr = document.getElementById("difrb").value, utg = $(".ui.dropdown").dropdown("get value"), flgor = $("#tag-combined-or").checkbox("is checked");
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
	jumpToPage(curPage = 1);
}
function clearFilter() {
	for (let i in labels) {
		$("#" + i + "-checkbox").checkbox("set checked");
	}
	document.getElementById("diflb").value = "";
	document.getElementById("difrb").value = "";
	$(".ui.dropdown").dropdown("clear");
	$("#tag-combined-or").checkbox("uncheck");
	setFilter();
}
function getRandProblem() {
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
		if (isd1[i] && isd2[i] && !p--) {
			document.getElementById("rndprob").innerHTML = document.getElementById(i + "-col").innerHTML;
			document.getElementById("rndprob").setAttribute("class", getStatClass(pcol[i]));
			document.getElementById("rndprob").setAttribute("style", "background-color: " + getStatColor(pcol[i]) + "!important");
			break;
		}
	}
}

function writeList(taglist) {
	document.write("\
	<div id=\"prob-list\">\
		<figure class=\"highcharts-figure\">\
			<div id=\"container\" style=\"height:300px\"></div>\
			<p class=\"highcharts-description\"></p>\
		</figure>\
		<div class='ui form' style='margin: 1em 0'>\
			<div class='eight fields'>");
	for (let i in labels) {
		document.write("\
				<div class='field'>\
					<div class='ui checkbox' id='" + i + "-checkbox'>\
						<input type='checkbox' name='" + i + "-checkbox'>\
						<label>\
							选择 " + labels[i].name + "\
						</label>\
					</div>\
				</div>");
	}
	document.write("\
			</div>\
		</div>\
		<div class=\"ui input\">\
			<input id=\"diflb\" style=\"width: 150;\" placeholder=\"筛选难度下界\"/>\
		</div>\
		<div class=\"ui input\">\
			<input id=\"difrb\" style=\"width: 150;\" placeholder=\"筛选难度上界\"/>\
		</div>\
		<div id=\"get-tag\" class=\"ui selection multiple search dropdown\">\
			<input type=\"hidden\" name=\"intag\"/>\
				<div class=\"default text\">\
					单击此处筛选题目标签\
				</div>\
			<div class=\"menu\">");
	for (let i in taglist) {
		document.write("<div class=\"item\" data-value=\"" + taglist[i] + "\">" + taglist[i] + "</div>")
	}
	document.write("\
			</div>\
		</div>\
		&nbsp;&nbsp;\
		<div class=\"ui checkbox\">\
			<input id='tag-combined-or' type='checkbox' name='example'>\
			<label>\
				按或合并标签\
			</label>\
		</div>\
		<p></p>\
		<button class=\"ui violet basic button\" onclick=\"setFilter()\">\
			筛选\
		</button>\
		<button class=\"ui green basic button\" onclick=\"clearFilter()\">\
			重置\
		</button>\
		<button class=\"ui orange basic button\" onclick=\"getRandProblem()\">\
			随机跳题\
		</button>\
		<p></p>\
		<table class='ui fixed celled table segment'>\
			<tbody>\
				<tr id='rndprob'>\
				</tr>\
			</tbody>\
		</table>\
		<div class='ui borderless menu' id='prob-list-menu'></div>\
		<table class='ui fixed sortable celled table segment'>\
			<thead>\
				<tr>\
					<th>编号</th>\
					<th>标题</th>\
					<th>链接</th>\
					<th>难度</th>\
					<th>标签</th>\
				</tr>\
			</thead>\
			<tbody>");
	let tLst = [];
	for (let i in problist) {
		tLst.push(i);
	}
	tLst.sort((a, b) => problist[b].time - problist[a].time);
	for (let id in tLst) {
		let i = tLst[id];
		isd1[i] = 1, isd2[i] = 1, pcol[i] = "#fff";
		document.write("\
					<tr id=\"" + i + "-col\">\
						<td class='elipsed'>" + problist[i].org_a + "</td>\
						<td class='elipsed'>" + getDiffCirc(problist[i].diff) + "<span class=\"diff-" + getColor(problist[i].diff).name + "\">" + problist[i].title + "</span></td>\
						<td>");
		if (problist[i].tra)
			document.write("<a class=\"link-black\" href=\"javascript:void(0);\" onclick='showProbModal(\"" + problist[i].cid + "\", \"" + i + "\", \"" + problist[i].uname + "&nbsp;题面\", 0)'>题面</a>&nbsp;&nbsp;");
		if (problist[i].sol)
			document.write("<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + problist[i].cid + "\", \"" + i + "\", \"" + problist[i].uname + "&nbsp;题解\", 1)'>题解</a>");
		document.write("</td>\
						<td class='elipsed'>" + (problist[i].diff == 100000 ? "unavailable" : problist[i].diff.toString()) + "</td>");
		document.write("<td>");
		if (problist[i].tag != undefined) {
			let t = problist[i].tag;
			for (let j in t) {
				document.write("<div class=\"ui tag label\">" + t[j] + "</div>");
			}
		}
		document.write("</td></tr>");
	}
	document.write("\
				</tbody>\
			</table>\
		</div>");
	$(".ui.dropdown").dropdown({
		on: "hover",
		transition: "drop",
		allowAdditions: 1
	});
	clearFilter();
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
	let trans = new Base64(), invCode = document.getElementById("rev-code").value;
	try {
		JSON.parse(trans.decode(invCode));
	} catch {
		alert("邀请码有误");
		return;
	}
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
function printInviteCode() {
	let res = "", trans = new Base64();
	res += '{"title":"' + document.getElementById("get-title").value + '","mod":';
	if ($("#cont-type-prac").checkbox("is checked")) {
		res += '"practice"';
	} else if ($("#cont-type-icpc").checkbox("is checked")) {
		res += '"ICPC"';
	} else if ($("#cont-type-atc").checkbox("is checked")) {
		res += '"atcoder"';
	} else {
		alert("未选择比赛类型");
		return;
	}
	res += ',"st":';
	let str = document.getElementById("get-start-time").value,
		time = new Date(str), st = Number(time), ed;
	if (str == "") {
		alert("开始时间不合法");
		return;
	}
	res += '"' + st + '","ed":';
	str = document.getElementById("get-finish-time").value;
	time = new Date(str), ed = Number(time);
	if (str == "") {
		alert("结束时间不合法");
		return;
	}
	if (st >= ed) {
		alert("开始时间在结束时间前");
		return;
	}
	res += '"' + ed + '","problems":[';
	let prblist = document.getElementById("get-problems").value.split(' '), scr = [];
	if (document.getElementById("get-problems").value == "") {
		alert("没有题目");
		return;
	}
	for (let i in prblist) {
		let prb = prblist[i], t = 1;
		if (prb == "")
			continue;
		if (prb.indexOf("(") != -1) {
			t = prb.split('(')[1].split(')')[0];
			prb = prb.split('(')[0];
			if (isNaN(Number(t))) {
				alert("分数配置错误");
				return;
			}
			t = Number(t);
		}
		res += '"' + prb + '",';
		scr.push(t);
	}
	res = res.slice(0, res.length - 1);
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
	res = res.slice(0, res.length - 1) + '],"score":[';
	for (let i in scr) {
		if (i > 0) res += ",";
		res += scr[i].toString();
	}
	res += "]}";
	document.getElementById("print-code").value = trans.encode(res);
	copyToClipboard(trans.encode(res));
}
function g2(w) {
	return Math.floor(w / 10).toString() + (w % 10).toString();
}
function buildcontestpage() {
	let stTime = new Date(), edTime = new Date(Number(stTime) + 7200000),
		startTime = formatDate(stTime, "yyyy-MM-ddThh:mm"),
		finishTime = formatDate(edTime, "yyyy-MM-ddThh:mm");
	document.write("\
	<div id=\"cont-page\">\
		<div class=\"ui secondary menu\">\
			<a class=\"item\" onclick=\"showjoinpage()\">\
				参加\
			</a>\
			<a class=\"item\" onclick=\"showcreatepage()\">\
				创建\
			</a>\
		</div>\
		<div id=\"join-page\">\
			<div class=\"ui fluid input\">\
				<input id=\"rev-code\" placeholder=\"输入邀请码\"/>\
				<button class=\"ui button\" onclick=\"redr()\">\
					跳转到比赛界面\
				</button>\
			</div>\
		</div>\
		<div id=\"create-page\">\
			<h4 class=\"ui header\">\
				设置比赛标题\
			</h4>\
			<div class=\"ui fluid input\">\
				<input id=\"get-title\" placeholder=\"比赛标题\"/>\
			</div>\
			<h4 class=\"ui header\">\
				设置比赛类型\
			</h4>\
			<div class=\"ui form\">\
				<div class=\"three fields\">\
					<div class=\"field\">\
						<div class=\"ui radio checkbox\" id=\"cont-type-prac\">\
							<input type=\"radio\" name=\"contest-type\"/>\
							<label>\
								练习赛\
								<i class=\"ui question circle icon helper\" id=\"getPracticeContestInfo\"></i>\
							</label>\
						</div>\
					</div>\
					<div class=\"field\">\
						<div class=\"ui radio checkbox\" id=\"cont-type-icpc\">\
							<input type=\"radio\" name=\"contest-type\"/>\
							<label>\
								ICPC 赛制\
								<i class=\"ui question circle icon helper\" id=\"getICPCContestInfo\"></i>\
							</label>\
						</div>\
					</div>\
					<div class=\"field\">\
						<div class=\"ui radio checkbox\" id=\"cont-type-atc\">\
							<input type=\"radio\" name=\"contest-type\"/>\
							<label>\
								AtCoder 赛制\
								<i class=\"ui question circle icon helper\" id=\"getAtcoderContestInfo\"></i>\
							</label>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class=\"ui popup top center transition hidden\" id=\"practiceContestInfo\" style=\"width: 170px !important\">\
				题目不加权，没有罚时\
			</div>\
			<div class=\"ui popup top center transition hidden\" id=\"ICPCContestInfo\" style=\"width: 210px !important\">\
				题目不加权，罚时加和，每次不通过提交罚时为 5 分钟（CE 不计罚时）\
			</div>\
			<div class=\"ui popup top center transition hidden\" id=\"atcoderContestInfo\" style=\"width: 250px !important\">\
				题目可以设置为加权，罚时取各题通过时间最大值，每次不通过提交罚时额外加 5 分钟（CE 不计罚时）\
			</div>\
			<h4 class=\"ui header\">\
				设置开始时间\
			</h4>\
			<p></p>\
			<div class=\"ui fluid input\">\
				<input id=\"get-start-time\" type=\"datetime-local\" value=\"" + startTime + "\">\
			</div>\
			<h4 class=\"ui header\">\
				设置结束时间\
			</h4>\
			<p></p>\
			<div class=\"ui fluid input\">\
				<input id=\"get-finish-time\" type=\"datetime-local\" value=\"" + finishTime + "\">\
			</div>\
			<h4 class=\"ui header\">\
				参赛选手\
				<i class=\"ui question circle icon helper\" id=\"getAccountInfo\"></i>\
			</h4>\
			<div class=\"ui popup top left transition hidden\" id=\"accountInfo\" style=\"width: 260px !important\">\
				如果需要使用 CodeForces 账号，请使用 <code>&lt;AT账号&gt;(&lt;CF账号&gt;)</code> 的格式，如：<code>houzhiyuan(houzhiyuan123)</code>\
			</div>\
			<div class=\"ui fluid input\">\
				<input id=\"get-players\" placeholder=\"以半角空格分隔\"/>\
			</div>\
			<h4 class=\"ui header\">\
				比赛题目\
			</h4>\
			<div class=\"ui accordion\" id=\"id-sample\">\
				<div class=\"title\">\
					<i class=\"dropdown icon\"></i>\
					格式说明\
				</div>\
				<div class=\"content\">\
					<p>请填写题目链接内的 AtCoder 格式标识符（<code>atcoder.jp/<比赛标识符>/tasks/<题目标识符></code>），例如下：</p>\
					<p><a href=\"https://atcoder.jp/contests/abc255/tasks/abc255_h\">ABC255Ex</a> 的标识符为 abc255_h；</p>\
					<p><a href=\"https://atcoder.jp/contests/abc111/tasks/arc103_b\">ABC111D</a> 的标识符为 arc103_b；</p>\
					<p><a href=\"https://atcoder.jp/contests/zone2021/tasks/zone2021_f\">ZONE2021F</a> 的标识符为 zone2021_f；</p>\
					<p><a href=\"https://atcoder.jp/contests/code-festival-2017-qualc/tasks/code_festival_2017_qualc_f\">CF17QualcF</a> 的标识符为 code_festival_2017_qualc_f。</p>\
					<p>同时支持 CodeForces 题目，格式为 'CFXXXI'（去掉引号），如 CF1A。</p>\
					<p>在 AtCoder 赛制下可以为题目赋不同的权，格式为 <code><题目ID>(<分数>)</code> 的格式，如 <code>abc277_h(600)</code>。权默认为 1。</p>\
				</div>\
			</div>\
			<p></p>\
			<div class=\"ui fluid input\">\
				<input id=\"get-problems\" placeholder=\"以半角空格分隔\"/>\
			</div>\
			<h4 class=\"ui header\">\
				生成邀请码\
			</h4>\
			<div class=\"ui fluid input\">\
				<input id=\"print-code\" placeholder=\"邀请码\"/>\
				<button class=\"ui primary button\" onclick=\"printInviteCode()\" id=\"getCode\">\
					获取邀请码\
				</button>\
			</div>\
		</div>\
	</div>");
	let p = document.getElementById('rev-code');
	if (window.localStorage.getItem('inv-code') != undefined)
		p.value = window.localStorage.getItem('inv-code');
	$("#id-sample").accordion();
	$('#getAccountInfo').popup({
		popup: $("#accountInfo"),
		on: "hover"
	});
	$("#getPracticeContestInfo").popup({
		popup: $("#practiceContestInfo"),
		on: "hover"
	});
	$("#getICPCContestInfo").popup({
		popup: $("#ICPCContestInfo"),
		on: "hover"
	});
	$("#getAtcoderContestInfo").popup({
		popup: $("#atcoderContestInfo"),
		on: "hover"
	});
	$("#getCode").popup({
		content: "邀请码已复制到剪贴板",
		on: "click"
	});
	showjoinpage();
}
let curProb = [];
function importUser() {
	let prbStat = {}, usrList = document.getElementById("user-name").value.split(" ");
	window.localStorage.setItem("default-user-list", document.getElementById("user-name").value);
	for (let i in curProb) {
		pcol[i] = "";
	}
	refreshList();
	for (let i in usrList) {
		let usr = usrList[i], cookie = window.localStorage.getItem("prob-stat-" + usr), lst = 0, usrNotFnd = 0, usrPrbStat = {};
		if (usr == "")
			continue;
		if (cookie != undefined) {
			cookie = JSON.parse(cookie);
			usrPrbStat = cookie.value;
			lst = cookie.lastFetchTime;
		}
		for (let i = lst; i != -1;) {
			readTextFile("https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=" + usr + "&from_second=" + i.toString(), "json", function (txt, sta) {
				if (sta == "200") {
					let sub = JSON.parse(txt), cur = i;
					if (sub == 0) {
						if (i == 0) {
							usrNotFnd = 1;
							alert("未找到用户或者用户没有提交");
						}
						i = -1;
						return;
					}
					for (let j in sub) {
						if (!(sub[j].contest_id in contlist)) {
							continue;
						}
						let isInContest = contlist[sub[j].contest_id].startTime <= sub[j].epoch_second && sub[j].epoch_second <= contlist[sub[j].contest_id].endTime,
							subStat = (sub[j].result == "AC" ? "AC" : "UA") + (isInContest ? " in contest" : "");
						if (getStatPriority(usrPrbStat[sub[j].problem_id]) < getStatPriority(subStat))
							usrPrbStat[sub[j].problem_id] = subStat;
						lst = i = sub[j].epoch_second + 1;
					}
					if (i == cur) {
						i = -1;
						return;
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
			let w = Date.now();
			while (Date.now() < w + 1000);
		}
		if (!usrNotFnd) {
			window.localStorage.setItem("prob-stat-" + usr, JSON.stringify({
				lastFetchTime: lst,
				value: usrPrbStat
			}));
		}
		for (let i in usrPrbStat) {
			if (getStatPriority(prbStat[i]) < getStatPriority(usrPrbStat[i])) {
				prbStat[i] = usrPrbStat[i];
			}
		}
	}
	curProb = [];
	for (let i in prbStat) {
		pcol[i] = prbStat[i];
		curProb.push(i);
	}
	refreshList();
}

function shownotyet() {
	alert("in progress");
}

function buildw() {
	document.write("\
	<div id=\"page-top\" class=\"display: inline;\"></div>\
	<button class=\"circular ui icon button\" onclick=\"jumptotop()\" style=\"z-index: 999; position: fixed; right: 50; top: 50;\" id=\"button-top\">\
		<i style=\"font-size: 1em;\" class=\"arrow up icon\">\
		</i>\
		<p style=\"font-size: 10px; display: inline-block;\">\
			&nbsp;到顶部\
		</p>\
	</button>\
	<button class=\"circular ui icon button\" onclick=\"jumptobottom()\" style=\"z-index: 999; position: fixed; right: 50; bottom: 80;\" id=\"button-end\">\
		<i style=\"font-size: 1em;\" class=\"arrow down icon\">\
		</i>\
		<p style=\"font-size: 10px; display: inline-block;\">\
			&nbsp;到底部\
		</p>\
	</button>\
	<div class=\"ui large basic modal\" id=\"show-prob-list\">\
	</div>\
	<h1>\
		<p align=\"center\">\
			AtCoder 中文版\
		</p>\
	</h1>");
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
	readTextFile("https://atcoder-for-chinese-developers.github.io/spiders/data.json", "json", function (text) {
		try {
			rawd = JSON.parse(text);
			for (let i in rawd) {
				let ci = rawd[i];
				for (let j in ci) {
					let cur = ci[j];
					contlist[cur.id] = {
						startTime: Number(cur["start_epoch_second"]),
						endTime: Number(cur["start_epoch_second"]) + Number(cur["duration_second"])
					};
				}
			}
		} catch {
			alert("The spider does not work. Check your network connection or contact with the site owner.");
			return;
		}
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/translations/list.json", "json", function (text) {
		traList = JSON.parse(text).data;
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/solutions/list.json", "json", function (text) {
		solList = JSON.parse(text).data;
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
		tagList = JSON.parse(text);
	});
	document.write("\
	<div class=\"ui pointing menu\">");
	for (let i in labels) {
		document.write("\
		<a class=\"item\" onclick=\"labToggle('" + i + (labels[i].index == undefined ? "-lst" : "-table") + "')\">\
			" + labels[i].name + "\
		</a>");
	}
	document.write("\
		<a class=\"item\" onclick=\"labToggle('prob-list')\">\
			筛选\
		</a>\
		<a class=\"item\" onclick=\"labToggle('cont-page')\">\
			比赛\
		</a>\
		<div class=\"right menu\">\
			<div class=\"item\">\
				<div class=\"ui transparent icon input\">\
					<input type=\"text\" id=\"user-name\" placeholder=\"导入用户，多个用户用半角空格隔开\" style=\"width: 260px\"/>\
					<i class=\"search link icon\" onclick=\"importUser()\"></i>\
				</div>\
			</div>\
		</div>\
	</div>");
	$("#user-name").keydown(function (e) {
		if (event.keyCode == 13) {
			importUser();
		}
	});
	for (let i in labels) {
		if (labels[i].index == undefined) {
			buildContList(i, labels[i].name, rawd[i]);
		} else {
			buildTable(i, labels[i].name, rawd[i], labels[i].index);
		}
	}
	writeList(tagList);
	buildcontestpage();

	document.write("\
	<div class=\"ui vertical footer segment\">\
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
	</div>\
	<div id=\"page-end\" style=\"display: inline;\"></div>");
	labToggle('abc-table');
	window.onclick();
	document.getElementById("user-name").value = window.localStorage.getItem("default-user-list");
	importUser();
}
