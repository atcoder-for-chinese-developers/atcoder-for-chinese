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
function getabccnt(id){
	if(id<126)
		return 4;
	if(id<212)
		return 6;
	return 8;
}
function getarccnt(id){
	return id<104?4:id==120?7:6;
}
function getagccnt(id){
	if(id==28)
		return 7;
	if(id==9)
		return 5;
	return 6;
}
function ext3(con){
	return (Math.floor(con/100)).toString()+(Math.floor(con%100/10)).toString()+(con%10).toString();
}
function transdiff(d){
	return Math.round(d>=400?d:400/Math.exp(1.0-d/400));
}
var abctoarc=new Array(233);
function getabcname(con,id){
	if(abctoarc[con]!=undefined&&id>1)
		return "arc"+ext3(abctoarc[con])+"_"+String.fromCharCode(id+95);
	return "abc"+ext3(con)+"_"+(con>19?String.fromCharCode(id+97):(id+1).toString());
}
function getarcname(con,id){
	if(con==120&&id==6)
		return "arc120_f2";
	return "arc"+ext3(con)+"_"+(con>34?String.fromCharCode(id+97):(id+1).toString());
}
function getagcname(con,id){
	if(con==28&&id==6)
		return "agc028_f2";
	return "agc"+ext3(con)+"_"+String.fromCharCode(id+97);
}
function getabcname_u(con,id){
	return "ABC"+ext3(con)+"_"+(id>6?"Ex":String.fromCharCode(id+65));
}
function getarcname_u(con,id){
	if(con==120&&id==6)
		return "ARC120_F2";
	return "ARC"+ext3(con)+"_"+String.fromCharCode(id+65);
}
function getagcname_u(con,id){
	if(con==28&&id==6)
		return "AGC028_F2";
	return "AGC"+ext3(con)+"_"+String.fromCharCode(id+65);
}
function sidebartoggle(){
	$('.ui.sidebar').sidebar('toggle');
}
function closealltables(){
	document.getElementById("abc-table").setAttribute("style","display: none;");
	document.getElementById("arc-table").setAttribute("style","display: none;");
	document.getElementById("agc-table").setAttribute("style","display: none;");
	// document.getElementById("friend-links").setAttribute("style","display: none;");
	document.getElementById("prob-list").setAttribute("style","display: none;");
}
function abctabletoggle(){
	closealltables();
	document.getElementById("abc-table").setAttribute("style","display: block;");
}
function arctabletoggle(){
	closealltables();
	document.getElementById("arc-table").setAttribute("style","display: block;");
}
function agctabletoggle(){
	closealltables();
	document.getElementById("agc-table").setAttribute("style","display: block;");
}
function listtoggle(){
	closealltables();
	document.getElementById("prob-list").setAttribute("style","display: block;");
}
// function linkstoggle(){
	// closealltables();
	// document.getElementById("friend-links").setAttribute("style","display: block;");
