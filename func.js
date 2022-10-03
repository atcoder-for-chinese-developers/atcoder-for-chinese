function readTextFile(file,callback){
	var xhr=new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.open("GET",file,false);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4&&xhr.status=="200"){
			callback(xhr.responseText);
		}
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
function getabcname(con,id){
	if(41<con&&con<126&&id>1){
		var rcon=con+16,rid=id-2;
		return "arc"+(Math.floor(con/100)).toString()+(Math.floor(con%100/10)).toString()+(con%10).toString()+"_"+String.fromCharCode(rid+97);
	}
	return "abc"+(Math.floor(con/100)).toString()+(Math.floor(con%100/10)).toString()+(con%10).toString()+"_"+(con>19?String.fromCharCode(id+97):(id+1).toString());
}
function sidebartoggle(){
	$('.ui.sidebar').sidebar('toggle');
}
function buildw()
{
	var Charl=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var Charu=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var Lim=8,abccnt=271,mx=505;
	
	var y=new Array(mx),siz=new Array(mx),CCC=new Array(mx),Val=new Array(mx),RG=new Array(mx),
	    Ava_tre=new Array(mx),Ava_sol=new Array(mx);
	
	var x=new Array(mx),rawd,list_tre,list_sol;
	
	readTextFile("https://kenkoooo.com/atcoder/resources/problem-models.json",function(text){
		rawd=JSON.parse(text);
	});
	readTextFile("list.json",function(text){
		list_tre=JSON.parse(text)["list_tre"];
	});
	readTextFile("list.json",function(text){
		list_sol=JSON.parse(text)["list_sol"];
	});
	
	var cnt=0,cnte=list_tre.length,cnts=list_sol.length;
	
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
	
	for(let i=1;i<=abccnt;i++){
		x[i]=new Array(getabccnt(i));
		cnt+=x[i].length;
		for(let j=0;j<getabccnt(i);j++)
			x[i][j]=!(getabcname(i,j) in rawd)||!("difficulty" in rawd[getabcname(i,j)])?100000:Math.max(rawd[getabcname(i,j)]["difficulty"],0);
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
	document.write("<h1><p align=\"center\">AtCoder 中文版</p></h1>");
	document.write("<p align=\"center\"><button class=\"ui button\" onclick=\"sidebartoggle()\">显示/隐藏友链</button></p>");
	document.write("<table class=\"ui celled definition table segment\" style=\"width:100%;max-width=90%\">");
	document.write("<thead class=\"full-width\"><tr><th>比赛</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H/Ex</th></thead><tbody>");
	var abc="abc",arc="arc",agc="agc";
	var ABC="ABC",arc="ARC",agc="AGC";
	var webA="<td><a href=\"https://atcoder.jp/contests/abc";
	var tasA="/tasks/abc",endA=" </a>",trbA="<a href=\"translation/ABC";
	var treA="_translation.html\" class=link-disabled>题面</a> <a href=\"solution/ABC";
	var treA_Av="_translation.html\" class=link-black>题面</a> <a href=\"solution/ABC";
	var solA="_solution.html\" class=link-disabled>题解</a></td>";
	var solA_Av="_solution.html\" class=link-black>题解</a></td>";
	for(let i=abccnt;i;i--){
		document.write("<tr>");
		var a=Math.floor(i/100),b=Math.floor(i/10%10),c=i%10;
		var t=a.toString()+b.toString()+c.toString();
		document.write("<td><a href=\"https://atcoder.jp/contests/abc"+t+"\">ABC"+t+"</a></td>");
		for(let j=0;j<siz[i];j++){
			var uC=Charu[j],lC="_"+Charl[j]+"\" ";
			if(j==7&&i>232)uC="Ex";
			if(i<20)lC="_"+(j+1).toString()+"\" ";
			var tre_cur=treA; if(Ava_tre[i][j]) tre_cur = treA_Av;
			var sol_cur=solA; if(Ava_sol[i][j]) sol_cur = solA_Av;
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
				document.write("<ta href=\"\" title=\"难度:暂未评定\"> <span class=\"difficulty-circle\" style=\"border-color: rgb(0,0,0); background: linear-gradient(to top, rgb(0,0,0) 100%, rgba(0, 0, 0, 0) 100%) border-box;\"></span></ta>");
			}
			document.write(uC+endA+trbA+t+"_"+uC+tre_cur+t+"_"+uC+sol_cur);
		}
		for(let j=siz[i];j<Lim;j++)document.write("<td> </td>");
		document.write("</tr>");
	}
	document.write("</tbody></table>");
	
	var eper=(cnte/cnt*100).toFixed(3).toString(),sper=(cnts/cnt*100).toFixed(3).toString();
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+eper+"\" id=\"progress-tre\"><div class=\"bar\"></div><div class=\"label\">"+eper+"% 题面已完成</div></div></p>");
	document.write("<p align=\"center\"><div class=\"ui indicating progress\" data-percent=\""+sper+"\" id=\"progress-sol\"><div class=\"bar\"></div><div class=\"label\">"+sper+"% 题解已完成</div></div></p>");
	$('#progress-tre').progress({
		percent:cnte/cnt*100
	});
	$('#progress-sol').progress({
		percent:cnts/cnt*100
	});
	document.write("<hr>");
	//document.write("<a href=\"https://semantic-ui.com/"><img src="repo_icon.png" alt="ATcoder" width="64" height="64" margin-left="30px"></a>\")
	
	console.log(cnt,cnte,cnts);
}
