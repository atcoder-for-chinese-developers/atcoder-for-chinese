我们先把 $(A_i,B_i)$ 看做一条边，建出无向图。

不难发现，在这张新图中每一个边双连通分量，都可以通过一个哈密顿环在对应图中构造出环。而新图中的桥，在原图中一定是桥。

所以我们只要把这张无向图中每个边双里构造出环。

如果找到哈密顿环，那么构造方法就是：所有边都选 $u\to v+N$， $(u,v)$ 是哈密顿环上的一条边。

不一定要找到哈密顿环，只要分成一个个小环。

可以直接 dfs，按 dfs 到的顺序连边即可（可以看代码），不难发现，这样可以让所有 dfs 树的叶子结点连到一条回根的路径上。

具体实现可以维护一个 `ansx[i]`，表示这条边从什么点出发（从 $A_i$ 还是 $B_i$）。

```cpp
int n,m,a[200005],g,x[200005],y[200005],ansx[200005];
namespace tarjan{
int dfn[200005],low[200005],idx,bel[200005];
int hd[200005],cnt=1;
struct E{
    int nxt,to,w;
}e[400005];
inline void add(Ci u,Ci v,Ci w){
    e[++cnt]={hd[u],v,w};
    hd[u]=cnt;
}
bool bridge[400005];
void tarjan(Ci u,Ci ine){
    dfn[u]=low[u]=++idx;
    for(int i=hd[u];i;i=e[i].nxt){
        int v=e[i].to;
        if(!dfn[v]){
            tarjan(v,i);
            low[u]=min(low[u],low[v]);
            if(low[v]>dfn[u])bridge[i]=bridge[i^1]=1;
        }
        else if(i!=(ine^1))low[u]=min(low[u],dfn[v]);
    }
}
int C;
void dfs(Ci u,Ci fa){
    bel[u]=C;
    for(int i=hd[u];i;i=e[i].nxt){
        int v=e[i].to,id=e[i].w;
        ansx[id]=u;//表示从 u → v+N
        if(bel[v]||bridge[i])continue;
        dfs(v,u);
    }
}
void work(){
    tarjan(1,0);//边双
    for(int i=1;i<=n;i++)
        if(!bel[i])++C,dfs(i,0);//处理每一个块
}
}
inline void ypa(){
    n=read();m=read();
    for(int i=1;i<=m;i++)x[i]=read();
    for(int i=1;i<=m;i++)y[i]=read();
    for(int i=1;i<=m;i++)tarjan::add(x[i],y[i],i),tarjan::add(y[i],x[i],i);
    tarjan::work();
    for(int i=1;i<=m;i++)write((ansx[i]!=x[i]));
}
signed main(){init();for(int T=1;T;T--)ypa();flush();return system("pause"),0;}
```

(-- by cjn)
