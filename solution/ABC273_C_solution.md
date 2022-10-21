首先可以将题意转化为：求数列中第一大、第二大...第 $n$ 大的数分别有几个，若数的种数不足 $n$ 种，则剩余的都是零。

因为 $a_i$ 的范围是 $10^9$，所以先对 $a$ 数组进行离散化。然后用桶计录每个数的数量，倒序输出，不足的补零即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int n,a[200005],b[200005],t[200005];
signed main(){
	IOS;TIE;
	cin>>n;
	for(int i=1;i<=n;i++) cin>>a[i],b[i]=a[i];
	sort(b+1,b+n+1);
	int cur=unique(b+1,b+n+1)-b-1;
	for(int i=1;i<=n;i++){
		a[i]=lower_bound(b+1,b+cur+1,a[i])-b;
		t[a[i]]++;
	}
	for(int i=cur;i>=1;i--) cout<<t[i]<<endl;
	for(int i=1;i<=n-cur;i++) cout<<0<<endl;
	return 0;
} 
```

