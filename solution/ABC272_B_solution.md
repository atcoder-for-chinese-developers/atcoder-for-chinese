按照题意模拟。

用 $vis_{i,j}=0/1$ 表示 $i$ 和 $j$ 是否参加过同一场派对。输入时记录下每一场派对有那些人一起参加过，然后判断即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long 
#define mod 1000000007
using namespace std;
int n,m,k,a[105],vis[105][105];
signed main(){
	IOS;TIE;
	cin>>n>>m;
	while(m--){
		cin>>k;
		for(int i=1;i<=k;i++) cin>>a[i];
		for(int i=1;i<=k;i++){
			for(int j=i+1;j<=k;j++) vis[a[i]][a[j]]=vis[a[j]][a[i]]=1;
		}
	}
	for(int i=1;i<=n;i++){
		for(int j=i+1;j<=n;j++){
			if(!vis[i][j]){
				cout<<"No"<<endl;
				return 0;
			}
		}
	}
	cout<<"Yes"<<endl;
	return 0;
}
```

