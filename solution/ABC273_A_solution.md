可以直接根据给出的式子求出 $f(1)\sim f(10)$ 的值。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int n,f[15];
signed main(){
	IOS;TIE;
	f[0]=1;
	for(int i=1;i<=10;i++) f[i]=i*f[i-1];
	cin>>n;
	cout<<f[n]<<endl;
	return 0;
} 
```

