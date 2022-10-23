背包问题。

首先考虑显然的不合法的情况。记起点为第一次移动后的位置（是固定的），终点已给出。记 **给出的横向或纵向总距离** 为 $dx_1,dy_1$ ， **起点与终点间的横向或纵向距离** 为 $dx_2,dy_2$ 。

若 $dx_1<dx_2\ ||\ dy_1<dy_2\ ||$ $(dx_1-dx_2)\mod 2==1\ ||\ (dy_1-dy_2)\mod 2==1$ ，则直接输出 `No`。

然后横向、纵向分别开一个背包，记 $f1,f2$ ，算出横向、纵向移动哪些距离是合法的。若 $!f1[(dx_1-dx_2)\div 2]\ ||\ !f2[(dy_1-dy_2)\div 2]$ ，则说明不能走到，输出 `No`。否则输出 `Yes`。具体可以根据式子理解，其实就是一个多走一点再折返过程。

AC Code

```c++
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
int a[100005],x[100005],y[100005],f1[100005],f2[100005];
int n,nx,ny,t1,t2,n1,n2,s1,s2;
bool fl1=1,fl2=1;
signed main(){
	IOS;TIE;
	cin>>n>>nx>>ny;
	for(int i=1;i<=n;i++) cin>>a[i];
	for(int i=2;i<=n;i++){
		if(i&1) x[++t1]=a[i],s1+=a[i];
		else y[++t2]=a[i],s2+=a[i];
	}
	if((nx+s1-a[1])&1) fl1=0;
	else n1=(nx+s1-a[1])/2;
	if((ny+s2)&1) fl2=0;
	else n2=(ny+s2)/2;
	if(n1<0||n2<0||!fl1||!fl2){
		cout<<"No"<<endl;
		return 0;
	}
	f1[0]=f2[0]=1;
	for(int i=1;i<=t1;i++){
		for(int j=s1;j>=x[i];j--) if(f1[j-x[i]]==1) f1[j]=1;
	}
	for(int i=1;i<=t2;i++){
		for(int j=s2;j>=y[i];j--) if(f2[j-y[i]]==1) f2[j]=1;
	}	
	if(f1[n1]==1&&f2[n2]==1) cout<<"Yes"<<endl;
	else cout<<"No"<<endl;
	return 0;
}
```

