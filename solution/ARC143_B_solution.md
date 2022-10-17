设 $(i,j)$ 上的数为 $a_{i,j}$。

合法方案数比较难算，让我们统计不合法的方案数。

不难发现，一个不合法方案一定是存在一行和一列满足：这一行的最小值 $=$ 这一列的最大值 $=$ 产生不合法情况的位置的值。

于是有一个初步的容斥想法：枚举有几行、几列的交点不满足条件。

事实上，不可能有多行、多列。

如果当前钦定 $(i,j)$、$(k,l)$ 两个位置不合法。

不难发现：
1. $a_{i,j}< a_{i,l}$
2. $a_{i,j}> a_{k,j}$
3. $a_{k,l}> a_{i,l}$
4. $a_{k,l}< a_{k,j}$

由 1,3 可得 $a_{i,j}<a_{k,l}$，由 2,4 可得 $a_{i,j}>a_{k,l}$，矛盾。

所以不合法的方案数就是：

$$
N^2 \times\binom{N^2}{2N-1}\times \left((N-1)!\right)^2\times \left(N^2-2N+1\right)!
$$

- 第一部分：选出一行、一列。
- 第二部分：选出 $2N-1$ 个数填充不合法的那一行一列
- 第三部分：$2N-1$ 个数中较小的 $N-1$ 个一定在列中，较大的 $N-1$ 个一定在行中，行和列中可以乱排。
- 第四部分：剩余的数可以乱排。

代码：
```cpp
#define Ci const int
Ci M=998244353;
int ans;
int fac[250005],inv[250005];
inline int qp(int a,int m,Ci p=M){
    int ans=1;
    for(;m;a=1ll*a*a%p,m>>=1)if(m&1)ans=1ll*ans*a%p;
    return ans;
}
void Getinv(int N){
    fac[0]=1;
    for(int i=1;i<=N;i++)fac[i]=1ll*fac[i-1]*i%M;
    inv[N]=qp(fac[N],M-2,M);
    for(int i=N-1;i+1;i--)inv[i]=1ll*inv[i+1]*(i+1)%M;
}
inline int C(Ci n,Ci m){
    if(n<m||n<0||m<0)return 0;
    return 1ll*fac[n]*inv[m]%M*inv[n-m]%M;
}
inline int sqr(Ci x){
    return 1ll*x*x%M;
}
signed main(){
    int n=read();
    Getinv(n*n);
    int ans=1ll*n*n*C(n*n,2*n-1)%M*sqr(fac[n-1])%M*fac[n*n-2*n+1]%M;
    write((fac[n*n]-ans+M)%M,'\n');
    return 0;
}
```