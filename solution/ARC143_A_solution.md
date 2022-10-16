钦定 $A\le B\le C$。

一次选择两个数减 $1$ 的操作可以看做：一次全部减 $1$，和选择一个数加 $1$。

所以我们将 $A,B$ 分别加到与 $C$ 相同，再将剩余的减掉，就是最少次数。

不合法的情况就是将 $A,B$ 分别加到与 $C$ 相同后，三个数都变成了负数，即 $C-A+C-B>C$。

否则，因为每次操作 $C$ 都会被减，最小次数就是 $C$。

```cpp
#include<bits/stdc++.h>
using namespace std;
signed main(){
	long long a,b,c;cin>>a>>b>>c;
	if(a>b)swap(a,b);if(b>c)swap(b,c);if(a>b)swap(a,b);
	if(a+b<c)cout<<-1<<'\n';
	else cout<<c<<'\n';
    return 0;
}
```

