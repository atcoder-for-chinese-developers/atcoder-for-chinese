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
		if (xhr.readyState === 4) {
			callback(xhr.responseText, xhr.status);
		}
	}
	try {
		xhr.send();
	} catch {
		alert("[Error] Can't fetch resource: " + file + "");
	}
}
/**
 * Get the name of contest shown by current page.
 * @returns {string} A string with name.
 */
function getContName() {
	let w = escape(window.location.href);
	return w.slice(w.indexOf("%3Fpage%3D") + 10).split('.')[0].slice(1);
}
/**
 * Get the name of problem shown by current page.
 * @returns {string} A string with name.
 */
function getProbName() {
	let w = escape(window.location.href);
	return w.slice(w.indexOf("%3Fpage%3D") + 10).split('.')[1];
}
/**
 * Get the displayed name of problem shown by current page.
 * @returns {string} A string with name.
 */
function getProbName_u() {
	let w = getProbName().toUpperCase();
	if (w[0] == 'A' && w[2] == 'C' && Number(w.slice(3, 3)) > 232)
		w = w.replace("H", "Ex");
	if (!isNaN(Number(w.split("_")[1])))
		w = w.split("_")[0] + "_" + String.fromCharCode(Number(w.split("_")[1]) + 64);
	return w;
}
/**
 * Get the link of problem shown by current page.
 * @returns {string} A string with link.
 */
function getProbLink() {
	let w = getProbName();
	return "https://atcoder.jp/contests/" + w.split("_")[0] + "/tasks/" + w;
}
/**
 * Get the title of the page.
 * @returns {string} A string with title name.
 */
function getTitle() {
	let t = escape(window.location.href);
	if (t.indexOf("%3Fpage%3D") == -1)
		return "AtCoder 中文站";
	t = t.slice(t.lastIndexOf("%3Fpage%3D") + 10);
	return getProbName_u().replace("_", "") + (t[0] == 'T' ? " 翻译" : " 题解");
}
/**
 * Returns color info of the problem difficulty.
 * @param {number} k difficulty.
 * @returns {object} an object with rgb code, color name and filling percent.
 */
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
/**
 * Transfer kenkoooo api difficulty to shown difficulty.
 * @param {number} d the difficulty from api.
 * @returns {number} null if d is not a number. Otherwise a number representing shown difficulty.
 */
function transdiff(d) {
	return Math.round(d >= 400 ? d : 400 / Math.exp(1.0 - d / 400));
}
/**
 * Toggle problem tags to show or hide.
 */
function tagToggle() {
	document.getElementById("tags").style.position = "relative";
	document.getElementById("tags").style.display == document.getElementById("tags").style.display == "none" ? "inline-block" : "none";
}

/**
 * Build the current page with 'contest'
 * @param {string} content Contest filling to the page.
 */
function buildPage(content) {
	let tg = [];
	readTextFile("https://kenkoooo.com/atcoder/resources/problems.json", "json", function (txt, sta) {
		if (sta == "200") {
			let prob = JSON.parse(txt);
			for (let i in prob)
				if (prob[i].id == getProbName()) {
					readTextFile("https://kenkoooo.com/atcoder/resources/problem-models.json", "json", function (txt, sta) {
						if (sta == 200) {
							let diff = transdiff(JSON.parse(txt)[getProbName()].difficulty), st = getColor(diff);
							if (diff < 3200) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large\" style=\"border-color: " + st.rgb + "; background: linear-gradient(to top, " + st.rgb + " " + st.val + "%, rgba(0, 0, 0, 0) " + st.val + "%) border-box;\"></span></ta><span style=\"color:" + st.rgb + "\">" + prob[i].title + "</span>" + " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 3600) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large bronze-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>" + " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 4000) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large silver-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>" + " " + getTitle().split(" ")[1] + "</h2>" + content;
							} else if (diff < 10000) {
								content = "<h2><ta href=\"\" title=\"难度：" + diff.toString() + "\"><span class=\"difficulty-circle large gold-circle\"></span></ta><span style=\"color:red\">" + prob[i].title + "</span>" + " " + getTitle().split(" ")[1] + "</h2>" + content;
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
	readTextFile("../tags.json", "json", function (txt, sta) {
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
	document.getElementById("tags").innerHTML = "";
	if (tg.length > 0) {
		for (let i = 0; i < tg.length; i++) {
			let t = document.createElement("span");
			t.className = "ui tag label";
			t.innerHTML = tg[i];
			document.getElementById("tags").appendChild(t);
		}
	} else {
		let t = document.createElement("span");
		t.style = "color: #000; font-size: 0.8em";
		t.innerHTML = "暂无题目标签";
		document.getElementById("tags").appendChild(t);
	}
	document.getElementsByClassName("hidden content")[0].innerHTML = getProbName_u().replace("_", "");
	document.getElementsByClassName("mdpagetop title")[0].innerHTML = getTitle();
	document.getElementById("content").innerHTML = content;
};

!function () {
	document.title = getTitle();
	let lnk = escape(window.location.href), pos = lnk.indexOf("%3Fpage%3D") + 10, name = lnk.slice(pos);
	if (name[0] == 'T') {
		name = name.slice(1);
		readTextFile("https://atcoder-for-chinese-developers.github.io/translations/" + name + ".html", "html", function (text, stat) {
			if (stat == "200") {
				buildPage(text);
			} else {
				alert("没有找到这篇翻译\n错误: " + stat);
				window.location.href = "index.html";
			}
		});
	} else {
		name = name.slice(1);
		readTextFile("https://atcoder-for-chinese-developers.github.io/solutions/" + name + ".html", "html", function (text, stat) {
			if (stat == "200") {
				buildPage(text);
			} else {
				alert("没有找到这篇题解\n错误: " + stat);
				window.location.href = "index.html";
			}
		});
	}
}();
