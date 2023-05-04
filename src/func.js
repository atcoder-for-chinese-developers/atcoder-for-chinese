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
const statuses = [
	{
		name: "NS",
		cname: "未提交",
		color: "#fff"
	}, {
		name: "NA",
		cname: "未通过",
		color: "#ffeeba"
	}, {
		name: "NA-during-Contest",
		cname: "赛时未通过",
		color: "#fd9"
	}, {
		name: "AC",
		cname: "已通过",
		color: "#c3e6cb"
	}, {
		name: "AC-during-Contest",
		cname: "赛时已通过",
		color: "#9ad59e"
	}, {
		name: "AC-before-Contest",
		cname: "赛前通过",
		color: "#9cf"
	}
];
let problist = [], contlist = [], rawd, traList, solList, tags = {}, prbs, tagList, probCell = {}, curProbs = [], probHTML = {}, cmp = (a, b) => problist[b].time - problist[a].time;
function transdiff(d) {
	return d === null || d === undefined ? null : Math.round(d >= 400 ? d : 400 / Math.exp(1.0 - d / 400));
}
function labToggle(name) {
	document.getElementById("cont-tbl").style.display = "none";
	document.getElementById("prob-archive").style.display = "none";
	document.getElementById("cont-page").style.display = "none";
	document.getElementById(name).style.display = "block";
}
function tagToggle(id) {
	document.getElementById("tag-" + id).setAttribute("style", document.getElementById("tag-" + id).getAttribute("style") == "display: block;" ? "display: none;" : "display: block;");
}
function getColor(k) {
	if (k == null) {
		return {
			rgb: "rgb(0,0,0)",
			val: "0",
			name: "black"
		};
	} else if (k < 400) {
		return {
			rgb: "rgb(128,128,128)",
			val: k / 4,
			name: "grey"
		};
	} else if (k < 800) {
		return {
			rgb: "rgb(128,64,0)",
			val: (k - 400) / 4,
			name: "brown"
		};
	} else if (k < 1200) {
		return {
			rgb: "rgb(0,128,0)",
			val: (k - 800) / 4,
			name: "green"
		};
	} else if (k < 1600) {
		return {
			rgb: "rgb(0,192,192)",
			val: (k - 1200) / 4,
			name: "cyan"
		};
	} else if (k < 2000) {
		return {
			rgb: "rgb(0,0,255)",
			val: (k - 1600) / 4,
			name: "blue"
		};
	} else if (k < 2400) {
		return {
			rgb: "rgb(192,192,0)",
			val: (k - 2000) / 4,
			name: "yellow"
		};
	} else if (k < 2800) {
		return {
			rgb: "rgb(255,128,0)",
			val: (k - 2400) / 4,
			name: "orange"
		};
	} else {
		return {
			rgb: "rgb(255,0,0)",
			val: (k - 2800) / 4,
			name: "red"
		};
	}
}
function getDiffCirc(d) {
	let t = getColor(d);
	if (d == null) {
		return "<ta href='' title='难度：暂未评定'><span class='diff-unavailable'>?</span></ta>";
	} else if (d < 3200) {
		return "<ta href='' title='难度：" + d + "'><span class='difficulty-circle' style='border-color: " + t.rgb + "; background: linear-gradient(to top, " + t.rgb + " " + t.val + "%, rgba(0, 0, 0, 0) " + t.val + "%) border-box;'></span></ta>";
	} else if (d < 3600) {
		return "<ta href='' title='难度：" + d + "'><span class='difficulty-circle bronze-circle'></span></ta>";
	} else if (d < 4000) {
		return "<ta href='' title='难度：" + d + "'><span class='difficulty-circle silver-circle'></span></ta>";
	} else if (d < 10000) {
		return "<ta href='' title='难度：" + d + "'><span class='difficulty-circle gold-circle'></span></ta>";
	} else {
		alert("!");
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
	let list = (op ? solList : traList)[cid][pid], content = "<div class='ui segment'><h2 class='ui medium block top attached header'>" + title + "</h2>";
	if (list == 0) {
		content += "<div class='ui placeholder attached segment'><div class='ui icon header'><i aria-hidden='true' class='hdd outline icon'></i>没有内容\</div></div></div>";
	} else {
		content += "<div class='ui attached segment'><table class='ui single line table fixed'><thead><tr><th>标题</th><th>作者</th><th>创建时间</th>\<th>最后修改时间</th></tr></thead><tbody>";
		for (let i in list) {
			let cur = list[i];
			content += "<tr><td><a href='./view?page=" + (op ? "S" : "T") + cid + "." + pid + "." + i + "'>" + cur.title + "</a></td><td>" + cur.author + "</td><td>" + formatDate(cur.created) + "</td><td>" + formatDate(cur.lastCommit.date) + "</td></tr>";
		}
		content += "</tbody></table></div></div>";
	}
	document.getElementById("show-prob-list").innerHTML = content;
	$("#show-prob-list").modal("show");
}

function initProbList() {
	for (let i in labels) {
		let data = rawd[i];
		for (let cid in data) {
			contlist[cid] = {
				type: i,
				startTime: data[cid].start_epoch_second,
				endTime: data[cid].start_epoch_second + data[cid].duration_second
			};
			for (let pid in data[cid].problems) {
				let tcnt = 0, scnt = 0, curp = data[cid].problems[pid], uname = cid.toUpperCase() + "_" + curp.problem_index, tg = tags[uname] ?? [];
				if (cid in traList && pid in traList[cid]) {
					let cur = traList[cid][pid];
					for (let j in cur) {
						tcnt++;
						tg = tg.concat(cur[j].tags);
					}
				}
				if (cid in solList && pid in solList[cid]) {
					let cur = solList[cid][pid];
					for (let j in cur) {
						scnt++;
						tg = tg.concat(cur[j].tags);
					}
				}
				tg = Array.from(new Set(tg));
				problist[pid] = {
					tra: tcnt,
					sol: scnt,
					pid: pid,
					cid: cid,
					tag: tg,
					diff: transdiff(curp.difficulty),
					type: i,
					stat: 0,
					uname: curp.contest_id + "_" + curp.problem_index,
					time: data[cid].start_epoch_second,
					title: curp.title,
				};
			}
		}
	}
}
function switchTable(name) {
	const prg = (i) => "<div class='ui top attached progress' id='" + i + "' style='position: relative !important'><div class='bar' style='background-color: #fff'></div><div class='bar' style='background-color: #ffeeba'></div><div class='bar' style='background-color: #fd9'></div><div class='bar' style='background-color: #c3e6cb'></div><div class='bar' style='background-color: #9ad59e'></div><div class='bar' style='background-color: #9cf'></div></div>";
	let prbIdx = labels[name].index, c = prbIdx.length, cnt = 0, cnte = 0, cnts = 0, cntt = 0, cnta = 0, cont = [], tbl = [], idxList = prbIdx.concat([]), data = rawd[name], cntIdx = {}, cntCont = {};
	document.getElementById("cont-data").innerHTML = "<div class='ui segment'><p></p><div class='ui active dimmer'><div class='ui loader'></div></div></div>";
	for (let i in idxList) {
		idxList[i] = prbIdx[i].split("/");
		cntIdx[i] = [[0, 0, 0, 0, 0, 0], 0];
	}
	for (let i in data) {
		cont.push(data[i]);
	}
	cont.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
	for (let i in cont) {
		cntCont[i] = [[0, 0, 0, 0, 0, 0], 0];
		let prb = new Array(c);
		for (let j = 0; j < c; j++)
			prb[j] = {
				html: "<td></td>"
			};
		for (let j in cont[i].problems) {
			let idx = cont[i].problems[j].problem_index, p = idxList.findIndex((t) => t.find((a) => a == idx) != undefined), cid = cont[i].id, pid = cont[i].problems[j].id, dif = transdiff(cont[i].problems[j].difficulty), uname = cont[i].id.toUpperCase() + "_" + idx, tag = problist[j].tag;
			cnt++, cnta += problist[pid].stat > 2, sta = problist[pid].stat;
			cntIdx[p][0][sta]++, cntIdx[p][1]++;
			cntCont[i][0][sta]++, cntCont[i][1]++;
			prb[p] = "<td id='cell-" + pid + "-" + cid + "' style='background-color: " + statuses[sta].color + "'><a href='https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "' class='diff-" + getColor(dif).name + "'><ta href='javascript:void(0)' title='难度：" + (dif ?? "暂未评定") + "'" + getDiffCirc(dif) + idx + "&nbsp;</ta></a>";
			if (problist[pid].tra) {
				prb[p] += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题面\", 0)'>题面</a>";
				cnte++;
			}
			if (problist[pid].sol) {
				if (problist[pid].tra) {
					prb[p] += "&nbsp;&nbsp;";
				}
				prb[p] += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题解\", 1)'>题解</a>";
				cnts++;
			}
			if (tag != 0) {
				prb[p] += "<div onclick='tagToggle(\"" + pid + "-" + name + "\")' style='position: relative'><a class='floating ui circular teal right label' style='background-color: #50d0d0!important'>" + tag.length + "</a></div><div id='tag-" + pid + "-" + name + "' style='display: none;'>";
				for (let t in tag) {
					prb[p] += "<p class='ui tag label'>" + tag[t] + "</p>";
				}
				prb[p] += "</div>";
				cntt++;
			}
			if (probCell[pid] == undefined) {
				probCell[pid] = [];
			}
			prb[p] = {
				html: prb[p],
				id: "cell-" + pid + "-" + cid
			};
			probCell[pid].push(prb[p].id);
		}
		tbl.push(prb);
	}
	let t = document.createElement("table"), s = "<thead class='full-width'><tr><th>比赛</th>";
	t.className = "ui fixed celled definition table segment";
	for (let i = 0; i < c; i++) {
		s += "<th id='cell-" + i + "-" + name + "'><div class='ui segment clrstyle'>" + prg("prg-" + i) + "<div>" + prbIdx[i] + "</div></div></th>";
	}
	s += "</tr></thead><tbody>";
	for (let i in cont) {
		let cid = cont[i].id;
		s += "<tr><td class='elipsed' id='cell-" + cid + "-" + name + "'><a href='https://atcoder.jp/contests/" + cid + "'>" + cid.toUpperCase() + "</a></td>";
		for (let j in tbl[i]) {
			s += tbl[i][j].html;
		}
		s += "</tr>";
	}
	s += "</tbody>";
	t.innerHTML = s;
	document.getElementById("cont-data").innerHTML = "";
	document.getElementById("cont-data").appendChild(t);
	for (let i = 0; i < c; i++) {
		$("#prg-" + i).progress({
			total: cntIdx[i][1],
			value: cntIdx[i][0]
		});
	}
	$("#progress-tre").progress({
		percent: cnte / cnt * 100,
		text: {
			active: '{percent}% 题面已完成',
			success: '所有题面已完成'
		}
	});
	$("#progress-sol").progress({
		percent: cnts / cnt * 100,
		text: {
			active: '{percent}% 题解已完成',
			success: '所有题解已完成'
		}
	});
	$("#progress-tag").progress({
		percent: cntt / cnt * 100,
		text: {
			active: '{percent}% 标签已完成',
			success: '所有标签已完成'
		}
	});
	$("#progress-acc").progress({
		percent: cnta / cnt * 100,
		text: {
			active: '{percent}% 题目已通过',
			success: '所有题目已通过'
		}
	});
	labToggle("cont-tbl");
}
function switchList(name) {
	let cnt = 0, cnte = 0, cnts = 0, cntt = 0, cnta = 0, cont = [], tbl = [], data = rawd[name];
	document.getElementById("cont-data").innerHTML = "<div class='ui segment'><p></p><div class='ui active dimmer'><div class='ui loader'></div></div></div>";
	labToggle("cont-tbl");
	for (let i in data) {
		cont.push(data[i]);
	}
	cont.sort((a, b) => b.start_epoch_second - a.start_epoch_second);
	for (let i in cont) {
		let prb = [];
		for (let j in cont[i].problems) {
			let idx = cont[i].problems[j].problem_index, cid = cont[i].id, pid = cont[i].problems[j].id, dif = transdiff(cont[i].problems[j].difficulty), uname = cont[i].id.toUpperCase() + "_" + idx, tag = problist[j].tag;
			cnt++, cnta += problist[pid].stat > 2;
			let cur = "<td class='elipsed' id='cell-" + pid + "-" + cid + "' style='background-color: " + statuses[problist[pid].stat].color + "'><a href='https://atcoder.jp/contests/" + cid + "/tasks/" + pid + "' class='diff-" + getColor(dif).name + "'><ta href='javascript:void(0)' title='难度：" + (dif ?? "暂未评定") + "'" + getDiffCirc(dif) + idx + "&nbsp;</ta></a>";
			if (problist[pid].tra) {
				cur += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题面\", 0)'>题面</a>";
				cnte++;
			}
			if (problist[pid].sol) {
				if (problist[pid].tra) {
					cur += "&nbsp;&nbsp;";
				}
				cur += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + cid + "\", \"" + pid + "\", \"" + uname + "&nbsp;题解\", 1)'>题解</a>";
				cnts++;
			}
			if (tag != 0) {
				cur += "<div onclick='tagToggle(\"" + pid + "-" + name + "\")' style='position: relative; right: -5;'><a class='floating ui circular teal right label' style='background-color: #50d0d0!important'>" + tag.length + "</a></div><div id='tag-" + pid + "-" + name + "' style='display: none;'>";
				for (let t in tag) {
					cur += "<p class='ui tag label'>" + tag[t] + "</p>";
				}
				cur += "</div>";
				cntt++;
			}
			if (probCell[pid] == undefined) {
				probCell[pid] = [];
			}
			cur = {
				html: cur,
				id: cur == "<td></td>" ? 0 : "cell-" + pid + "-" + cid
			};
			probCell[pid].push(cur.id);
			prb.push(cur);
		}
		tbl.push(prb);
	}
	document.getElementById("cont-data").innerHTML = "";
	for (let i in cont) {
		let cid = cont[i].id, t = document.createElement("div"), s = "";
		t.className = "ui segment";
		s = "<div class='ui top attached large label elipsed' id='cell-" + cid + "'><a href='https://atcoder.jp/contests/" + cid + "'>" + cont[i].title + "（" + cid.toUpperCase() + "）</a></div><div style='overflow-x: " + (tbl[i].length < 10 ? "hidden" : "scroll") + ";'><div style='width: " + (tbl[i].length < 10 ? "auto" : 7 * tbl[i].length) + "em;'><table class='ui fixed celled table'><tbody><tr>";
		for (let j in tbl[i]) {
			s += tbl[i][j].html;
		}
		s += "</tr></tbody></table></div></div></div>";
		t.innerHTML = s;
		document.getElementById("cont-data").appendChild(t);
	}
	$("#progress-tre").progress({
		percent: cnte / cnt * 100,
		text: {
			active: '{percent}% 题面已完成',
			success: '所有题面已完成'
		}
	});
	$("#progress-sol").progress({
		percent: cnts / cnt * 100,
		text: {
			active: '{percent}% 题解已完成',
			success: '所有题解已完成'
		}
	});
	$("#progress-tag").progress({
		percent: cntt / cnt * 100,
		text: {
			active: '{percent}% 标签已完成',
			success: '所有标签已完成'
		}
	});
	$("#progress-acc").progress({
		percent: cnta / cnt * 100,
		text: {
			active: '{percent}% 题目已通过',
			success: '所有题目已通过'
		}
	});
	labToggle("cont-tbl");
}
function refreshMenu(x) {
	document.getElementById("archive-show").innerHTML = "";
	let cnt = Math.floor((curProbs.length + 9) / 10), html = "", p = 0;
	if (x < 1 || x > cnt)
		return;
	html += "<a class='item' onclick='refreshMenu(1)'><i class='angle double left icon'></i></a>";
	if (x > 1) {
		html += "<a class='item' onclick='refreshMenu(" + (x - 1) + ")'><i class='caret left icon'></i></a>";
	}
	if (x > 4) {
		html += "<a class='item'><i class='ellipsis horizontal icon'></i></a>";
	}
	let l = Math.max(1, x - 3), r = Math.min(cnt + 1, x + 3);
	for (let i = l; i < r; i++) {
		html += "<a class='item' onclick='refreshMenu(" + i + ")'>" + i + "</a>";
	}
	if (x < cnt - 3) {
		html += "<a class='item'><i class='ellipsis horizontal icon'></i></a>";
	}
	if (x < cnt) {
		html += "<a class='item' onclick='refreshMenu(" + (x + 1) + ")'><i class='caret right icon'></i></a>";
	}
	html += "<a class='item' onclick='refreshMenu(" + cnt + ")'><i class='angle double right icon'></i></a>";
	document.getElementById("prob-list-menu").innerHTML = html;
	for (let i in curProbs) {
		if (x * 10 - 10 <= p && p < x * 10) {
			let t = document.createElement("tr");
			t.innerHTML = probHTML[curProbs[i]];
			t.style.backgroundColor = statuses[problist[curProbs[i]].stat].color;
			document.getElementById("archive-show").appendChild(t);
		}
		p++;
	}
}
function refreshChart() {
	let ctg = new Array(44), cnt = new Array(44);
	for (let i = 0; i < 44; i++)
		ctg[i] = "<" + (i * 100 + 100), cnt[i] = {
			y: 0,
			color: i < 4 ? "rgb(128,128,128)" : i < 8 ? "rgb(128,64,0)" : i < 12 ? "rgb(0,128,0)" : i < 16 ? "rgb(0,192,192)" : i < 20 ? "rgb(0,0,255)" : i < 24 ? "rgb(192,192,0)" : i < 28 ? "rgb(255,128,0)" : "rgb(255,0,0)"
		};
	for (let i in curProbs) {
		let p = problist[curProbs[i]].diff;
		if (p != null && p < 4400) {
			cnt[Math.floor(p / 100)].y++;
		}
	}
	Highcharts.chart('container', {
		chart: {
			type: "column",
			events: {
				click: function (event) {
					let p = Math.round(event.xAxis[0].value), lv = document.getElementById("diflb").value, rv = document.getElementById("difrb").value;
					if (lv != p * 100 || rv != p * 100 + 99) {
						lv = p * 100, rv = p * 100 + 99;
					} else {
						lv = rv = "";
					}
					document.getElementById("diflb").value = lv;
					document.getElementById("difrb").value = rv;
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
			headerFormat: "<span style='font-size:10px'>{point.key}</span><table>",
			pointFormat: "<tr><td style='font-size:10px;color:{series.color};padding:0'>{}:</td>" + "<td style='font-size:10px;padding:0'><b>{point.y:.0f}</b></td></tr>",
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
function setFilter() {
	document.getElementById("rndprob").innerHTML = "";
	document.getElementById("archive-show").innerHTML = "<tr><div class='ui segment'><p></p><div class='ui active dimmer'><div class='ui loader'></div></div></div></tr>";
	curProbs = [];
	let flt = function (p) {
		if (!$("#" + contlist[p.cid].type + "-checkbox").checkbox("is checked") || !$("#" + statuses[p.stat].name + "-checkbox").checkbox("is checked")) {
			return 0;
		}
		let dl = document.getElementById("diflb").value, dr = document.getElementById("difrb").value, utg = $(".ui.dropdown").dropdown("get value");
		dl = dl == "" || isNaN(Number(dl)) ? -10000 : Number(dl);
		dr = dr == "" || isNaN(Number(dr)) ? 10000 : Number(dr);
		utg = utg == '' ? 0 : utg.split(",");
		if ((p.diff != null && (p.diff < dl || p.diff > dr)) || (p.diff === null && ((p.diff != -10000 || p.diff != 10000)))) {
			return 0;
		}
		if ($("#tag-combined-or").checkbox("is checked")) {
			if (!utg.length)
				return 1;
			for (let j in utg) {
				if (p.tag.some(i => i == utg[j]))
					return 1;
			}
			return 0;
		} else {
			for (let j in utg)
				if (!p.tag.some(i => i == utg[j]))
					return 0;
			return 1;
		}
	};
	for (let i in problist) {
		if (flt(problist[i])) {
			curProbs.push(i);
		}
	}
	curProbs.sort(cmp);
	refreshMenu(1);
	refreshChart();
}
function setSortByTime(){
	cmp = (a, b) => problist[b].time - problist[a].time;
	setFilter();
}
function setSortByTitle(){
	cmp = (a, b) => problist[a].title.localeCompare(problist[b].title);
	setFilter();
}
function setSortByDiff(){
	cmp = (a, b) => problist[b].diff - problist[a].diff;
	setFilter();
}
function setSortByTags(){
	cmp = (a, b) => problist[b].tag.length - problist[a].tag.length;
	setFilter();
}
function clearFilter() {
	for (let i in labels) {
		$("#" + i + "-checkbox").checkbox("set checked");
	}
	for (let i in statuses) {
		$("#" + statuses[i].name + "-checkbox").checkbox("set checked");
	}
	document.getElementById("diflb").value = document.getElementById("difrb").value = "";
	$(".ui.dropdown").dropdown("clear");
	$("#tag-combined-or").checkbox("uncheck");
	setSortByTime();
	setFilter();
}
function getRandProblem() {
	document.getElementById("rndprob").innerHTML = "";
	if (curProbs == 0)
		return;
	let cnt = curProbs.length, p = Math.floor(Math.random() * cnt);
	for (let i in curProbs) {
		if (!p--) {
			document.getElementById("rndprob").innerHTML = probHTML[curProbs[i]];
			document.getElementById("rndprob").style.backgroundColor = statuses[problist[curProbs[i]].stat].color;
			break;
		}
	}
}
function buildList() {
	for (let i in labels) {
		let t = document.createElement("div");
		t.className = "field";
		t.innerHTML = "<div class='ui checkbox' id='" + i + "-checkbox'><input type='checkbox' name='" + i + "-checkbox'><label> 选择 " + labels[i].name + " </label></div></div>";
		document.getElementsByClassName("eight fields")[0].appendChild(t);
	}
	for (let i in labels) {
		$("#" + i + "checkbox").checkbox("set checked");
	}
	for (let i in statuses) {
		let t = document.createElement("div"), s = statuses[i];
		t.className = "field";
		t.innerHTML = "<div class='ui checkbox' id='" + s.name + "-checkbox'><input type='checkbox' name='" + s.name + "-checkbox'><label> 选择" + s.cname + "的题目 </label></div></div>";
		document.getElementsByClassName("six fields")[0].appendChild(t);
	}
	for (let i in statuses) {
		$("#" + statuses[i].name + "-checkbox").checkbox("set checked");
	}
	for (let i in tagList) {
		let t = document.createElement("div");
		t.className = "item";
		t.setAttribute("data-value", tagList[i]);
		t.innerHTML = tagList[i];
		document.getElementById("tag-list").appendChild(t);
	}
	let tLst = [];
	for (let i in problist) {
		tLst.push(i);
	}
	tLst.sort((a, b) => problist[b].time - problist[a].time);
	for (let id in tLst) {
		let i = tLst[id], curp = problist[i], s = "<tr id='" + i + "-col'><td class='elipsed'><a href='https://atcoder.jp/contests/" + curp.cid + "/tasks/" + curp.pid + "'>" + curp.uname.toUpperCase() + "</a></td><td class='elipsed'><a href='https://atcoder.jp/contests/" + curp.cid + "/tasks/" + curp.pid + "'>" + getDiffCirc(curp.diff) + "<span class='diff-" + getColor(curp.diff).name + "'>" + curp.title + "</span></a></td><td>";
		if (problist[i].tra) {
			s += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + problist[i].cid + "\", \"" + i + "\", \"" + problist[i].uname + "&nbsp;题面\", 0)'>题面</a>";
			if (problist[i].sol) {
				s += "&nbsp;&nbsp;";
			}
		}
		if (problist[i].sol)
			s += "<a class='link-black' href='javascript:void(0);' onclick='showProbModal(\"" + problist[i].cid + "\", \"" + i + "\", \"" + problist[i].uname + "&nbsp;题解\", 1)'>题解</a>";
		s += "</td><td class='elipsed'>" + (problist[i].diff ?? "unavailable") + "</td><td>";
		let t = problist[i].tag;
		for (let j in t) {
			s += "<div class='ui tag label'>" + t[j] + "</div>";
		}
		s += "</td></tr>";
		probHTML[i] = s;
	}
	$(".ui.dropdown").dropdown({
		on: "hover",
		transition: "drop",
		allowAdditions: 1
	});
	clearFilter();
}
function importUser() {
	let usrList = document.getElementById("user-name").value.split(" "), usrPrbStat = {};
	window.localStorage.setItem("default-user-list", document.getElementById("user-name").value);
	for (let i in problist) {
		problist[i].stat = 0;
	}
	$("#sub-fetch-prog").progress("reset");
	let recordUserSub = function (i, lst) {
		window.localStorage.setItem("prob-stat-" + usrList[i], JSON.stringify({
			lastFetchTime: lst,
			value: usrPrbStat
		}));
		for (let i in usrPrbStat) {
			if (i in problist) {
				problist[i].stat = Math.max(problist[i].stat, usrPrbStat[i]);
			}
		}
		$("#sub-fetch-prog").progress({
			percent: (i + 1) / usrList.length * 100
		});
	}, fetchUserSub = function (i, lst, f) {
		if (i >= usrList.length) {
			setFilter();
			switchTable("abc");
			return;
		}
		let usr = usrList[i];
		if (usr === "") {
			f(i + 1, 0, f);
			return;
		}
		if (!lst) {
			let cookie = window.localStorage.getItem("prob-stat-" + usr);
			if (cookie != undefined) {
				cookie = JSON.parse(cookie);
				usrPrbStat = cookie.value;
				lst = cookie.lastFetchTime;
			}
		}
		readTextFile("https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=" + usr + "&from_second=" + lst, "json", function (txt, sta) {
			if (sta == "200") {
				setTimeout(function () {
					let sub = JSON.parse(txt), cur = lst;
					if (sub == 0) {
						if (!lst) {
							usrNotFnd = 1;
							alert(usr + "：未找到用户或者用户没有提交");
						} else {
							recordUserSub(i, lst);
						}
						f(i + 1, 0, f);
						return;
					}
					for (let j in sub) {
						if (!(sub[j].contest_id in contlist)) {
							continue;
						}
						let isInContest = contlist[sub[j].contest_id].startTime <= sub[j].epoch_second && sub[j].epoch_second <= contlist[sub[j].contest_id].endTime,
							subStat = (sub[j].result == "AC" ? "AC" : "NA") + (isInContest ? "-during-Contest" : sub[j].epoch_second < contlist[sub[j].contest_id].startTime ? "-before-Contest" : "");
						subStat = statuses.findIndex(x => x.name == subStat);
						if (!usrPrbStat[sub[j].problem_id]) {
							usrPrbStat[sub[j].problem_id] = 0;
						}
						usrPrbStat[sub[j].problem_id] = Math.max(usrPrbStat[sub[j].problem_id], subStat);
						lst = sub[j].epoch_second + 1;
					}
					if (lst == cur) {
						recordUserSub(i, lst);
						usrPrbStat = {};
						f(i + 1, 0, f);
					} else {
						f(i, lst, f);
					}
				}, 999);
			} else {
				alert(usr + "：导入用户提交失败，请重试");
				f(i + 1, 0, f);
			}
		}, 0);
	};
	fetchUserSub(0, 0, fetchUserSub);
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
	document.getElementById("join-page").style.display = "none";
	document.getElementById("create-page").style.display = "none";
}
function showjoinpage() {
	closecontestpage();
	document.getElementById("join-page").style.display = "block";
}
function showcreatepage() {
	closecontestpage();
	document.getElementById("create-page").style.display = "block";
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
		res += scr[i];
	}
	res += "]}";
	document.getElementById("print-code").value = trans.encode(res);
	copyToClipboard(trans.encode(res));
}
function buildContestPage() {
	let stTime = new Date(), edTime = new Date(Number(stTime) + 7200000),
		startTime = formatDate(stTime, "yyyy-MM-ddThh:mm"),
		finishTime = formatDate(edTime, "yyyy-MM-ddThh:mm");
	document.getElementById("get-start-time").setAttribute("value", startTime);
	document.getElementById("get-finish-time").setAttribute("value", finishTime);
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
function clearStorage() {
	window.localStorage.clear();
	location.reload();
}
function shownotyet() {
	alert("in progress");
}

function buildMainPage() {
	$("#clear-storage").popup({
		content: "在每次版本更新后，单击此键清空本地缓存用户数据",
		on: "hover"
	});
	window.onscroll = function () {
		let cur = $(document).scrollTop(), h = document.documentElement.clientHeight;
		document.getElementById("button-top").style = cur - $("#page-top").offset().top < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; top: 50;";
		document.getElementById("button-end").style = $("#page-end").offset().top - h - cur < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; bottom: 80;";
	};
	window.onclick = function () {
		let cur = $(document).scrollTop(), h = document.documentElement.clientHeight;
		document.getElementById("button-top").style = cur - $("#page-top").offset().top < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; top: 50;";
		document.getElementById("button-end").style = $("#page-end").offset().top - h - cur < 500 ? "display: none;" : "z-index: 999; position: fixed; right: 50; bottom: 80;";
	};
	readTextFile("https://atcoder-for-chinese-developers.github.io/spiders/data.json", "json", function (text) {
		try {
			rawd = JSON.parse(text);
		} catch {
			alert("The spider does not work. Check your network connection or contact with the site maintainer.");
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
			tags = [];
			alert("tags.json is not valid. Check your network connection or contact with the site maintainer.");
		}
	});
	readTextFile("src/tag-list.json", "json", function (text) {
		tagList = JSON.parse(text);
	});
	initProbList();
	$("#user-name").keydown(function (e) {
		if (e.keyCode == 13) {
			importUser();
		}
	});
	buildList();
	buildContestPage();
	showjoinpage();
	document.getElementById("user-name").value = window.localStorage.getItem("default-user-list");
	importUser();
	switchTable('abc');
}
