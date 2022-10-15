## 题意

给出一个长度为 $N$ 的序列 $a$。（ $N$ 为**偶数**）

$a_i$ 的值为原始序列 $b$ 除了 $b_i$ 以外其它所有数的异或和。

求出原始序列 $b$。

## 数据范围

- $2 \leq N \leq 200000$

- $N$ 为**偶数**。

- $0 \leq a_i \leq 10^9$

## 输入格式

第一行输入一个整数 $N$，表示序列长度。

第二行输入 $N$ 个整数 $a_i$，表示序列上的数。

## 输出格式

第一行输出 $N$ 个整数，表示原始序列 $b_i$。

若有多组解输出其中一种即可。

## 样例

### 样例输入1

```
4
20 11 9 24
```

### 样例输出1

```
26 5 7 22
```

### 样例解释1

- $5 \operatorname{xor} 7 \operatorname{xor} 22 = 20$

- $26 \operatorname{xor} 7 \operatorname{xor} 22 = 11$

- $26 \operatorname{xor} 5 \operatorname{xor} 22 = 9$

- $26 \operatorname{xor} 5 \operatorname{xor} 7 = 24$