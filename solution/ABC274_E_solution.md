看到数据范围考虑状压 $\text{DP}$ 。记 $f_{i,j}$ 表示当前访问状态为 $i$ ，走到第 $j$ 个小镇或宝箱的最短距离。

把小镇和宝箱一起算，每次先求一下当前状态包含几个小镇和几个宝箱，算一下当前速度。然后用 $\text{Floyd}$ 更新最短路即可。如果已经访问了全部小镇，就更新一下答案。

AC Code

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define y1 Cyy520
#define int long long
#define double long double
using namespace std;
double x[25],y[25],f[1<<19][25],ans=1e18,bl;
int n,m,c1,c2,num;
double calc(double x1,double y1,double x2,double y2){
	double d1=x1-x2,d2=y1-y2;
	return sqrt(d1*d1+d2*d2);
}
signed main(){
	IOS;TIE;
	cin>>n>>m;
	for(int i=1;i<=n+m;i++) cin>>x[i]>>y[i];
	for(int i=0;i<(1<<(n+m+1));i++) for(int j=0;j<=n+m;j++) f[i][j]=1e18;
	f[1][0]=0;
	for(int i=1;i<(1<<(n+m+1));i++){
		c1=c2=0;
		for(int j=0;j<n+m+1;j++){
			if(!(i&(1<<j))) continue;
			if(j){
				if(j<=n) c1++;
				else c2++;
			}
		}
		bl=(double)(1<<c2);
		for(int k=0;k<n+m+1;k++){
			if(i&(1<<k)){
				if(c1==n){
					double tmp=calc(0,0,x[k],y[k]);
					ans=min(ans,f[i][k]+tmp/bl);
				}
				for(int j=1;j<n+m+1;j++){
					if(i&(1<<j)) continue;
					double tmp=calc(x[j],y[j],x[k],y[k]);
					f[i|(1<<j)][j]=min(f[i|(1<<j)][j],f[i][k]+tmp/bl);
				}
			}
		}
	}
	cout<<fixed<<setprecision(12)<<ans<<endl;
	return 0;
}

```

