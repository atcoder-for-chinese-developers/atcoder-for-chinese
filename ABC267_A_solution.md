不难发现：

- 星期一距离星期六有 $5$ 天
- 星期二距离星期六有 $4$ 天
- 星期三距离星期六有 $3$ 天
- 星期四距离星期六有 $2$ 天
- 星期五距离星期六有 $1$ 天

特判一下即可。

```cpp
#include<bits/stdc++.h>
using namespace std;
string a;
signed main(){
    cin>>a;
    if(a=="Monday")cout<<"5\n";
    if(a=="Tuesday")cout<<"4\n";
    if(a=="Wednesday")cout<<"3\n";
    if(a=="Thursday")cout<<"2\n";
    if(a=="Friday")cout<<"1\n";
    return 0;
}
```

