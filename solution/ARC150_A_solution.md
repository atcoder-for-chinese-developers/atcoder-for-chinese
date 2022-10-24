考虑数出全部的替换方案。

使用前缀和的思想，记 $pre_i$ 表示字符串前 $i$ 位有几个 `1` ， $rev_i$ 表示字符串后 $i$ 位有几个 `1` ， $sum_i$ 表示字符串前 $i$ 位有几个 `1` 和 `?` 。

可以得出，区间 $[l,r]$ 合法，当且仅当 $rev_{r+1}=0\ \text{and}\ pre_{l-1} =0\ \text{and}\ sum_{r} - sum_{l-1}= k$ 。

最后根据数出的数量判断即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
int T,n,k,rev[300005],pre[300005],sum[300005];
string s; 
void solve(){
	cin>>n>>k;
	cin>>s;
	s=' '+s;
	rev[n+1]=0;
	for(int i=1;i<=n;i++){
		sum[i]=sum[i-1]+(s[i]=='?'||s[i]=='1');
		pre[i]=pre[i-1]+(s[i]=='1');
	}
	for(int i=n;i>=1;i--) rev[i]=rev[i+1]+(s[i]=='1');
	int cnt=0,l=1,r=k;
	for(;r<=n;l++,r++){
		if(rev[r+1]==0&&pre[l-1]==0&sum[r]-sum[l-1]==k) cnt++;
	}
	if(cnt==1) cout<<"Yes"<<endl;
	else cout<<"No"<<endl;
}
signed main(){
    IOS;TIE;
    cin>>T;
    while(T--) solve();
    return 0;
}
```