### 题意 

给出 $N$ 个字符串 $S_i$ 和 $M$ 个字符串 $T_i$  ，你需要构造一个字符串 $X$， 满足：

- $X$ 是 $S_1\sim S_N$ 的一个排列，其中每两个字符串之间要添加 $1$ 个或多个 `_` 。
- $X$ 的长度介于 $3$和 $16$ 之间。 
- $X$ 不能和任意一个 $T_i$ 相等。

请你输出字符串 $X$ ，或报告无解。

### 数据范围

$1\le N\le 8$

$0\le M\le 10^5$

$1\le ∣Si∣\le 16$ 

$N−1+\sum{∣S_i∣}\le 16$

$S_i\ne S_j\ \text{if}\ i\ne j$

$S_i$ 由小写英文字母组成。

$3\le ∣T_i∣\le 16$

$T_i\ne T_j\ \text{if}\ i\ne j$

$T_i$ 由小写英文字母和 `_` 组成。

---

### 输入格式

第一行输入 $N$ 和 $M$。之后 $N+M$ 行输入 $S_i$ 和 $T_i$。

```
N M
S1
S2
⋮
Sn
T1
T2
⋮
Tn
```

### 输出格式

若有解，输出 $X$ 。否则输出 $-1$ 。 

---

### 样例输入1

```
1 1
chokudai
chokudai
```

### 样例输出1

```
-1
```

### 样例解释1

唯一可组成的 $X$ 是 `chokudai` ，但是和 $T_1$ 重复了。

---

### 样例输入2

```
2 2
choku
dai
chokudai
choku_dai
```

### 样例输出2

```
dai_choku
```

### 样例解释2

`choku__dai` （两个 `_`）这样的字符串也可行。

---

### 样例输入3

```
2 2
chokudai
atcoder
chokudai_atcoder
atcoder_chokudai
```

### 样例输出3

```
-1
```

### 样例解释3

`chokudai__atcoder` 和`atcoder__chokudai` (两个 `_` ) 长度为 $17$，不合法。

---

### 样例输入4

```
4 4
ab
cd
ef
gh
hoge
fuga
____
_ab_cd_ef_gh_
```

### 样例输出4

```
ab__ef___cd_gh
```

