根据题意直接模拟。

定义 $tmp$ 从 $10$ 到 $10^k$，每次用四舍五入函数计算即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int x,k,tmp=1;
signed main(){
	IOS;TIE;
	cin>>x>>k;
	for(int i=1;i<=k;i++){
		tmp*=10;
		x=(int)round((long double)x/(long double)tmp)*tmp;
	}
	cout<<x<<endl;
	return 0;
} 
```

