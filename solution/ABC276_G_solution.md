原题可以转化为其差分数组没有 $3$ 的倍数。

其生成函数所对应的序列为 $\{0,1,1,0,1,1,0,\cdots\}$ 即 $(x+x^2)/(1-x^3)$。

考虑枚举首项和值域，答案即为
$$
\begin{aligned}
[x^m]\left(\frac{x+x^2}{1-x^3}\right)^{n-1}\frac{1}{(1-x)^2}&=[x^{m-n+1}]\left(\frac{1+x}{1-x^3}\right)^{n-1}\frac{1}{(1-x)^2}\\
&=[x^{m-n+1}]\sum_{i=0}^{n-1}\binom{n-1}{i}x^i\sum_{j\ge 0}\binom{n+j-2}{j}x^{3j}\sum_{k\ge 0}(k+1)x^k\\
&=\sum_{j\ge 0}[x^{m-n+1-3j}]\binom{n+j-2}{j}\sum_{i=0}^{n-1}\binom{n-1}{i}x^i\sum_{k\ge 0}(k+1)x^k\\
&=\sum_{j\ge 0}\binom{n+j-2}{j}\sum_{i=0}^{n-1}\binom{n-1}{i}(m-n+1-3j-i+1)\\
&=\sum_{j\ge 0}\binom{n+j-2}{j}\left((m-n-3j+2)\sum_{i=0}^{n-1}\binom{n-1}{i}+\sum_{i=0}^{n-1}\binom{n-1}{i}(-i)\right)\\
\end{aligned}
$$
预处理后缀和可以做到时间复杂度 $\mathcal O(n+m)$。