// }
function abctagtoggle(i,j){
	document.getElementById("tag-"+getabcname(i,j)).setAttribute("style",
		document.getElementById("tag-"+getabcname(i,j)).getAttribute("style")=="display: block;"?"display: none;":"display: block;"
	);
}
function arctagtoggle(i,j){
	document.getElementById("tag-"+getarcname(i,j)).setAttribute("style",
		document.getElementById("tag-"+getarcname(i,j)).getAttribute("style")=="display: block;"?"display: none;":"display: block;"
	);
}
function agctagtoggle(i,j){
	document.getElementById("tag-"+getagcname(i,j)).setAttribute("style",
		document.getElementById("tag-"+getagcname(i,j)).getAttribute("style")=="display: block;"?"display: none;":"display: block;"
	);
}
let problist=[];
function writeabc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=8,abccnt=0,mx=1005;
	while(getabcname(abccnt+1,1)in rawd)abccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx),tg=new Array(mx);

	let cnt=0,cnte=list_tre.length,cnts=list_sol.length,cntt=0;
	
	for(let i=1;i<=abccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=abccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++){
		let x=list_tre[i][0],y=list_tre[i][1];
		if(x>abccnt||x<0||y>getabccnt(x)||y<0)
			console.log(i,x,y),
			alert("problem "+getabcname_u(x,y)+" does not exist");
		else
			Ava_tre[x][y]=1;
	}
	for(let i=1;i<=abccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=abccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++){
		let x=list_sol[i][0],y=list_sol[i][1];
		if(x>abccnt||x<0||y>getabccnt(x)||y<0)
			alert("problem "+getabcname_u(x,y)+" does not exist");
		else
			Ava_sol[x][y]=1;
	}
	
	for(let i=1,ri=58;i<=abccnt;i++){
		x[i]=new Array(getabccnt(i));
		tg[i]=new Array(getabccnt(i));
		cnt+=x[i].length;
		let flg=0;
		for(let j=0;j<getabccnt(i);j++){
			if(i<42||i>125||j<2||getabcname(i,j) in rawd)
				x[i][j]=!(getabcname(i,j) in rawd)||!("difficulty" in rawd[getabcname(i,j)])?100000:transdiff(rawd[getabcname(i,j)]["difficulty"],0);
			else
				x[i][j]=!("difficulty" in rawd[getarcname(ri,j-2)])?100000:transdiff(rawd[getarcname(ri,j-2)]["difficulty"],0),flg=1,abctoarc[i]=ri;
		}
		ri+=flg;
	}
	for(let i=1;i<=abccnt;i++)
		for(let j=0;j<getabccnt(i);j++){
			tg[i][j]=tags[getabcname_u(i,j)];
			problist[getabcname_u(i,j)]={
				"tag":tg[i][j],
				"diff":x[i][j]
			};
		}
	for(let i=abccnt;i>=1;i--){
		siz[i]=getabccnt(i);
		y[i]=new Array(siz[i]);
		Val[i]=new Array(siz[i]);
		RG[i]=new Array(siz[i]);
		CCC[i]=new Array(siz[i]);
		for(let j=0;j<siz[i];j++){
			CCC[i][j]="难度:"+x[i][j].toString();
			if(x[i][j]==100000){
				RG[i][j]="rgb(0,0,0)";
				Val[i][j]="0";
				y[i][j]="class=\"diff-black\"";
			}
			else if(x[i][j]<400){
				RG[i][j]="rgb(128,128,128)";
				Val[i][j]=(x[i][j]/4).toString();
				y[i][j]="class=\"diff-grey\"";
			}
			else if(x[i][j]<800){
				RG[i][j]="rgb(128,64,0)";
				Val[i][j]=((x[i][j]-400)/4).toString();
				y[i][j]="class=\"diff-brown\"";
			}
			else if(x[i][j]<1200){
				RG[i][j]="rgb(0,128,0)";
				Val[i][j]=((x[i][j]-800)/4).toString();
				y[i][j]="class=\"diff-green\"";
			}
			else if(x[i][j]<1600){
				RG[i][j]="rgb(0,192,192)";
				Val[i][j]=((x[i][j]-1200)/4).toString();
				y[i][j]="class=\"diff-cyan\"";
			}
			else if(x[i][j]<2000){
				RG[i][j]="rgb(0,0,255)";
				Val[i][j]=((x[i][j]-1600)/4).toString();
				y[i][j]="class=\"diff-blue\"";
			}
			else if(x[i][j]<2400){
				RG[i][j]="rgb(192,192,0)";
				Val[i][j]=((x[i][j]-2000)/4).toString();
				y[i][j]="class=\"diff-yellow\"";
			}
			else if(x[i][j]<2800){
				RG[i][j]="rgb(255,128,0)";
				Val[i][j]=((x[i][j]-2400)/4).toString();
				y[i][j]="class=\"diff-orange\"";
			}
			else{
				RG[i][j]="rgb(255,0,0)";
				Val[i][j]=((x[i][j]-2800)/4).toString();
				y[i][j]="class=\"diff-red\"";
			}
		}
	}

	document.write("<div id=\"abc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H/Ex</th></thead><tbody>");
	let abc="abc",arc="arc",agc="agc";
	let ABC="ABC",ARC="ARC",AGC="AGC";
	let webA="<a href=\"https://atcoder.jp/contests/abc";
	let tasA="/tasks/abc",endA=" </a>",trbA="<a href=\"?page=ABC";
	let treA="_translation\" class=link-disabled>题面</a> <a href=\"?page=ABC";
	let treA_Av="_translation\" class=link-black>题面</a> <a href=\"?page=ABC";
	let solA="_solution\" class=link-disabled>题解</a>";
	let solA_Av="_solution\" class=link-black>题解</a>";
	for(let i=abccnt;i;i--){
		document.write("<tr>");
		let t=ext3(i);
		document.write("<td><a href=\"https://atcoder.jp/contests/abc"+t+"\">ABC"+t+"</a></td>");
		for(let j=0;j<siz[i];j++){
			let uC=Charu[j],lC="_"+Charl[j]+"\" ";
			if(j==7&&i>232)uC="Ex";
			if(i<20)lC="_"+(j+1).toString()+"\" ";
			let tre_cur=treA; if(Ava_tre[i][j]) tre_cur = treA_Av;
			let sol_cur=solA; if(Ava_sol[i][j]) sol_cur = solA_Av;
			document.write("<td>"+webA+t+"/tasks/"+getabcname(i,j)+"\" "+y[i][j]+">");
			if(x[i][j]<3200){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: "+RG[i][j]+"; background: linear-gradient(to top, "+RG[i][j]+" "+Val[i][j]+"%, rgba(0, 0, 0, 0) "+Val[i][j]+"%) border-box;\"></span></ta>");
			}else if(x[i][j]<3600){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(150, 92, 44); background: linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44));\"></span></ta>");
			}else if(x[i][j]<4000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(128, 128, 128); background: linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128));\"></span></ta>");
			}else if(x[i][j]<10000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(255, 215, 0); background: linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0));\"></span></ta>");
			}else {
				document.write("<ta href=\"\" title=\"难度:暂未评定\"> <span style=\"display: inline-block; border-radius: 10rem; margin-right: 5px; font-size: 5px; font-weight: 700; color: #fff; padding: 0.25em 0.4em; padding-left: .6em; padding-right: .6em; line-height: 1; background-color: #17a2b8\">?</span></ta>");
			}
			document.write(uC+endA+trbA+t+"_"+uC+tre_cur+t+"_"+uC+sol_cur);
			if(tg[i][j]!=undefined)
				document.write("<div onclick=\"abctagtoggle("+i.toString()+","+j.toString()+")\" style=\"position: relative;\"><a class=\"floating ui teal right label\">"+tg[i][j].length.toString()+"</a></div>");
			document.write("<div id=\"tag-"+getabcname(i,j)+"\" style=\"display: none;\">");
			if(tg[i][j]!=undefined){
				cntt++;
				for(let t=0;t<tg[i][j].length;t++){
					document.write("<p class=\"ui tag label\">"+tg[i][j][t]+"</p>");
				}
			}
			document.write("</div></td>");
		}
		for(let j=siz[i];j<Lim;j++)document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString(),tper=(cntt/cnt*100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-abc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-abc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+tper+"\" id=\"progress-tag-abc\"><div class=\"bar\"></div><div class=\"label\">"+tper+"% 标签已完成</div></div></p></div>");
	$('#progress-tre-abc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-abc').progress({
		percent:cnts/cnt*100
	});
	$('#progress-tag-abc').progress({
		percent:cntt/cnt*100
	});
	console.log(cnt,cnte,cnts,cntt);
}

