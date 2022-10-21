$10^9$ 的范围用 $\text{map}$ 离散。

记 $mp_i$ 表示第 $i$ 页笔记的最后一个数，$pre_i$ 表示 $i$ 位置前一个数的位置，$a$ 为整个数列，$now$ 为当前位置。然后考虑每一个操作。

对于 `ADD`，直接在 $a$ 中新加一个数，更新一下 $pre$ 和 $now$。

对于 `DELETE`，如果前面有数，就把 $now$ 变成前一个数。

对于 `SAVE `，直接在 $mp$ 中记下当前位置。

对于 `LOAD `，从 $mp$ 中读取一下位置即可。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int T,x,cnt,now,pre[500005],a[500005];
string s;
map<int,int> mp;
signed main(){
	IOS;TIE;
    pre[now]=a[now]=-1;
    cin>>T;
    while(T--){
        cin>>s;
        if(s[0]!='D') cin>>x;
        if(s[0]=='A'){
            pre[++cnt]=now,a[cnt]=x;
            now=cnt;
        }
        else if(s[0]=='D'){
            if(pre[now]>=0) now=pre[now];
        }
        else if(s[0]=='S') mp[x]=now;
        else now=mp[x];
        cout<<a[now]<<" ";
    }
	return 0;
} 
```

