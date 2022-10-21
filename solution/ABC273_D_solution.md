首先看到地图的范围是 $10^9$，显然不能用二维数组。但是障碍点很少，所以考虑用 $\text{map}$ 离散化，存下每一个障碍点的行、列信息。每一次移动时，二分找出行走方向会遇到的第一个障碍点的位置，然后判断它和当前行走步数的关系，也就是是否会被阻挡。这样就可以快速得出行动后的位置了。注意一些代码中 $+1$、$-1$ 之类的细节即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
int q,h,w,nx,ny,n,r[500005],c[500005],l;
int cntx,cnty;
set<int> v[500005],t[500005];
map<int,int> H,L;
string s;
signed main(){
	IOS;TIE;
	cin>>h>>w>>nx>>ny;
	cin>>n;
	for(int i=1;i<=n;i++) cin>>r[i]>>c[i];
	for(int i=1;i<=n;i++){
		if(!H[r[i]]) H[r[i]]=++cntx;
		if(!L[c[i]]) L[c[i]]=++cnty;
		v[H[r[i]]].insert(c[i]);
		t[L[c[i]]].insert(r[i]);
	}
	cin>>q;
	while(q--){
		if(!H[nx]) H[nx]=++cntx;
		if(!L[ny]) L[ny]=++cnty;
		cin>>s>>l;
		if(s[0]=='L'){
			if(v[H[nx]].size()){
				auto it=v[H[nx]].upper_bound(ny);
				if(it!=v[H[nx]].begin()){
					--it;
					ny=max(ny-l,(*it)+1);
				}
				else ny=max(ny-l,1ll);	
			}
			else ny=max(ny-l,1ll);
		}
		else if(s[0]=='R'){
			if(v[H[nx]].size()){
				auto it=v[H[nx]].upper_bound(ny);
				if(it==v[H[nx]].end()) ny=min(ny+l,w);
				else ny=min(ny+l,(*it)-1);
			}
			else ny=min(ny+l,w);
		}
		else if(s[0]=='U'){
			if(t[L[ny]].size()){
				auto it=t[L[ny]].upper_bound(nx);
				if(it!=t[L[ny]].begin()){
					--it;
					nx=max(nx-l,(*it)+1);
				}
				else nx=max(nx-l,1ll);
			}
			else nx=max(1ll,nx-l);
		}
		else{
			if(t[L[ny]].size()){
				auto it=t[L[ny]].upper_bound(nx);
				if(it==t[L[ny]].end()) nx=min(nx+l,h);
				else nx=min(nx+l,(*it)-1);
			}
			else nx=min(nx+l,h);
		}
		cout<<nx<<" "<<ny<<endl;
	}
	return 0;
}
```