function writearc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=7,arccnt=0,mx=1005;
	while(getarcname(arccnt+1,1)in rawd)arccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx),tg=new Array(mx);

	let cnt=0,cnte=list_tre.length,cnts=list_sol.length,cntt=0;
	
	for(let i=1;i<=arccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=arccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++){
		let x=list_tre[i][0],y=list_tre[i][1];
		if(x>arccnt||x<0||y>getarccnt(x)||y<0)
			alert("problem "+getarcname_u(x,y)+" does not exist");
		else
			Ava_tre[x][y]=1;
	}
	for(let i=1;i<=arccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=arccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++){
		let x=list_sol[i][0],y=list_sol[i][1];
		if(x>arccnt||x<0||y>getarccnt(x)||y<0)
			alert("problem "+getarcname_u(x,y)+" does not exist");
		else
			Ava_sol[x][y]=1;
	}
	
	for(let i=1;i<=arccnt;i++){
		x[i]=new Array(getarccnt(i));
		tg[i]=new Array(getarccnt(i));
		cnt+=x[i].length;
		for(let j=0;j<getarccnt(i);j++)
			x[i][j]=!(getarcname(i,j) in rawd)||!("difficulty" in rawd[getarcname(i,j)])?100000:transdiff(rawd[getarcname(i,j)]["difficulty"],0);
	}
	for(let i=1;i<=arccnt;i++)
		for(let j=57<i&&i<104?2:0;j<getarccnt(i);j++){
			tg[i][j]=tags[getarcname_u(i,j)];
			problist[getarcname_u(i,j)]={
				"tag":tg[i][j],
				"diff":x[i][j]
			};
		}
	for(let i=arccnt;i>=1;i--){
		siz[i]=getabccnt(i);
		y[i]=new Array(siz[i]);
		Val[i]=new Array(siz[i]);
		RG[i]=new Array(siz[i]);
		CCC[i]=new Array(siz[i]);
		for(let j=0;j<siz[i];j++){
			CCC[i][j]="难度:"+x[i][j].toString();
			if(x[i][j]==100000){
				RG[i][j]="rgb(0,0,0)";
				Val[i][j]="0";
				y[i][j]="class=\"diff-black\"";
			}
			else if(x[i][j]<400){
				RG[i][j]="rgb(128,128,128)";
				Val[i][j]="0";
				y[i][j]="class=\"diff-grey\"";
			}
			else if(x[i][j]<800){
				RG[i][j]="rgb(128,64,0)";
				Val[i][j]=((x[i][j]-400)/4).toString();
				y[i][j]="class=\"diff-brown\"";
			}
			else if(x[i][j]<1200){
				RG[i][j]="rgb(0,128,0)";
				Val[i][j]=((x[i][j]-800)/4).toString();
				y[i][j]="class=\"diff-green\"";
			}
			else if(x[i][j]<1600){
				RG[i][j]="rgb(0,192,192)";
				Val[i][j]=((x[i][j]-1200)/4).toString();
				y[i][j]="class=\"diff-cyan\"";
			}
			else if(x[i][j]<2000){
				RG[i][j]="rgb(0,0,255)";
				Val[i][j]=((x[i][j]-1600)/4).toString();
				y[i][j]="class=\"diff-blue\"";
			}
			else if(x[i][j]<2400){
				RG[i][j]="rgb(192,192,0)";
				Val[i][j]=((x[i][j]-2000)/4).toString();
				y[i][j]="class=\"diff-yellow\"";
			}
			else if(x[i][j]<2800){
				RG[i][j]="rgb(255,128,0)";
				Val[i][j]=((x[i][j]-2400)/4).toString();
				y[i][j]="class=\"diff-orange\"";
			}
			else{
				RG[i][j]="rgb(255,0,0)";
				Val[i][j]=((x[i][j]-2800)/4).toString();
				y[i][j]="class=\"diff-red\"";
			}
		}
	}

	document.write("<div id=\"arc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	let abc="abc",arc="arc",agc="agc";
	let ABC="ABC",ARC="ARC",AGC="AGC";
	let webA="<a href=\"https://atcoder.jp/contests/arc";
	let tasA="/tasks/arc",endA=" </a>",trbA="<a href=\"?page=ARC";
	let treA="_translation\" class=link-disabled>题面</a> <a href=\"?page=ARC";
	let treA_Av="_translation\" class=link-black>题面</a> <a href=\"?page=ARC";
	let solA="_solution\" class=link-disabled>题解</a>";
	let solA_Av="_solution\" class=link-black>题解</a>";
	for(let i=arccnt;i;i--){
		document.write("<tr>");
		let t=ext3(i),w=57<i&&i<104?2:0;
		document.write("<td><a href=\"https://atcoder.jp/contests/arc"+t+"\">ARC"+t+"</a></td>");
		for(let j=0;j<w;j++)
			document.write("<td></td>");
		for(let j=0;j<siz[i];j++){
			let uC=Charu[j],lC="_"+Charl[j]+"\" ";
			if(i==120&&j==6)uC="F2",lC="_F2\" ";
			let tre_cur=treA; if(Ava_tre[i][j]) tre_cur = treA_Av;
			let sol_cur=solA; if(Ava_sol[i][j]) sol_cur = solA_Av;
			document.write("<td>"+webA+t+"/tasks/"+getarcname(i,j)+"\" "+y[i][j]+">");
			if(x[i][j]<3200){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: "+RG[i][j]+"; background: linear-gradient(to top, "+RG[i][j]+" "+Val[i][j]+"%, rgba(0, 0, 0, 0) "+Val[i][j]+"%) border-box;\"></span></ta>");
			}else if(x[i][j]<3600){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(150, 92, 44); background: linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44));\"></span></ta>");
			}else if(x[i][j]<4000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(128, 128, 128); background: linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128));\"></span></ta>");
			}else if(x[i][j]<10000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(255, 215, 0); background: linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0));\"></span></ta>");
			}else {
				document.write("<ta href=\"\" title=\"难度:暂未评定\"> <span style=\"display: inline-block; border-radius: 10rem; margin-right: 5px; font-size: 5px; font-weight: 700; color: #fff; padding: 0.25em 0.4em; padding-left: .6em; padding-right: .6em; line-height: 1; background-color: #17a2b8\">?</span></ta>");
			}
			document.write(uC+endA+trbA+t+"_"+uC+tre_cur+t+"_"+uC+sol_cur);
			if(tg[i][j]!=undefined)
				document.write("<div onclick=\"arctagtoggle("+i.toString()+","+j.toString()+")\" style=\"position: relative;\"><a class=\"floating ui teal right label\" style=\"z-index: 999;\">"+tg[i][j].length.toString()+"</a></div>");
			document.write("<div id=\"tag-"+getarcname(i,j)+"\" style=\"display: none;\">");
			if(tg[i][j]!=undefined){
				cntt++;
				for(let t=0;t<tg[i][j].length;t++){
					document.write("<p class=\"ui tag label\">"+tg[i][j][t]+"</p>");
				}
				// document.write("</div>&nbsp;tag("+tg[i][j].length+")");
			}
			document.write("</td>");
		}
		for(let j=siz[i]+w;j<Lim;j++)document.write("<td></td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString(),tper=(cnts/cnt*100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-arc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-arc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+tper+"\" id=\"progress-tag-arc\"><div class=\"bar\"></div><div class=\"label\">"+tper+"% 标签已完成</div></div></p></div>");
	$('#progress-tre-arc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-arc').progress({
		percent:cnts/cnt*100
	});
	$('#progress-tag-arc').progress({
		percent:cntt/cnt*100
	});
	console.log(cnt,cnte,cnts,cntt);
}

