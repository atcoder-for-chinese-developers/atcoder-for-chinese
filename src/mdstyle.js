!function(){
	"use strict";
	let n;
	function t(e,n){
		const t=window.document.createElement("script");
		t.src=e,
		t.onload=n,
		window.document.head.appendChild(t)
	}
	const r={},a={},m=(r.setDefaultOptions=function(){
		a.renderOnLoad=!0,a.useMathJax=!0,a.protectMath=!0,
		a.style="viewer",a.onRenderPage=void 0,
		a.markdownURL="https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.2/marked.min.js",
		a.MathJaxURL="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js"},
		r.setOption=function(e,n){a[e]=n},r.tokenType={MARK:0,MASK:1},
		r.tokenLiteral={MASK:"::MASK::"},{
			plain:[
			"body {",
			"  color: #333;",
			"  line-height: 1.5;",
			"  font-size: 17px",
			"}",
			"main {"," width: 70em; max-width: 70em;",
			"  margin-left: auto;",
			"  margin-right: auto;",
			"}",
			"h1, h2, h3, h4, h5, h6, h7 {",
			"  margin: 1em 0 0.5em 0;",
			"  line-height: 1.2;","}",
			"img {",
			"  max-width: 100%;",
			"}",
			"pre, code, samp, kbd {",
			"  color: #333;",
			"  font-family: Menlo,Monaco,Consolas,\"Courier New\",monospace;",
			"  font-size: 17px",
			// "  border:10px",
			"}",
			"pre, blockquote {",
			"  background: #eee;",
			"  padding: 0.5em;",
			"}",
			"pre {",
			"   display: block;",
			"   padding: 8px;",
			"   margin: 0 0 10px;",
			"   font-size: 17px;",
			"   line-height: 1.42857143;",
			"   word-break: break-all;",
			"   word-wrap: break-word;",
			"   color: #333;",
			"   background-color: #f5f5f5;",
			"   border: 1px solid #ccc;",
			"   border-radius: 3px;",
			"   overflow:auto",
			"}",
			"blockquote {",
			"  border-left: medium solid #ccc;",
			"  margin: 1em 0;",
			"}",
			"blockquote :first-child {",
			"  margin-top: 0;","}",
			"blockquote :last-child {",
			"  margin-bottom: 0;","}",
			"table {",
			"  border-collapse: collapse;",
			"}",
			"th, td {",
			"  border: thin solid #999;",
			"  padding: 0.3em 0.4em;",
			"  text-align: left;",
			"}",
			"p {",
			"  font-size: 17px",
			"}",
			"ul {",
			"  font-size: 100%",
			"}"
		].join("\n"),viewer:[
			"@media screen and (min-width: 40em) {",
			"  body {",
			"    background: #f5f5f5;",
			"  }",
			"  main {",
			"    background: #fff;",
			"    padding: 5em 6em;",
			"    margin: 1em auto;",
			"    box-shadow: 0.4em 0.4em 0.4em #222;",
			"  }",
			"}"
		].join("\n"),none:""
	});
	m.viewer=m.plain+m.viewer;
	r.tokenize=function(e){
		var n=[
			"\\\\begin{(.*?)}([\\s\\S]*?)\\\\end{\\1}",
			"\\\\\\[[\\s\\S]*?\\\\\\]",
			"\\\\\\([\\s\\S]*?\\\\\\)",
			"\\\\\\$",
			"\\$\\$(?:[^\\\\]|\\\\.)*?\\$\\$",
			"\\$(?:[^$\\\\]|\\\\.)+?\\$",
			r.tokenLiteral.MASK
		].join("|");
		const t=new RegExp(n,"g");
		let o,d;
		const i=[];
		let a=0;
		for(;null!==(o=t.exec(e));)
			o.index>a&&(d=e.substring(a,o.index),
			i.push([r.tokenType.MARK,d])),
			void 0!==o[1]&&o[1].startsWith("md")?
				i.push([r.tokenType.MARK,o[2]]):
				i.push([r.tokenType.MASK,o[0]]),a=t.lastIndex;
		return d=e.substring(a),
			e.length>a&&i.push([r.tokenType.MARK,d]),i
	},r.mask=function(e){
		const n=[],t=[];
		var o,d;
		let i;
		for(i=0;i<e.length;i++)
			o=e[i][0],d=e[i][1],
			o===r.tokenType.MARK?
				n.push(d):
				(n.push(r.tokenLiteral.MASK),t.push(d));
		return{
			text:n.join(""),tokenValues:t
		}
	},r.unmask=function(e,n){
		var t=new RegExp(r.tokenLiteral.MASK,"g");
		let o=0;
		return e.replace(t,function(){
			return n[o++]
		})
	},r.renderMarkdown=function(e){
		return n(e)
	},r.protectMathAndRenderMarkdown=function(e){
		var e=r.tokenize(e),e=r.mask(e),n=r.renderMarkdown(e.text);
		return r.unmask(n,e.tokenValues)
	},r.render=function(e){
		return a.protectMath?
			r.protectMathAndRenderMarkdown(e):
			r.renderMarkdown(e)
	},r.renderPage=function(){
		const e=window.document.getElementsByTagName("textarea"),
			n=window.document.createElement("main");
		let t;
		0<e.length?
			(t=e[0].value.trim(),e[0].remove()):
			(t=window.document.body.innerHTML.trim(),window.document.body.innerHTML=""),
		void 0!==window.document.title&&""!==window.document.title||
			(d=t.split("\n",1)[0].replace(/^\s*#*\s*|\s*#*\s*$/g,""),
			window.document.title=d),
		window.document.body.appendChild(n);
		const o=window.document.createElement("style");
		var d=m[a.style];
		o.appendChild(window.document.createTextNode(d)),
		window.document.head.appendChild(o);
		const i=window.document.createElement("meta");
		i.name="viewport",i.content="width=device-width, initial-scale=1.0",
		window.document.head.appendChild(i),
		n.innerHTML=r.render(t),
		a.useMathJax&&window.MathJax.typeset(),
		void 0!==a.onRenderPage&&a.onRenderPage()
	},r.main=function(){
		if(r.setDefaultOptions(),"undefined"!=typeof window){
			for(const e in a)
				"undefined"!=typeof window&&void 0!==window.texme&&void 0!==window.texme[e]&&(a[e]=window.texme[e]);
			t(a.markdownURL,function(){
				n=window.marked.parse
			}),a.useMathJax&&(window.MathJax={
				tex:{
					inlineMath:[["$","$"],["\\(","\\)"]],
					tags:"ams"
				},startup:{
					typeset:!1
				}
			},t(a.MathJaxURL)),
			a.renderOnLoad&&(window.onload=r.renderPage),window.texme=r}
		else n=require("marked").parse,module.exports=r
	},
	r.main()
}();

function getprbname(){
	let w=escape(window.location.href);
	return w.substr(w.indexOf("%3Fpage%3D")+10).split('.')[1];
}
function getprbname_u(){
	let w=getprbname().toUpperCase();
	if(w[0]=='A'&&w[2]=='C'&&Number(w.substr(3,3)) > 232)
		w=w.replace("H","Ex");
	if(!isNaN(Number(w.split("_")[1])))
		w=w.split("_")[0]+"_"+String.fromCharCode(Number(w.split("_")[1])+64);
	return w;
}

function getorglink(){
	let w=getprbname();
	return "https://atcoder.jp/contests/"+w.split("_")[0]+"/tasks/"+w;
}

function jumplink1(){
	window.open("https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/");
}

function jumplink2(){
	window.open(getorglink());
}

function gettitle(){
	let t=escape(window.location.href);
	if(t.indexOf("%3Fpage%3D")==-1)
		return "AtCoder 中文版";
	t=t.substr(t.lastIndexOf("%3Fpage%3D")+10);
	return getprbname_u().replace("_","")+(t[0]=='T'?" 翻译":" 题解");
}

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

function tagtoggle(){
	document.getElementById("tags").setAttribute("style",
		document.getElementById("tags").getAttribute("style")=="display: none;"?"display: inline-block;":"display: none;"
	);
}

!function(){
	let tg=[];
	readTextFile("tags.json","json",function(text){
		let tmp=JSON.parse(text),
			str=getprbname_u(escape(window.location.href));
		if(str in tmp)tg=tmp[str];
	});
	document.write("<div style=\"background: #333333; padding: 0px;\ top: 0px; position: sticky; z-index: 999;\">\
		<button class=\"ui animated fade primary button\" onclick=\"jumplink1()\">\
			<div class=\"visible content\">\
				&nbsp;&nbsp;←返回主界面&nbsp;&nbsp;\
			</div>\
			<div class=\"hidden content\">\
				AtCoder for Chinese\
			</div>\
		</button>\
		<font size=\"4em\" align=\"center\" style=\"color: #fff;\">&nbsp;&nbsp;"+gettitle()+"&nbsp;&nbsp;</font>\
		<button class=\"ui grey label\" onclick=\"tagtoggle()\">切换标签显示</button><div id=\"tags\" style=\"display: none\">");
	if(tg.length>0){
		for(let i=0;i<tg.length;i++)
			document.write("<p class=\"ui tag label\">"+tg[i]+"</p>");
	}else{
		document.write("<p style=\"color: white; font-size: 0.8em\">&nbsp;暂无题目标签</p>");
	}
	document.write("</div><button class=\"ui animated right button\" onclick=\"jumplink2()\" style=\"right: 0; position: absolute;\">\
			<div class=\"visible content\">\
				原题链接\
			</div>\
			<div class=\"hidden content\">\
				"+getprbname_u().replace("_","")+"\
			</div>\
		</button>\
	</div>\
	<div class=\"ui divider\"></div>");
}();
