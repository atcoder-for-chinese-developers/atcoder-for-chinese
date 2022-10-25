首先，两个数和为偶数，要不是奇数加奇数，要不是偶数加偶数。

题目要求最大，所以就分别求出数列中最大、次大的奇数、偶数，然后分类讨论即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long 
#define mod 1000000007
using namespace std;
int n,a,mxo=-1,smxo=-1,mxj=-1,smxj=-1;
signed main(){
	IOS;TIE;
	cin>>n;
	while(n--){
		cin>>a;
		if(a&1){
			if(a>mxj) smxj=mxj,mxj=a;
			else if(a>smxj) smxj=a;
		}
		else{
			if(a>mxo) smxo=mxo,mxo=a;
			else if(a>smxo) smxo=a;
		}
	}
	if(smxj==-1&&smxo==-1) cout<<-1<<endl;
	else if(smxj==-1) cout<<mxo+smxo<<endl;
	else if(smxo==-1) cout<<mxj+smxj<<endl;
	else cout<<max(mxo+smxo,mxj+smxj);
	return 0;
}
```

