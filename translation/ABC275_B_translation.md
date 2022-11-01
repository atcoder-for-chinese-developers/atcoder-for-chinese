### 题意 

给出非负整数 $A,B,C,D,E,F$，保证 $A\times B\times C \ge D\times E\times F$。

你需要求出 $(A\times B\times C) - (D\times E\times F)$ 对 $998244353$ 取模的结果。

### 数据范围

输入的所有数值都是整数。

$0 \le A,B,C,D,E,F\le 10^{18}$

$A\times B\times C \ge D\times E\times F$

---

### 输入格式

一行六个数  $A,B,C,D,E,F$。

```
A B C D E F
```

### 输出格式

输出一个整数表示答案。

---

### 样例输入1

```
2 3 5 1 2 4
```

### 样例输出1

```
22
```

### 样例解释1

$A\times B\times C = 2\times 3\times 5 = 30$，$D\times E\times F = 1\times 2\times 4 = 8$ 。

$((A\times B\times C) - (D\times E\times F))\mod 998244353 = 22 \mod 998244353 = 22$ 。

---

### 样例输入2

```
1 1 1000000000 0 0 0
```

### 样例输出2

```
1755647
```

### 样例解释2

$A\times B\times C = 1000000000$，$D\times E\times F=  0$ 。

$((A\times B\times C) - (D\times E\times F))\mod 998244353 = 1755647$ 。

---

### 样例输入3

```
1000000000000000000 1000000000000000000 1000000000000000000 1000000000000000000 1000000000000000000 1000000000000000000
```

### 样例输出3

```
0
```

### 样例解释3

$((A\times B\times C) - (D\times E\times F))\mod 998244353 = 0 \mod 998244353 = 0$ 。

---

