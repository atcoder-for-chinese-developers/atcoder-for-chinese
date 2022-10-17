考虑这棵无根树的一个叶子，如果这个叶子是白色朝上，那么它必须在唯一的它连向的点之前操作，不然它就没有机会变成白色；如果是黑色朝上，那么它必须在唯一的它连向的点之后操作。

可以拓扑排序，设 $f_i$ 表示这个点在拓扑排序中是叶子时，是黑色还是白色。

删掉一个点后，将其连向的那个点的颜色翻转。

如果只剩下最后一个点，并且 $f_i$ 是黑色，那么 G 了。

现在问题转化为：构造一个排列，有一些限制，形如：$x$ 在 $y$ 之前/后出现。你需要使其字典序最小。

用一个堆来拓扑排序即可。

```cpp
const int N_=200000;
int n,q[N_+5],L,R,f[N_+5],vis[N_+5];
char s[N_+5];
template<Ci N_,Ci M_>struct Graph{
	int hd[N_+5],cnt,d[N_+5];
	Graph(){cnt=0;}
	struct E{
		int nxt,to;
	}e[M_+5];
	inline void add(Ci u,Ci v){e[++cnt]={hd[u],v};hd[u]=cnt;d[v]++;}
	inline void Add(Ci u,Ci v){add(u,v);add(v,u);}
};
Graph<N_,N_*2>g;
Graph<N_,N_>e;
inline void topo1(){
	L=1,R=0;
	for(int i=1;i<=n;i++)
		if(g.d[i]==1)q[++R]=i;
	while(L<=R){
		int u=q[L++];f[u]^=(s[u]=='W');
		bool fl=0;vis[u]=1;
		for(int i=g.hd[u];i;i=g.e[i].nxt){
			int v=g.e[i].to;--g.d[v];
			if(!vis[v]){
				fl=1;
				if(f[u])e.add(u,v),f[v]^=1;
				else e.add(v,u);
				if(g.d[v]==1)q[++R]=v;
			}
		}
		if(!fl&&!f[u])puts("-1"),exit(0);
	}
}
priority_queue<int,vector<int>,greater<int>>Q;
void topo2(){
	for(int i=1;i<=n;i++)
		if(!e.d[i])Q.push(i);
	while(!Q.empty()){
		int u=Q.top();Q.pop();
		write(u,' ');
		for(int i=e.hd[u];i;i=e.e[i].nxt){
			int v=e.e[i].to;--e.d[v];
			if(!e.d[v])Q.push(v);
		}
	}
}
inline void ypa(){
	n=read();
	for(int i=1;i<n;i++){
		int x=read(),y=read();
		g.Add(x,y);
	}
	Ges(s+1);
	topo1();topo2();
}
signed main(){init();for(int T=1;T;T--)ypa();flush();return 0;}
```

(-- by cjn)