function writeagc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=7,agccnt=0,mx=1005;
	while(agccnt==41||getagcname(agccnt+1,1)in rawd)agccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx),tg=new Array(mx);

	let cnt=0,cnte=list_tre.length,cnts=list_sol.length,cntt=0;
	
	for(let i=1;i<=agccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=agccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++){
		let x=list_tre[i][0],y=list_tre[i][1];
		if(x>agccnt||x<0||y>getagccnt(x)||y<0)
			alert("problem "+getagcname_u(x,y)+" does not exist");
		else
			Ava_tre[x][y]=1;
	}
	for(let i=1;i<=agccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=agccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++){
		let x=list_sol[i][0],y=list_sol[i][1];
		if(x>agccnt||x<0||y>getagccnt(x)||y<0)
			alert("problem "+getagcname_u(x,y)+" does not exist");
		else
			Ava_sol[x][y]=1;
	}
	
	for(let i=1;i<=agccnt;i++){
		x[i]=new Array(getagccnt(i));
		tg[i]=new Array(getagccnt(i));
		cnt+=x[i].length;
		for(let j=0;j<getagccnt(i);j++)
			x[i][j]=!(getagcname(i,j) in rawd)||!("difficulty" in rawd[getagcname(i,j)])?100000:transdiff(rawd[getagcname(i,j)]["difficulty"],0);
	}
	for(let i=1;i<=agccnt;i++)
		for(let j=0;j<getagccnt(i);j++){
			tg[i][j]=tags[getagcname_u(i,j)];
			problist[getagcname_u(i,j)]={
				"tag":tg[i][j],
				"diff":x[i][j]
			};
		}
	for(let i=agccnt;i>=1;i--){
		siz[i]=getagccnt(i);
		y[i]=new Array(siz[i]);
		Val[i]=new Array(siz[i]);
		RG[i]=new Array(siz[i]);
		CCC[i]=new Array(siz[i]);
		for(let j=0;j<siz[i];j++){
			CCC[i][j]="难度:"+x[i][j].toString();
			if(x[i][j]==100000){
				RG[i][j]="rgb(0,0,0)";
				Val[i][j]="0";
				y[i][j]="class=\"diff-black\"";
			}
			else if(x[i][j]<400){
				RG[i][j]="rgb(128,128,128)";
				Val[i][j]="0";
				y[i][j]="class=\"diff-grey\"";
			}
			else if(x[i][j]<800){
				RG[i][j]="rgb(128,64,0)";
				Val[i][j]=((x[i][j]-400)/4).toString();
				y[i][j]="class=\"diff-brown\"";
			}
			else if(x[i][j]<1200){
				RG[i][j]="rgb(0,128,0)";
				Val[i][j]=((x[i][j]-800)/4).toString();
				y[i][j]="class=\"diff-green\"";
			}
			else if(x[i][j]<1600){
				RG[i][j]="rgb(0,192,192)";
				Val[i][j]=((x[i][j]-1200)/4).toString();
				y[i][j]="class=\"diff-cyan\"";
			}
			else if(x[i][j]<2000){
				RG[i][j]="rgb(0,0,255)";
				Val[i][j]=((x[i][j]-1600)/4).toString();
				y[i][j]="class=\"diff-blue\"";
			}
			else if(x[i][j]<2400){
				RG[i][j]="rgb(192,192,0)";
				Val[i][j]=((x[i][j]-2000)/4).toString();
				y[i][j]="class=\"diff-yellow\"";
			}
			else if(x[i][j]<2800){
				RG[i][j]="rgb(255,128,0)";
				Val[i][j]=((x[i][j]-2400)/4).toString();
				y[i][j]="class=\"diff-orange\"";
			}
			else{
				RG[i][j]="rgb(255,0,0)";
				Val[i][j]=((x[i][j]-2800)/4).toString();
				y[i][j]="class=\"diff-red\"";
			}
		}
	}

	document.write("<div id=\"agc-table\">");
	document.write("<table class=\"ui fixed celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	let abc="abc",arc="arc",agc="agc";
	let ABC="ABC",ARC="ARC",AGC="AGC";
	let webA="<a href=\"https://atcoder.jp/contests/agc";
	let tasA="/tasks/agc",endA=" </a>",trbA="<a href=\"?page=AGC";
	let treA="_translation\" class=link-disabled>题面</a> <a href=\"?page=AGC";
	let treA_Av="_translation\" class=link-black>题面</a> <a href=\"?page=AGC";
	let solA="_solution\" class=link-disabled>题解</a>";
	let solA_Av="_solution\" class=link-black>题解</a>";
	for(let i=agccnt;i;i--){
		if(i==42)
			continue;
		document.write("<tr>");
		let t=ext3(i);
		document.write("<td><a href=\"https://atcoder.jp/contests/agc"+t+"\">AGC"+t+"</a></td>");
		for(let j=0;j<siz[i];j++){
			let uC=Charu[j],lC="_"+Charl[j]+"\" ";
			if(i==28&&j==6)uC="F2",lC="_F2\" ";
			let tre_cur=treA; if(Ava_tre[i][j]) tre_cur = treA_Av;
			let sol_cur=solA; if(Ava_sol[i][j]) sol_cur = solA_Av;
			document.write("<td>"+webA+t+"/tasks/"+getagcname(i,j)+"\" "+y[i][j]+">");
			if(x[i][j]<3200){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: "+RG[i][j]+"; background: linear-gradient(to top, "+RG[i][j]+" "+Val[i][j]+"%, rgba(0, 0, 0, 0) "+Val[i][j]+"%) border-box;\"></span></ta>");
			}else if(x[i][j]<3600){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(150, 92, 44); background: linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44));\"></span></ta>");
			}else if(x[i][j]<4000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(128, 128, 128); background: linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128));\"></span></ta>");
			}else if(x[i][j]<10000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"><span class=\"difficulty-circle\" style=\"border-color: rgb(255, 215, 0); background: linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0));\"></span></ta>");
			}else {
				document.write("<ta href=\"\" title=\"难度:暂未评定\"> <span style=\"display: inline-block; border-radius: 10rem; margin-right: 5px; font-size: 5px; font-weight: 700; color: #fff; padding: 0.25em 0.4em; padding-left: .6em; padding-right: .6em; line-height: 1; background-color: #17a2b8\">?</span></ta>");
			}
			document.write(uC+endA+trbA+t+"_"+uC+tre_cur+t+"_"+uC+sol_cur);
			if(tg[i][j]!=undefined)
				document.write("<div onclick=\"agctagtoggle("+i.toString()+","+j.toString()+")\" style=\"position: relative;\"><a class=\"floating ui teal right label\" style=\"z-index: 999;\">"+tg[i][j].length.toString()+"</a></div>");
			document.write("<div id=\"tag-"+getagcname(i,j)+"\" style=\"display: none;\">");
			if(tg[i][j]!=undefined){
				cntt++;
				for(let t=0;t<tg[i][j].length;t++){
					document.write("<p class=\"ui tag label\">"+tg[i][j][t]+"</p>");
				}
				// document.write("</div>&nbsp;tag("+tg[i][j].length+")");
			}
			document.write("</td>");
		}
		for(let j=siz[i];j<Lim;j++)document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString(),tper=(cntt/cnt*100).toFixed(3);
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-agc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-agc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+tper+"\" id=\"progress-tag-agc\"><div class=\"bar\"></div><div class=\"label\">"+tper+"% 标签已完成</div></div></p></div>");
	$('#progress-tre-agc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-agc').progress({
		percent:cnts/cnt*100
	});
	$('#progress-tag-agc').progress({
		percent:cntt/cnt*100
	});
	console.log(cnt,cnte,cnts,cntt);
}

