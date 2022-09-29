# atcoder-for-chinese

Atcoder Descripution and Solution for Chinese

# Atcoder 中文版

Atcoder 中文版题解与题面。

## 上传题解、题面方法：

上传 html 文件，格式：

```html
<html lang="en">
<title>ABC269A translation</title>//这里写标题
<script src="https://cdn.jsdelivr.net/npm/texme@1.2.0"></script>
<textarea>

// 这里写markdown

</textarea>
```

注意上传的题面应当尊重原题面，尽量不要有过度化简的题面（即不要把某些转化给翻译出来）。

题解则以官方题解为主，进行翻译，不过个人题解也可以参考。

同时在根目录下 `2.json` 中添加一项，格式是把对应列表中的第 $0$ 项加一，然后在列表末尾添加一个二元组 $[\text{contestId}, \text{problemId}]$。

注意 $\text{problemId}$ 取值范围为 $[0,7]$。

## 还没有实现的功能：

- ~~高亮有题解、题面的题目。~~

- 支持 ARC、AGC。

- 爬取题目名称。

- 给题目打 tag。

- 难度区间筛出题目、在中间随机题目。

# 更新日志

- $2022.9.27$ 爬取 ABC。

- $2022.9.28$ 支持难度颜色，支持 markdown 转html

- $2022.9.29$ 支持高亮有题解、题面的题目，更新难度圆
