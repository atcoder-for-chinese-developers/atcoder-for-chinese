## 题意

Takahashi 的字典里有 $N$ 个单词，第 $i$ 个单词是 $s_i$。

Takahashi 和 Aoki 会用字典玩单词接龙游戏，游戏规则如下：

- Takahashi 和 Aoki 需要轮流说出字典中的单词，Takahashi 先手。
- 每一个玩家说出的单词的前三个字母必须要与上一个单词的最后三个字母相同，如可以在 `Takahashi` 后接 `ship` 或者 `shield`。 
- 区分单词的大小写，如不能在 `Takahashi` 后接 `ShIp`。
- 不能说出单词的玩家就输了。
- 同样的单词可以被重复说出。

## 数据范围

$1\le N\le 2\times 10^5$ 且 $N$ 是整数。

$s_i$ 是只包含英文字母的字符串，且 $3\le \mid s_i\mid \le 8$。

## 输入格式

第一行一个整数 $N$。

接下来 $N$ 行，每行一个字符串 $s_i$。

## 输出格式

$N$ 行，每行为一个字符串，初始字符串是 $s_i$ 时获胜者的名字，平局输出 `Draw`。

## 样例

### 样例输入 1

```
3
abcd
bcda
ada
```

### 样例输出 1

````
Aoki
Takahashi
Draw
````

### 样例输入 2

```
1
ABC
```

### 样例输出 2

```
Draw
```

### 样例输入 3

```
5
eaaaabaa
eaaaacaa
daaaaaaa
eaaaadaa
daaaafaa
```

### 样例输出 3

```
Takahashi
Takahashi
Takahashi
Aoki
Takahashi
```

## 样例解释

对于样例 1，如果 Takahashi 先说 `abcd`，`Aoki` 说 `bcda`，然后 Takahashi  就输了、

如果 Takahashi 先说 `bcda`，那么 Aoki 就输了。

如果 Takahashi 先说 `ada`，那么双方就会陷入死循环而平局。