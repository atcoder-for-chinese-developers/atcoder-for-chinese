按照题目要求模拟。

注意， $A_i$ 号虫分裂成两条虫的编号虽然为 $2i$ 和 $2i+1$ ，但按照题意，它们在序列中的位置编号是顺延的，详见代码。

还有数组要开两倍大。

AC Code

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int n,m,a[400005],t,x;
signed main(){
	IOS;TIE;
	cin>>n;
	int t=1;
	for(int i=1;i<=n;i++){
		cin>>x;
		a[++t]=a[x]+1,a[++t]=a[x]+1;
	}
	for(int i=1;i<=n*2+1;i++) cout<<a[i]<<' ';
	cout<<endl;
	return 0;
} 

```
