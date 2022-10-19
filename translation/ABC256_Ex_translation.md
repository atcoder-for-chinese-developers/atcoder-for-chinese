## 题意

给定 $n,q$ 和一个长度为 $n$ 的数组 $a$。  
然后给定 $q$ 次操作，每行一个 $t$ 表示类型：
- 操作 $1$：给定 $l,r,x$，将 $a_l$ 到 $a_r$ 赋值为 $\lfloor\dfrac{a_i}x\rfloor$
- 操作 $2$：给定 $l,r,x$，将 $a_l$ 到 $a_r$ 赋值为 $x$
- 操作 $3$：给定 $l,r$，输出 $\large\sum_{i=l}^ra_i$

## 数据范围

- $1\le N\le 5\times 10^5$。
- $1\le Q,a_i,x,y\le 10^5$。
- $x\ge 2$。
