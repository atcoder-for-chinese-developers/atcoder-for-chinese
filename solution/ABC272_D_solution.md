首先枚举出所有的 $x_i,y_i$ 满足 ${x_i}^2+{y_i}^2=m$ ，这样就可以处理出方向数组。

然后就可以用 $\text{BFS}$ 算走到每个点的最短距离，每个点的答案就是第一次走到它所用的步数。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long 
#define mod 1000000007
#define inf 1e18
using namespace std;
int n,m,a[405][405],x[10005],y[10005],t;
int X[40005],Y[40005],tot;
struct node{
	int x,y,ans;
};
queue<node> q;
signed main(){
	IOS;TIE;
	cin>>n>>m;
	for(int i=0;i<=n;i++){
		for(int j=i;j<=n;j++){
			if(i*i+j*j==m) x[++t]=i,y[t]=j;
		}
	}
	for(int i=1;i<=t;i++){
		X[++tot]=x[i],Y[tot]=y[i],X[++tot]=x[i],Y[tot]=-y[i];
		X[++tot]=y[i],Y[tot]=x[i],X[++tot]=y[i],Y[tot]=-x[i];
		X[++tot]=-x[i],Y[tot]=y[i],X[++tot]=-x[i],Y[tot]=-y[i];
		X[++tot]=-y[i],Y[tot]=x[i],X[++tot]=-y[i],Y[tot]=-x[i];
	}
	for(int i=1;i<=n;i++) for(int j=1;j<=n;j++) a[i][j]=inf;
	a[1][1]=0;
	q.push({1,1,0});
	while(q.size()){
		node k=q.front();q.pop();
		for(int i=1;i<=tot;i++){
			int xx=k.x+X[i],yy=k.y+Y[i];
			if(xx<1||xx>n||yy<1||yy>n||a[xx][yy]!=inf) continue;
			a[xx][yy]=k.ans+1;
			q.push({xx,yy,k.ans+1});
		}
	}
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++){
			if(a[i][j]==inf) a[i][j]=-1;
			cout<<a[i][j]<<' ';
		}
		cout<<endl;
	}
	return 0;
}
```

