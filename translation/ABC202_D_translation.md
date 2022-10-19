## 题意

在所有含有 $A$ 个 `a` 和 $B$ 个 `b` 的字符串中，找到字典序小 $K$ 大的，输出该串。       

## 数据范围

$1\le A,B\le 30$，      
保证存在第 $K$ 大的串。

## 输入格式

一行三个数 $A,B,K$。
          
## 输出格式

一行一个只包含 `ab` 的字符串。
     

## 样例

### 样例输入1
```
2 2 4
```

### 样例输出1
```
baab
```

### 样例解释1

所有串按照字典序从小到大排序：

`aabb`，`abab`，`abba`，`baab`，`baba`，`bbaa`。

第四大的是 `baab`。

### 样例输入2
```
30 30 118264581564861424
```

### 样例输出2
```
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