// function writelinks(){
	// document.write("<div id=\"friend-links\"><div class=\"ui fluid vertical menu\">\
		// <p class=\"item\">\
			// 友情链接\
		// </p>\
		// <p class=\"item\">\
			// <a href=\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\"><img src=\"images/logo1.png\" alt=\"Github Repo\" width=\"64\" height=\"64\"></a>\
		// </p>\
		// <p class=\"item\">\
			// <a href=\"https://atcoder.jp\"><img src=\"images/atcoder.png\" alt=\"AtCoder\" width=\"64\" height=\"64\"></a>\
		// </p>\
		// <p class=\"item\">\
			// <a href=\"https://kenkoooo.com/atcoder/#/\"><img src=\"images/kenkoooo.png\" alt=\"Kenkoooo AtCoder Problems\" width=\"64\" height=\"64\"></a>\
		// </p>\
		// <p class=\"item\">\
			// <a href=\"https://semantic-ui.com/\"><img src=\"images/semantic.png\" alt=\"Semantic UI\" width=\"64\" height=\"64\"></a>\
		// </p>\
	// </div></div>");
// }

function listtoggleabc(){
	let flg=document.getElementById("list-abc-btn").getAttribute("class")=="ui toggle button";
	document.getElementById("list-abc-btn").setAttribute("class",flg?"ui toggle button active":"ui toggle button");
	for(let i in problist){
		if(i.substr(0,3)=="ABC"){
			document.getElementById(i+"-btn").setAttribute("style",flg?"":"display: none;");
		}
	}
}
function listtogglearc(){
	let flg=document.getElementById("list-arc-btn").getAttribute("class")=="ui toggle button";
	document.getElementById("list-arc-btn").setAttribute("class",flg?"ui toggle button active":"ui toggle button");
	for(let i in problist){
		if(i.substr(0,3)=="ARC"){
			document.getElementById(i+"-btn").setAttribute("style",flg?"":"display: none;");
		}
	}
}
function listtoggleagc(){
	let flg=document.getElementById("list-agc-btn").getAttribute("class")=="ui toggle button";
	document.getElementById("list-agc-btn").setAttribute("class",flg?"ui toggle button active":"ui toggle button");
	for(let i in problist){
		if(i.substr(0,3)=="AGC"){
			document.getElementById(i+"-btn").setAttribute("style",flg?"":"display: none;");
		}
	}
}

