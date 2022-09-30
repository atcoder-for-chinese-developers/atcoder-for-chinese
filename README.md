# attention

~~建议的方式是 fork 以后进行 pull request，不建议直接上传文件。~~

除了直接参与网页开发的人给了 owner 以外其他人只给了 member 权限，pull request 方式请自行学习。

最好不要写一篇就传一篇，建议一批一批来。

# atcoder-for-chinese

Atcoder Descripution and Solution for Chinese

# Atcoder 中文版

Atcoder 中文版题解与题面。

## 上传题解、题面方法：

上传 html 文件，格式：

```html
<html lang="en">
<title>ABC270Ex translation</title><!-- 记得改标题 ->
<script src="https://cdn.jsdelivr.net/npm/texme@1.2.0"></script>
<textarea>

## 题意

## 数据范围

## 输入格式

## 输出格式

## 样例

### 样例一

## 样例解释
    
</textarea>
```

注意上传的题面应当尊重原题面，尽量不要有过度化简的题面（即不要把某些转化给翻译出来）。

题解则以官方题解为主，进行翻译（需要标注来源和原作者），个人题解也可以上传（建议标注作者）。

同时在根目录下 `2.json` 中添加一项，格式是把对应列表中的**第 $0$ 项加一**，然后在列表末尾添加一个二元组 $[\text{contestId}, \text{problemId}]$。

注意 $\text{problemId}$ 取值范围为 $[0,7]$，**而且千万要记得把第 $0$ 项的数字加一**。

## 还没有实现的功能：

- ~~高亮有题解、题面的题目。~~

- 支持 ARC、AGC。

- 爬取题目名称。

- 给题目打 tag。

- 难度区间筛出题目、在中间随机题目。

# 更新日志

- $2022.9.27$ 爬取 ABC。

- $2022.9.28$ 支持难度颜色，支持 markdown 转 html

- $2022.9.29$ 支持高亮有题解、题面的题目，更新难度圆，更新了友链。

- $2022.9.30$ 更新了 UI。

# 友情链接

- [atcoder](https://atcoder.jp)

- [kenkoooo](https://kenkoooo.com/atcoder/#/user/)
