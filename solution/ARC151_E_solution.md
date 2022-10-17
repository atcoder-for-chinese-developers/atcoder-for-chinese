首先证明：如果 $X$ 和 $Y$ 最长公共子串不为空，最优方案一定是先把 $X$ 删到只剩那个最长公共子串，再补齐到 $Y$。

由于两者最长公共子串不为空，贪心地，我们一定先删到某个较短的串，再补齐。

设 $S$ 为较短串，那么，代价为 $|X|+|Y|-2|S|$。

不会经过别的数，因为代价会凭空增加 $2$。

所以最长公共子串就是最优。

而最长公共子串是 SAM/SA 能轻松解决的问题。

如果最长公共子串为空。

贪心考虑，一个串一定越短越容易被匹配。

所以我们的操作一定是：先删到只剩一个数，加入一个数，删除一个数，$\dots$，直到出现一个数在 $Y$ 中出现，然后补成 $Y$。

由于操作过程中要满足时刻是 $A$ 的子串，而长度最大是 $2$。可以考虑建图， $A_i$ 向 $A_{i+1}$ 连边，表示可以通过一次加入，一次删除，从 $A_i$ 变成 $A_{i+1}$ 或从 $A_{i+1}$ 变成 $A_i$。

由于通过一个点的过渡，必须先加入这个点，再删去这个点，所以这样一定是最优的。

所以就可以让 $X$ 中所有数为起点， $Y$ 中所有数为终点，跑 bfs，操作代价就是 $|X|+|Y|+2 (dis-1)$（删去 $X$，加入 $Y$，和中途转移）。

```cpp
int n,a[200005],X[200005],Y[200005];
int hd[200005],cnt;
struct E{
	int nxt,to;
}e[700005];
inline void ADD(int u,int v){
	e[++cnt]=(E){hd[u],v};
	hd[u]=cnt;
}
inline void add(int u,int v){
	ADD(u,v);ADD(v,u);
}
int Q[200005],L,R,dis[200005];bool ise[200005];
int bfs(){
	while(L<=R){
		int u=Q[L++];
		if(ise[u])return dis[u];
		for(int i=hd[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(dis[v])continue;
			dis[v]=dis[u]+1;Q[++R]=v;
		}
	}
	return-1;
}
const int N_=200005;
struct SAM{
	int len[N_<<1],link[N_<<1];
	map<int,int>son[N_<<1];
	int hd[N_],Cnt;
	struct E{
		int nxt,to;
	}e[N_];
	inline void Add(int u,int v){e[++Cnt]=(E){hd[u],v},hd[u]=Cnt;}
	int last,cnt;
	inline void clear(Ci x=1){
		if(x==1)last=cnt=1;
		son[x].clear();
		len[x]=link[x]=0;
	}
	inline void copy(Ci x,Ci y){
		son[x]=son[y];len[x]=len[y];link[x]=link[y];
	}
	inline void add(int c){
		int p=last,u=++cnt;last=u;
		clear(u);len[u]=len[p]+1;
		while(p&&!son[p][c])son[p][c]=u,p=link[p];
		if(!p){link[u]=1;return;}
		int q=son[p][c];
		if(len[q]==len[p]+1){link[u]=q;return;}
		int v=++cnt;copy(v,q);len[v]=len[p]+1;link[u]=link[q]=v;
		while(p&&son[p][c]==q)son[p][c]=v,p=link[p];
	}
	inline void build(int*s){
		clear();
		for(;*s;s++)add(*s);
		for(int i=2;i<=cnt;i++)Add(link[i],i);
	}
}g;
int Ans;
inline void ypa(){
	n=read();
	read(a+1,a+1+n);
	for(int i=1;i<n;i++)add(a[i],a[i+1]);
	int p=read();read(X+1,X+1+p);
	int q=read();read(Y+1,Y+1+q);
	g.build(X+1);
	int U=1;
	for(int i=1;i<=q;i++){
		if(g.son[U][Y[i]])++L,U=g.son[U][Y[i]];
		else{
			while(U&&!g.son[U][Y[i]])U=g.link[U];
			if(!U)U=1,L=0;
			else L=g.len[U]+1,U=g.son[U][Y[i]];
		}
		Ans=max(Ans,L);
	}
	if(Ans)return write(p+q-2*Ans);
	L=1;
	for(int i=1;i<=p;i++)Q[++R]=X[i],dis[Q[R]]=1;
	for(int i=1;i<=q;i++)ise[Y[i]]=1;
	cout<<(bfs()-2)*2+p+q<<'\n';
}
signed main(){init();for(int T=1;T;T--)ypa();flush();return 0;}
```

(-- by cjn)