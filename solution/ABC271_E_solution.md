设 $f_{i,j}$ 表示当前的边编号构成的序列为 $E_1\ldots E_i$ 的子序列，并且当前路径结束于点 $j$ 的最短路径长度。那么我们有：

- 对于除了 $B_{E_{i+1}}$ 的顶点有：f_{i+1,j}=f_{i,j}（不走当前边）
- 对于 $j=B_{E_{i+1}}$ 有：$f_{i+1,j}=\min(f_{i,j},f_{i,A_{E_{i+1}}}+C_{E_{i+1}})$。

发现 $i$ 这一维没用，去掉就好了。

```C++
#include<bits/stdc++.h>
#define int long long
using namespace std;
int const N=200010,INF=0x3f3f3f3f3f3f3f3fll;
int n,m,k,a[N],b[N],c[N],d[N];
signed main(){
	ios::sync_with_stdio(0);
	cin>>n>>m>>k;
	for(int i=1;i<=m;i++)
		cin>>a[i]>>b[i]>>c[i];
	memset(d,0x3f,sizeof d),d[1]=0;
	for(int i=1,x;i<=k;i++)
		cin>>x,d[b[x]]=min(d[b[x]],d[a[x]]+c[x]);
	cout<<(d[n]<INF?d[n]:-1)<<"\n";
}
```
