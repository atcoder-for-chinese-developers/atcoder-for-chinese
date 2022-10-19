枚举 $i$，钦定 $i$ 是分出来其中一个，那么另一个一定是 $n-i$。

显然，对于 $i(0 < i < n)$ 有 $i>0,n-i>0$，所以 $(i,n-i)$ 是一个合法方案。

并且，若 $i\le 0$，不符合定义； $i\ge n$ ，则 $n-i\le 0$ 同样不行。

所以答案就是 $0 < i < n$ 的 $i$ 的个数，即 $n-1$。

代码：

```cpp
#include<cstdio>
signed main(){
    int a;scanf("%d",&a);
    printf("%d\n",a-1);
    return 0;
}
```