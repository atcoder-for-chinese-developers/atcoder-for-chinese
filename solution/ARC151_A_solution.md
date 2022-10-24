$s$ 串和 $t$ 串相等的位置，答案串放 $0$ 肯定更优。

然后考虑不相等的位置。分别统计出 $s$ 为 `1`， $t$ 为 `0` 的位数 $c_1$ 和 $s$ 为 `0`， $t$ 为 `1` 的位数 $c_2$ 。 若两者之和为奇数则显然无解，否则就要选答案串中 $|c_1-c_2|\div 2$ 个位置放 `1` 。

可以用 $s$ 为基准串，根据 $c_1$ 和 $c_2$ 的大小关系得出 $s$ 为 `0` 的位放 `1` 还是 $s$ 为 `1` 的位放 `1`。然后从后往前，可以改的就放 `1` ，直到改满所需的个数。这样能保证字典序最小。

AC Code：

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
string a,b;
int n,c1,c2,id,fl,ans[200005],tot;
signed main(){
	IOS;TIE;
	cin>>n>>a>>b;
	for(int i=0;i<n;i++){
		if(a[i]=='1'&&b[i]=='0') c1++;
		else if(a[i]=='0'&&b[i]=='1') c2++;
	}
	if((c1+c2)%2){
		cout<<-1<<endl;
		return 0;
	}
	int tmp=abs(c1-c2)/2;
	if(c1>c2) fl=1;
	for(int i=n-1;i>=0;i--){
		if(a[i]!=b[i]){
			if(a[i]-'0'==fl&&tmp) ans[i]=1,tmp--;
		}
	}
	for(int i=0;i<n;i++) cout<<ans[i];
	cout<<endl;
	return 0;
} 
```