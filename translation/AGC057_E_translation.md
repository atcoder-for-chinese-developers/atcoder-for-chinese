## 题意 

对于一个 $H\times W$ 的矩阵 $A=(A_{i,j})(1\le i\le H,1\le j\le W)$，考虑以下操作：

- **行排序**，把每一行排序，也就是对于所有 $i$，将 $A_{i,1},A_{i,2},...,A_{i,W}$ 升序排序。
- **列排序**，把每一列排序，也就是对于所有 $j$，将 $A_{1,j},A_{2,j},...,A_{H,j}$ 升序排序。

已知一个 $H\times W$ 的矩阵 $B=(B_{i,j})$，求有多少个 $H\times W$ 的矩阵 $A$ 满足以下条件，答案对 $998244353$ 取模。

- 对 $A$ 进行行排序，再进行列排序，会得到 $B$。
- 对 $A$ 进行列排序，再进行行排序，会得到 $B$。

## 数据范围

- $1\le H,W\le 1500$
- $0\le b_{i,j}\le 9$
- 对于所有 $1\le i\le H,1\le j\le W-1$，满足 $B_{i,j}\le B_{i,j+1}$。
- 对于所有 $1\le i\le H-1,1\le j\le W$，满足 $B_{i,j}\le B_{i+1,j}$。

## 输入格式

第一行两个数 $H,W$。

接下来 $H$ 行，每行 $W$ 个数，表示 $B$。

## 输出格式

一行一个数，表示答案。

## 样例

### 样例输入1

```
2 2
0 0
1 2
```

### 样例输出1

```
4
```

### 样例解释1

有四个矩阵满足条件，分别是：

$\begin{pmatrix}0&0\\1&2\end{pmatrix},\begin{pmatrix}0&0\\2&1\end{pmatrix},\begin{pmatrix}1&2\\0&0\end{pmatrix},\begin{pmatrix}2&1\\0&0\end{pmatrix}$。

考虑 $\begin{pmatrix}2&1\\0&0\end{pmatrix}$。

- 先行排序，再列排序：$\begin{pmatrix}2&1\\0&0\end{pmatrix} \to \begin{pmatrix}1&2\\0&0\end{pmatrix} \to \begin{pmatrix}0&0\\1&2\end{pmatrix}$。
- 先列排序，再行排序：$\begin{pmatrix}2&1\\0&0\end{pmatrix} \to \begin{pmatrix}0&0\\2&1\end{pmatrix} \to \begin{pmatrix}0&0\\1&2\end{pmatrix}$。

### 样例输入2

```
3 3
0 1 3
2 4 7
5 6 8
```

### 样例输出2

```
576
```

### 样例解释2

$\begin{pmatrix}5&7&6\\3&0&1\\ 4&8&2 \end{pmatrix}$ 是一个满足条件的矩阵。

- 先行排序，再列排序：$\begin{pmatrix}5&7&6\\3&0&1\\ 4&8&2 \end{pmatrix}\to \begin{pmatrix}5&6&7\\0&1&3\\ 2&4&8 \end{pmatrix} \to \begin{pmatrix}0&1&3\\2&4&7\\ 5&6&8 \end{pmatrix}$。
- 先列排序，再行排序：$\begin{pmatrix}5&7&6\\3&0&1\\ 4&8&2 \end{pmatrix}\to \begin{pmatrix}3&0&1\\4&7&2\\ 5&8&6 \end{pmatrix}\to \begin{pmatrix}0&1&3\\2&4&7\\ 5&6&8 \end{pmatrix}$。

### 样例输入3

```
3 5
0 0 0 1 1
0 0 1 1 2
0 1 1 2 2
```

### 样例输出3

```
10440
```

### 样例输入4

```
1 7
2 3 3 6 8 8 9
```

### 样例输出4

```
1260
```