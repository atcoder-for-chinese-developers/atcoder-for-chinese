function readTextFile(file, ext, callback) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/" + ext);
	xhr.open("GET", file, false);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4)
			callback(xhr.responseText, xhr.status);
	}
	try {
		xhr.send();
	} catch {
		alert("[Error] Can't fetch resource: " + file + "");
	}
}
function getContName() {
	let w = escape(window.location.href);
	return w.slice(w.indexOf("%3Fpage%3D") + 10).split('.')[0].slice(1);
}
function getProbName() {
	let w = escape(window.location.href);
	return w.slice(w.indexOf("%3Fpage%3D") + 10).split('.')[1];
}
function getProbName_u() {
	let w = getProbName().toUpperCase();
	if (w[0] == 'A' && w[2] == 'C' && Number(w.slice(3, 3)) > 232)
		w = w.replace("H", "Ex");
	if (!isNaN(Number(w.split("_")[1])))
		w = w.split("_")[0] + "_" + String.fromCharCode(Number(w.split("_")[1]) + 64);
	return w;
}
function getProbLink() {
	let w = getProbName();
	return "https://atcoder.jp/contests/" + w.split("_")[0] + "/tasks/" + w;
}
function jumpLink2() {
	window.open(getProbLink());
}
function getTitle() {
	let t = escape(window.location.href);
	if (t.indexOf("%3Fpage%3D") == -1)
		return "AtCoder 中文站";
	t = t.slice(t.lastIndexOf("%3Fpage%3D") + 10);
	return getProbName_u().replace("_", "") + (t[0] == 'T' ? " 翻译" : " 题解");
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
function transdiff(d) {
	return Math.round(d >= 400 ? d : 400 / Math.exp(1.0 - d / 400));
}
function tagToggle() {
	document.getElementById("tags").setAttribute("style",
		document.getElementById("tags").getAttribute("style") == "position: relative; display: none" ? "position: relative; display: inline-block" : "position: relative; display: none");
}

function buildPage(content) {
	let tg = [], tags = "<button class=\"ui grey label\" onclick=\"tagToggle()\">切换标签显示</button><div id=\"tags\" style=\"position: relative; display: none\">";
	readTextFile("https://kenkoooo.com/atcoder/resources/problems.json", "json", function (txt, sta) {
		if (sta == "200") {
			let prob = JSON.parse(txt);
			for (let i in prob)
				if (prob[i].id == getProbName()) {
					readTextFile("https://kenkoooo.com/atcoder/resources/problem-models.json", "json", function (txt, sta) {
						if (sta == 200) {
							let diff = transdiff(JSON.parse(txt)[getProbName()].difficulty), st = getColor(diff);
							if (diff < 3200) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large\" style=\"border-color: " + st.rgb + "; background: linear-gradient(to top, " + st.rgb + " " + st.val + "%, rgba(0, 0, 0, 0) " + st.val + "%) border-box;\"></span></ta><span style=\"color:" + st.rgb + "\">" + prob[i].title + "</span>"+ " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 3600) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large bronze-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>"+ " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 4000) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large silver-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>"+ " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 10000) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large gold-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>"+ " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else {
								content = "<h2>" + prob[i].title + " " + getTitle().split(" ")[1] + "</h2>" + content;
							}
						} else {
							alert("请求难度失败");
							content = "<h2>" + prob[i].title + " " + getTitle().split(" ")[1] + "</h2>" + content;
						}
					});
					break;
				}
		} else {
			alert("请求标题失败");
		}
	});
	readTextFile("tags.json", "json", function (txt, sta) {
		if (sta == "200") {
			let tmp = JSON.parse(txt), str = getProbName_u(escape(window.location.href));
			if (str in tmp)
				tg = tmp[str];
		} else {
			alert("请求标签失败");
			return;
		}
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/translations/list.json", "json", function (txt, sta) {
		if (sta == "200") {
			let tmp = JSON.parse(txt).data, cnt = getContName(escape(window.location.href)), prb = getProbName(escape(window.location.href));
			if (cnt in tmp && prb in tmp[cnt]) {
				for (let i in tmp[cnt][prb]) {
					let tt = tmp[cnt][prb][i].tags;
					tg = Array.from(new Set(tg.concat(tt)));
				}
			}
		} else {
			alert("请求标签失败");
			return;
		}
	});
	readTextFile("https://atcoder-for-chinese-developers.github.io/solutions/list.json", "json", function (txt, sta) {
		if (sta == "200") {
			let tmp = JSON.parse(txt).data, cnt = getContName(escape(window.location.href)), prb = getProbName(escape(window.location.href));
			if (cnt in tmp && prb in tmp[cnt]) {
				for (let i in tmp[cnt][prb]) {
					let tt = tmp[cnt][prb][i].tags;
					tg = Array.from(new Set(tg.concat(tt)));
				}
			}
		} else {
			alert("请求标签失败");
			return;
		}
	});
	document.write("<div class=\"mdpagetop\"><a href=\"index.html\"><img src=\"images/logo2.png\" class=\"mdpageicon\"/></a><span class=\"mdpagetop title\">" + getTitle() + "</span>");
	if (tg.length > 0) {
		for (let i = 0; i < tg.length; i++)
			tags += "<span class=\"ui tag label\">" + tg[i] + "</span>";
	} else {
		tags += "<span style=\"color: #000; font-size: 0.8em\">&nbsp;暂无题目标签</span>";
	}
	document.write("<button class=\"ui animated right button\" onclick=\"jumpLink2()\" style=\"right: 0; top: 5px; position: absolute;\"><div class=\"visible content\">原题链接</div><div class=\"hidden content\">" + getProbName_u().replace("_", "") + "</div></button></div></div>");
	tags = "<div style=\"top: -25px; position: relative;\">" + tags + "</div></div>";
	document.write("<div class=\"mdpage\">" + tags + content + "</div>");
};

!function () {
	let lnk = escape(window.location.href), pos = lnk.indexOf("%3Fpage%3D") + 10, name = lnk.slice(pos);
	if (name[0] == 'T') {
		name = name.slice(1);
		console.log("translation page");
		readTextFile("https://atcoder-for-chinese-developers.github.io/translations/" + name + ".html", "html", function (text, stat) {
			if (stat == "200") {
				buildPage(text);
			} else {
				console.log("page error: ", stat);
				alert("没有找到这篇翻译");
				window.location.href = "index.html";
			}
		});
	} else {
		name = name.slice(1);
		console.log("solution page");
		readTextFile("https://atcoder-for-chinese-developers.github.io/solutions/" + name + ".html", "html", function (text, stat) {
			if (stat == "200") {
				buildPage(text);
			} else {
				console.log("page error: ", stat);
				alert("没有找到这篇题解");
				window.location.href = "index.html";
			}
		});
	}
}();
