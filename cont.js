function readTextFile(file,ext,callback){
	let xhr=new XMLHttpRequest();
	xhr.overrideMimeType("application/"+ext);
	xhr.open("GET",file,false);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4)
			callback(xhr.responseText,xhr.status);
	}
	xhr.send();
}
function Base64(){
	_keyStr = "Csa56TWEOMFkpGH2cmb4Xi8vzYJo3efghldnSwDjNx9PVrI1uKBtRAZQ0qL7yU/+=";
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
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
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding  
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
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

	// private method for UTF-8 encoding  
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
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

	// private method for UTF-8 decoding  
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
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
function sleep(time){
	return new Promise((resolve)=>{
		setTimeout(()=>{resolve();},time);
	});
}
function ext2(con){
	return (Math.floor(con/10)).toString()+(con%10).toString();
}
function redr(){
	if (window.localStorage.getItem('inv-code') == undefined) 
		window.localStorage.setItem('inv-code', document.getElementById("inv-code").value);
	window.location.href="?"+escape(document.getElementById("inv-code").value);
}
function closeall(){
	document.getElementById("list").setAttribute("style","display: none;");
	document.getElementById("table").setAttribute("style","display: none;");
}
let beg = 0, end = 0;
function showlist(){
	closeall();
	let cur = new Date();
	if(Number(cur) >= Number(beg))
		document.getElementById("list").setAttribute("style","");
}
function showtable(){
	closeall();
	let cur = new Date();
	if(Number(cur) >= Number(beg))
		document.getElementById("table").setAttribute("style","");
}
function buildpage(){
	var s = window.location.href;
	var trans = new Base64();
	if(s.split('?').length==1){
		document.write("<div class=\"ui container\">");
		document.write("<div class=\"ui input\"><input id=\"inv-code\" style=\"width: 150;\" placeholder=\"输入邀请码\"></input></div>");
		var p = document.getElementById('inv-code')
		if (window.localStorage.getItem('inv-code') != undefined) 
			p.value = window.localStorage.getItem('inv-code')
		document.write("<button class=\"ui button\" onclick=\"redr()\">跳转到比赛界面</button>");
	}else{
		while (s.match('%22') != null) s = s.replace('%22', '"');
		s = s.split('?')[1];
		s = trans.decode(s)
		var data = JSON.parse(s)
		beg = Number(data.st), end = Number(data.ed);
		var start = new Date(beg), finish = new Date(end);
		
		var subs = {}
		
		var acc = [], ple = [], id = [];
		for (var i = 0; i < data.players.length; i++) acc.push(0), ple.push(0), id.push(i);
		
		for (var i = 0; i < data.players.length; i++) {
			let sub;
			readTextFile('https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=' + 
						  data.players[i] + '&from_second=' + Math.floor(beg / 1000), 'json', function (text){
							sub = JSON.parse(text);
			})
			subs[i] = {}
			subs[i].ac = {}
			subs[i].pl = {}
			subs[i].tm = {}
			for (var t = 0; t < sub.length; t++) {
				var c = sub[t]
				if (Number(c.epoch_second) * 1000 >= end) continue;
				for (var j = 0; j < data.problems.length; j++)
					if (c.problem_id == data.problems[j]) {
						if (c.result == 'AC') {
							if (subs[i].ac[data.problems[j]] != 1)
								acc[i] += 1;
							subs[i].ac[data.problems[j]] = 1;
							subs[i].tm[data.problems[j]] = c.epoch_second;
							if (subs[i].pl[data.problems[j]] == undefined) 
								subs[i].pl[data.problems[j]] = 0;
							ple[i] += (c.epoch_second * 1000 - beg) / 1000;
						}
						if (c.result != 'CE' && c.result != 'AC') {
							if (subs[i].pl[data.problems[j]] == undefined) 
								subs[i].pl[data.problems[j]] = 0;
							subs[i].pl[data.problems[j]] += 1;
							ple[i] += 300
						}
					}
			}
			let w = Date.now();
			while(Date.now() < w + 500);
		}
		id.sort(function(a, b) {
			if (acc[a] == acc[b]) return ple[a] - ple[b];
			else return acc[b] - acc[a];
		});
		
		document.write('<h1>' + data['title'] + '</h1>')
		document.write('<p>开始时间：' + start.toString() + '</p>')
		document.write('<p>结束时间：' + finish.toString() + '</p>')
		document.write("<div class=\"ui menu\">");
		document.write("<a class=\"item\" onclick=\"showlist()\">题目列表</a>");
		document.write("<a class=\"item\" onclick=\"showtable()\">排行榜</a></div>");
		
		document.write("<table class=\"ui celled table\" id=\"list\">");
		document.write("<thead><tr><th>题目编号</th><th>题目标题</th></tr></thead><tbody>");
		for(let i in data.problems){
			var p = data.problems[i].lastIndexOf('_')
			var con = data.problems[i].substr(0, p)
			document.write('<tr><td>' + (Number(i)+1) + '</td><td>' + '<a href="https://atcoder.jp/contests/' + con +  '/tasks/' + data.problems[i] + '">' + data.problems[i] + '</a></td></tr>');
		}
		document.write("</tbody></table>");
		// document.write("<")
		document.write('<table class="ui fixed celled table" id="table">');
		document.write('<thead><tr>');
		document.write('<th>选手列表</th><th>罚时</th>')
		for (var i = 0; i < data.problems.length; i++) {
			var p = data.problems[i].lastIndexOf('_')
			var con = data.problems[i].substr(0, p)
			document.write('<th>' + '<a href="https://atcoder.jp/contests/' + con +  '/tasks/' + data.problems[i] + '">' + (i+1) + '</a></th>');
		}
		document.write('</tr></thead><tbody>');
		for (var t = 0; t < data.players.length; t++) {
			var i = id[t];
			var star = ' ';
			if (t == 0) star = ' <i class="icon star outline"></i>'
			document.write('<tr><td>(' + (t + 1) + ') ' + data.players[i] + star + '</td>');
			var dr = Math.floor(ple[i]);
			var hours = Math.floor(dr / 3600), minu = Math.floor(dr % 3600 / 60), seco = dr % 60;
			document.write('<td> ' + ext2(hours) + ':' + ext2(minu) + ':' + ext2(seco) + '</td>');
			for (var j = 0; j < data.problems.length; j++) {
				if (subs[i].ac[data.problems[j]] == 1) {
					document.write('<td class="positive">');
					document.write('<i class="icon checkmark"></i>');
				}
				else if (subs[i].pl[data.problems[j]] != 0 && subs[i].pl[data.problems[j]] != undefined) {
					document.write('<td class="negative">');
					document.write('<i class="icon close"></i>');
				}
				else document.write('<td>-');
				if (subs[i].ac[data.problems[j]] == 1) { 
					var dr = Math.floor((Number(subs[i].tm[data.problems[j]]) * 1000 - beg) / 1000);
					var hours = Math.floor(dr / 3600), minu = Math.floor(dr % 3600 / 60), seco = dr % 60;
					document.write(' ' + ext2(hours) + ':' + ext2(minu) + ':' + ext2(seco));
				}
				if (subs[i].pl[data.problems[j]])
					document.write(' (' + subs[i].pl[data.problems[j]] + ')');
				document.write('</td>');
			}
			document.write('</tr>')
		}
		document.write('<tbody></table>');
		showlist();
	}
}
