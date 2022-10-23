使用 $\text{double}$ 类型，直接输出即可。

AC Code

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
double x,y;
signed main(){
	IOS;TIE;
	cin>>x>>y;
//	printf("%.3lf\n",y/x);   printf 写法
	cout<<fixed<<setprecision(3)<<y/x<<endl;
	return 0;
} 
```