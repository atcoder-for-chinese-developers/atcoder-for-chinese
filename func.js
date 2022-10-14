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
	document.getElementById("friend-links").setAttribute("style","display: none;");
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
function linkstoggle(){
	closealltables();
	document.getElementById("friend-links").setAttribute("style","display: block;");
}
function tagtoggle(i,j){
	document.getElementById("tag-"+getabcname(i,j)).setAttribute("style",
		document.getElementById("tag-"+getabcname(i,j)).getAttribute("style")=="display: block;"?"display: none;":"display: block;"
	);
}
function writeabc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=8,abccnt=0,mx=1005;
	while(getabcname(abccnt+1,1)in rawd)abccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx),tg=new Array(mx);

	let cnt=0,cnte=list_tre.length,cnts=list_sol.length;
	
	for(let i=1;i<=abccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=abccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++)
		Ava_tre[list_tre[i][0]][list_tre[i][1]] = 1;
	for(let i=1;i<=abccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=abccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++)
		Ava_sol[list_sol[i][0]][list_sol[i][1]]=1;
	
	for(let i=1,ri=58;i<=abccnt;i++){
		x[i]=new Array(getabccnt(i));
		tg[i]=new Array(getabccnt(i));
		cnt+=x[i].length;
		let flg=0;
		for(let j=0;j<getabccnt(i);j++){
			if(i<42||i>125||j<2||getabcname(i,j) in rawd)
				x[i][j]=!(getabcname(i,j) in rawd)||!("difficulty" in rawd[getabcname(i,j)])?100000:Math.max(rawd[getabcname(i,j)]["difficulty"],0);
			else
				x[i][j]=!("difficulty" in rawd[getarcname(ri,j-2)])?100000:Math.max(rawd[getarcname(ri,j-2)]["difficulty"],0),flg=1,abctoarc[i]=ri;
		}
		ri+=flg;
	}
	for(let i=1;i<=abccnt;i++)
		for(let j=0;j<getabccnt(i);j++){
			tg[i][j]=tags[getabcname_u(i,j)];
			if(tg[i][j]!=undefined)
				console.log(tg[i][j]);
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

	document.write("<div id=\"abc-table\">");
	document.write("<table class=\"ui celled definition table segment\" style=\"width:100%;max-width=90%\">");
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
			document.write("<td>");
			if(x[i][j]<3200){
				document.write("<ta onclick=\"tagtoggle("+i.toString()+","+j.toString()+")\" href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: "+RG[i][j]+"; background: linear-gradient(to top, "+RG[i][j]+" "+Val[i][j]+"%, rgba(0, 0, 0, 0) "+Val[i][j]+"%) border-box;\"></span></ta>");
			}else if(x[i][j]<3600){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(150, 92, 44); background: linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44));\"></span></ta>");
			}else if(x[i][j]<4000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(128, 128, 128); background: linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128));\"></span></ta>");
			}else if(x[i][j]<10000){
				document.write("<ta href=\"\" title=\""+CCC[i][j]+"\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(255, 215, 0); background: linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0));\"></span></ta>");
			}else {
				document.write("<ta href=\"\" title=\"难度:暂未评定\"> <span style=\"display: inline-block; border-radius: 10rem; margin-right: 5px; font-size: 5px; font-weight: 700; color: #fff; padding: 0.25em 0.4em; padding-left: .6em; padding-right: .6em; line-height: 1; background-color: #17a2b8\">?</span></ta>");
			}
			document.write(webA+t+"/tasks/"+getabcname(i,j)+"\" "+y[i][j]+">");
			document.write(uC+endA+trbA+t+"_"+uC+tre_cur+t+"_"+uC+sol_cur);
			document.write("<div id=\"tag-"+getabcname(i,j)+"\" style=\"display: none;\">");
			if(tg[i][j]!=undefined){
				for(let t=0;t<tg[i][j].length;t++){
					document.write("<p class=\"ui tag label\">"+tg[i][j][t]+"</p>");
				}
				document.write("</div>&nbsp;tag("+tg[i][j].length+")");
			}
			document.write("</td>");
		}
		for(let j=siz[i];j<Lim;j++)document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString();
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-abc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-abc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p></div>");
	$('#progress-tre-abc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-abc').progress({
		percent:cnts/cnt*100
	});
	console.log(cnt,cnte,cnts);
}
function writearc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=7,arccnt=0,mx=1005;
	while(getarcname(arccnt+1,1)in rawd)arccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx);
	let cnt=0,cnte=list_tre.length,cnts=list_sol.length;

	for(let i=1;i<=arccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=arccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++)
		Ava_tre[list_tre[i][0]][list_tre[i][1]] = 1;
	for(let i=1;i<=arccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=arccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++)
		Ava_sol[list_sol[i][0]][list_sol[i][1]]=1;
	
	for(let i=1;i<=arccnt;i++){
		x[i]=new Array(getarccnt(i));
		cnt+=x[i].length;
		for(let j=0;j<getarccnt(i);j++)
			x[i][j]=!(getarcname(i,j) in rawd)||!("difficulty" in rawd[getarcname(i,j)])?100000:Math.max(rawd[getarcname(i,j)]["difficulty"],0);
	}

	for(let i=arccnt;i>=1;i--){
		siz[i]=getarccnt(i);
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
	document.write("<table class=\"ui celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	let abc="abc",arc="arc",agc="agc";
	let ABC="ABC",ARC="ARC",AGC="AGC";
	let webA="<td><a href=\"https://atcoder.jp/contests/arc";
	let tasA="/tasks/arc",endA=" </a>",trbA="<a href=\"?page=ARC";
	let treA="_translation\" class=link-disabled>题面</a> <a href=\"?page=ARC";
	let treA_Av="_translation\" class=link-black>题面</a> <a href=\"?page=ARC";
	let solA="_solution\" class=link-disabled>题解</a></td>";
	let solA_Av="_solution\" class=link-black>题解</a></td>";
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
			document.write(webA+t+"/tasks/"+getarcname(i,j)+"\" "+y[i][j]+">");
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
		}
		for(let j=siz[i]+w;j<Lim;j++)document.write("<td></td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString();
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-arc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-arc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p></div>");
	$('#progress-tre-arc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-arc').progress({
		percent:cnts/cnt*100
	});
	console.log(cnt,cnte,cnts);
}
function writeagc(rawd,tags,list_tre,list_sol){
	let Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	let Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let Lim=7,agccnt=0,mx=1005;
	while(agccnt==41||getagcname(agccnt+1,1)in rawd)agccnt++;
	
	let y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
		Ava_tre=new Array(mx),Ava_sol=new Array(mx),x=new Array(mx),cnt=0,cnte=list_tre.length,cnts=list_sol.length;
	
	for(let i=1;i<=agccnt;i++) Ava_tre[i] = new Array(10);
	for(let i=1;i<=agccnt;i++) for(let j=1;j<=10;j++)
		Ava_tre[i][j] = 0;
	for(let i=0;i<list_tre.length;i++)
		Ava_tre[list_tre[i][0]][list_tre[i][1]] = 1;
	for(let i=1;i<=agccnt;i++) Ava_sol[i] = new Array(10);
	for(let i=1;i<=agccnt;i++) for(let j=1;j<=10;j++)
		Ava_sol[i][j] = 0;
	for(let i=0;i<list_sol.length;i++)
		Ava_sol[list_sol[i][0]][list_sol[i][1]]=1;
	
	for(let i=1;i<=agccnt;i++){
		x[i]=new Array(getagccnt(i));
		cnt+=x[i].length;
		for(let j=0;j<getagccnt(i);j++)
			x[i][j]=!(getagcname(i,j) in rawd)||!("difficulty" in rawd[getagcname(i,j)])?100000:Math.max(rawd[getagcname(i,j)]["difficulty"],0);
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
	document.write("<table class=\"ui celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>F2</th></thead><tbody>");
	let abc="abc",arc="arc",agc="agc";
	let ABC="ABC",ARC="ARC",AGC="AGC";
	let webA="<td><a href=\"https://atcoder.jp/contests/agc";
	let tasA="/tasks/agc",endA=" </a>",trbA="<a href=\"?page=AGC";
	let treA="_translation\" class=link-disabled>题面</a> <a href=\"?page=AGC";
	let treA_Av="_translation\" class=link-black>题面</a> <a href=\"?page=AGC";
	let solA="_solution\" class=link-disabled>题解</a></td>";
	let solA_Av="_solution\" class=link-black>题解</a></td>";
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
			document.write(webA+t+tasA+t+lC+y[i][j]+">");
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
		}
		for(let j=siz[i];j<Lim;j++)document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	let eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString();
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre-agc\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol-agc\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p></div>");
	$('#progress-tre-agc').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol-agc').progress({
		percent:cnts/cnt*100
	});
	console.log(cnt,cnte,cnts);
}
function writelinks(){
	document.write("<div id=\"friend-links\"><div class=\"ui fluid vertical menu\">\
		<p class=\"item\">\
			友情链接\
		</p>\
		<p class=\"item\">\
			<a href=\"https://github.com/atcoder-for-chinese-developers/atcoder-for-chinese\"><img src=\"images/logo1.png\" alt=\"Github Repo\" width=\"64\" height=\"64\"></a>\
		</p>\
		<p class=\"item\">\
			<a href=\"https://atcoder.jp\"><img src=\"images/atcoder.png\" alt=\"AtCoder\" width=\"64\" height=\"64\"></a>\
		</p>\
		<p class=\"item\">\
			<a href=\"https://kenkoooo.com/atcoder/#/\"><img src=\"images/kenkoooo.png\" alt=\"Kenkoooo AtCoder Problems\" width=\"64\" height=\"64\"></a>\
		</p>\
		<p class=\"item\">\
			<a href=\"https://semantic-ui.com/\"><img src=\"images/semantic.png\" alt=\"Semantic UI\" width=\"64\" height=\"64\"></a>\
		</p>\
	</div></div>");
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
	document.write("<div class=\"ui secondary menu\"><a class=\"item\" onclick=\"abctabletoggle()\">ABC</a><a class=\"item\" onclick=\"arctabletoggle()\">ARC</a><a class=\"item\" onclick=\"agctabletoggle()\">AGC</a><a class=\"item\" onclick=\"linkstoggle()\">友链</a></div>");
	
	document.write("<p align=\"center\"><font style=\"font-size:16px;\">点击题目边的难度圆圈显示题目标签，现在暂时只支持 ABC。</font></p>");
	document.write("<p align=\"center\"><font style=\"font-size:16px;\">题目旁的 tag(cnt) 表示当前题目标签的个数。</font></p>");
	
	writeabc(rawd,tags,list["abc_list_tre"],list["abc_list_sol"]);
	writearc(rawd,tags,list["arc_list_tre"],list["arc_list_sol"]);
	writeagc(rawd,tags,list["agc_list_tre"],list["agc_list_sol"]);
	writelinks();
	abctabletoggle();
}