function insert(newelement, tge) {
    var parent = tge.parentNode;
    parent.insertBefore(newelement, tge);
}

function writelist(){
	document.write("<div id=\"prob-list\">");
	document.write("<p align=\"center\" style=\"font-style: italic\">注意：这部分仍在施工中</p>");
	document.write("<button class=\"ui toggle button active\" id=\"list-abc-btn\" onclick=\"listtoggleabc()\">Show ABC</button>");
	document.write("<button class=\"ui toggle button active\" id=\"list-arc-btn\" onclick=\"listtogglearc()\">Show ARC</button>");
	document.write("<button class=\"ui toggle button active\" id=\"list-agc-btn\" onclick=\"listtoggleagc()\">Show AGC</button>");
	document.write("<table class=\"ui fixed sortable celled table segment\">");
	document.write("<thead><tr><th>ID</th><th>难度</th><th>标签</th></thead><tbody>");
	for(let i in problist){
		document.write("<tr id=\""+i+"-btn\">");
		document.write("<td>"+i+"</td>");
		document.write("<td>"+(problist[i]["diff"]==100000?"unavailable":problist[i]["diff"].toString())+"</td>");
		document.write("<td>");
		if(problist[i]["tag"]!=undefined){
			let t=problist[i]["tag"];
			for(let j=0;j<t.length;j++){
				document.write("<div class=\"ui tag label\">"+t[j]+"</div>");
			}
		}
		document.write("</td></tr>");
	}
	document.write("</tbody></table></div>");
	
	var fpos = document.getElementsByClassName('ui fixed sortable celled table segment')[0]

	var inpl = document.createElement('div')
	inpl.setAttribute('class', 'ui input')
	var insl = document.createElement('input')
	insl.setAttribute('id', 'diflb')
	insl.setAttribute('placeholder', '筛选难度下界')
	inpl.appendChild(insl)
	insert(inpl, fpos)

	var inpr = document.createElement('div')
	inpr.setAttribute('class', 'ui input')
	var insr= document.createElement('input')
	insr.setAttribute('id', 'difrb')
	insr.setAttribute('placeholder', '筛选难度上界')
	inpr.appendChild(insr)
	insert(inpr, fpos)

	var sebot = document.createElement('botton')
	sebot.setAttribute('class', 'ui violet basic button')
	sebot.setAttribute('onclick', 'sedif()')
	sebot.innerText = '筛选难度'
	insert(sebot, fpos)


	var intag = document.createElement('div')
	intag.setAttribute('class', 'ui input')
	var insta= document.createElement('input')
	insta.setAttribute('id', 'intag')
	insta.setAttribute('placeholder', '筛选标签')
	intag.appendChild(insta)
	insert(intag, fpos)

	var sebot = document.createElement('botton')
	sebot.setAttribute('class', 'ui violet basic button')
	sebot.setAttribute('onclick', 'setag()')
	sebot.innerText = '筛选标签'
	insert(sebot, fpos)

	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');

	script.innerText = "\
	var rev1 = new Array();\n\
	var rev2 = new Array();\n\
	function sedif(flag = 0) {\n\
	    var l = Number(document.getElementById('diflb').value);\n\
	    var r = Number(document.getElementById('difrb').value);\n\
	    var list = document.getElementsByTagName('tbody')[3].childNodes;\n\
	    for (var i = 0; i < rev1.length; i++) rev1[i].style = '';\n\
	    rev1 = new Array();\
	    for (var i = 0; i < list.length; i++)\n\
		if (list[i].childNodes[1].innerHTML == 'unavailable' || Number(list[i].childNodes[1].innerHTML) < l || Number(list[i].childNodes[1].innerHTML) > r)\n\
		    list[i].style = 'display:none', rev1.push(list[i]);\n\
	    if (!flag) setag(1);\
	}\n\
	function setag(flag = 0) {\
	    var tags = document.getElementById('intag').value.split(',');\
	    var list = document.getElementsByTagName('tbody')[3].childNodes;\
	    for (var i = 0; i < rev2.length; i++) rev2[i].style = '';\
	    rev2 = new Array();\
	    for (var i = 0; i < list.length; i++) {\
		var finded = false;\
		for (var j = 0; j < tags.length; j++)\
		    if (list[i].childNodes[2].innerHTML.match(tags[j]) != null)\
			finded = true;\
		if (!finded) list[i].style = 'display:none', rev2.push(list[i]);\
	    }\
	    if (!flag) sedif();\
	}\
	"
	document.getElementsByTagName('head')[0].appendChild(script);


}

