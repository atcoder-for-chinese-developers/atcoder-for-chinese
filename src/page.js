function getProbName() {
	let w = escape(window.location.href);
	return w.substr(w.indexOf("%3Fpage%3D") + 10).split('.')[1];
}
function getProbName_u() {
	let w = getProbName().toUpperCase();
	if (w[0] == 'A' && w[2] == 'C' && Number(w.substr(3, 3)) > 232)
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
		return "AtCoder 中文版";
	t = t.substr(t.lastIndexOf("%3Fpage%3D") + 10);
	return getProbName_u().replace("_", "") + (t[0] == 'T' ? " 翻译" : " 题解");
}

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

function tagToggle() {
	document.getElementById("tags").setAttribute("style",
		document.getElementById("tags").getAttribute("style") == "position: relative; display: none" ? "position: relative; display: inline-block" : "position: relative; display: none");
}

function buildPage(content) {
	let tg = [],
	tags = "<button class=\"ui grey label\" onclick=\"tagToggle()\">切换标签显示</button><div id=\"tags\" style=\"position: relative; display: none\">";
	readTextFile("tags.json", "json", function (text) {
		let tmp = JSON.parse(text),
		str = getProbName_u(escape(window.location.href));
		if (str in tmp)
			tg = tmp[str];
	});
	document.write("<div class=\"mdpagetop\"><a href=\"https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/\"><img src=\"images/logo2.png\" class=\"mdpageicon\"/></a><span class=\"mdpagetop title\">" + getTitle() + "</span>");

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
	let lnk = escape(window.location.href),
	pos = lnk.indexOf("%3Fpage%3D") + 10,
	name = lnk.substr(pos),
	content = "";
	if (name[0] == 'T') {
		name = name.substr(1);
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
		name = name.substr(1);
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
}
();
