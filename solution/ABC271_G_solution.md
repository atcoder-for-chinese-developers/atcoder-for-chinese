## $n=1$

考虑 $n=1$ 的特殊情况，如何计算答案。

设 $p_i$ 表示青木在第 $i$ 天进入网站的概率，那么也就是要求 $\sum_{i=1}^{\infty} p_i$，但是这个难以计算，我们需要进行数学推导。

假设 $q$ 表示第一天结束没有人访问网站的概率，那么可以得到 $p_i=p_{i-1}\times q$，所以 相当于求 $p_1\times \sum_{i=0}^{\infty} q^i=\frac{p_1}{1-q}$。

那么只需要求出 $p_1$ 即可，求法也很简单，考虑维护一个 $s$ 表示当前还是没有人访问网站的概率，如果当前是青木访问就加上 $s\times Y$ 即可。

## $O(n)$ 做法

直接设 $f_{i,j}$ 表示第 $i$ 次访问网站是在 $j$ 点的概率，显然这个访问网站与天数无关，那么转移到 $i+1$ 时，只需要考虑 $i+1$ 次访问是在几点，然后就可以用上面的方法类似得求出概率了，最后只需要把所有青木进入的时间的 $f_{n,j}$ 加起来即可。

## $O(\log n)$ 做法

上面的 dp 可以发现每一层转移其实都一样，因此可以直接用矩阵快速幂进行优化。

[code](https://atcoder.jp/contests/abc271/submissions/35293402)

一些其他的矩阵快速幂题目：

[AT DP R](https://atcoder.jp/contests/dp/tasks/dp_r)

[ABC256G](https://atcoder.jp/contests/abc256/tasks/abc256_g)

[ABC129F](https://atcoder.jp/contests/abc129/tasks/abc129_f)