function buildw(){
	document.write("<h1><p align=\"center\">AtCoder 中文版</p></h1>");
	let rawd,list,tags;
	readTextFile("https://kenkoooo.com/atcoder/resources/problem-models.json","json",function(text){
		rawd=JSON.parse(text);
	});
	readTextFile("list.json","json",function(text){
		list=JSON.parse(text);
	});
	readTextFile("tags.json","json",function(text){
		tags=JSON.parse(text);
	});
	document.write("<div class=\"ui secondary menu\"><a class=\"item\" onclick=\"abctabletoggle()\">ABC</a><a class=\"item\" onclick=\"arctabletoggle()\">ARC</a><a class=\"item\" onclick=\"agctabletoggle()\">AGC</a><a class=\"item\" onclick=\"listtoggle()\">筛选</a></div>");
	
	writeabc(rawd,tags,list["abc_list_tre"],list["abc_list_sol"]);
	writearc(rawd,tags,list["arc_list_tre"],list["arc_list_sol"]);
	writeagc(rawd,tags,list["agc_list_tre"],list["agc_list_sol"]);
	// writelinks();
	writelist(problist);
	console.log(problist);
	abctabletoggle();
	
	document.write("<div class=\"ui vertical footer segment\">\
		<div class=\"ui center aligned container\">\
			<div class=\"ui section divider\"></div>\
			<div class=\"ui buttons\">\
				<script>\
					function jumplink1(){\
						window.location.href=\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\";\
					}\
					function jumplink2(){\
						window.location.href=\"https://atcoder.jp/\";\
					}\
					function jumplink3(){\
						window.location.href=\"https://kenkoooo.com/atcoder/#/table/\";\
					}\
					function jumplink4(){\
						window.location.href=\"https://semantic-ui.com/\";\
					}\
				</script>\
				<button class=\"ui basic button\" onclick=\"jumplink1()\"><img src=\"images/logo1.png\"    class=\"ui centered mini image\"/></button>\
				<button class=\"ui basic button\" onclick=\"jumplink2()\"><img src=\"images/atcoder.png\"  class=\"ui centered mini image\"/></button>\
				<button class=\"ui basic button\" onclick=\"jumplink3()\"><img src=\"images/kenkoooo.png\" class=\"ui centered mini image\"/></button>\
				<button class=\"ui basic button\" onclick=\"jumplink4()\"><img src=\"images/semantic.png\" class=\"ui centered mini image\"/></button>\
			</div>\
			<p align=\"center\">\
				Powered by <a href=\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\">AtCoder for Chinese Develop Team</a>.\
			</p>\
		</div>\
	</div>");
}
