## 由于公式渲染的编码问题，写 .md 的时候，请注意以下问题

- 中文符号后跟着公式的 `$` 时，请在中文符号后加入一个空格。
- 公式中 `<`、`>` 后请加入一个空格。
- 公式中 `\&` 请写成 `\And`。
- ```
  $$
  
  $$
  ```
  使用这一语法时，请在前后都加入一个换行。

# attention / 必读

### Q 群：564841485

注意：写完题面/题解后建议在自己仓库里预览，以免出现渲染方式导致的问题。

~~建议的方式是 fork 以后进行 pull request，不建议直接上传文件。~~

除了直接参与网页开发的人给了 owner 以外其他人只给了 member 权限，fork + pull request 方式请[自行学习](https://www.luogu.com.cn/paste/c9atia7m)。（即使是 owner 也建议 fork + PR）

最好不要写一篇就传一篇，建议一批一批来。

如果发现自己的文件没有更新，首先等待 github pages 进行部署，然后刷新，再不行就 Ctrl+F5 清除缓存。

# atcoder-for-chinese

Atcoder Descripution and Solution for Chinese

# Atcoder 中文版

Atcoder 中文版题解与题面。

## 上传题解、题面方法：

（注意，原来的格式仍然被支持，只是不再建议如此做。推荐使用最新的格式。之后将会把旧格式批量替换为新格式。）

上传一个后缀名为 `.md` 的 markdown 文件到 `translation` （题面翻译）或者 `solution` （题目题解）文件夹下。

该文件文件名格式为 `(比赛编号)_(题目编号)_translation/solution`，比如 `ABC001_A_translation`，`ABC270_Ex_solution`。

md 文件内写入题解/题面内容，格式为：（请按照这个格式上传，方便插件渲染）

（三杠 `---` 为格式需要，请不要删除，并且在其他样例与样例间也添加之）

```markdown

### 题意 

### 数据范围

---

### 输入格式

### 输出格式

---

### 样例输入1

### 样例输出1

### 样例解释1

---

### 样例输入2

### 样例输出2

### 样例解释2

```

同时在根目录下 `list.json` 中添加一项，在末尾添加一个二元组 $[\text{contestId}, \text{problemId}]$。

注意 $\text{problemId}$ 取值范围为 $[0,7]$，分别对应 A ~ Ex/H 题。同时建议参考之前的格式，五个一行对齐。

特别的，F2 编号为 6。

## 还没有实现的功能：

- ~~高亮有题解、题面的题目。~~

- ~~支持 ARC、AGC。~~

- 爬取题目名称。

- 给题目打 tag。

- 难度区间筛出题目、在中间随机题目。

# 更新日志

- $2022.9.27$ 爬取 ABC。

- $2022.9.28$ 支持难度颜色，支持 markdown 转 html

- $2022.9.29$ 支持高亮有题解、题面的题目，更新难度圆，更新了友链。

- $2022.9.30$ 去除了对题目难度的静态存储，改为爬取 kenkoooo 的 api。

- $2022.10.2$ 更新了 UI。

- $2022.10.4$ 支持了在 AT 中直接看翻译的 [插件](https://github.com/atcoder-for-chinese-developers/notwt-atcoder-for-chinese-helper)

- $2022.10.8$ 对题面和题解格式进行大改，更新了查看题解时的界面。

- $2022.10.10$ 支持 ARC，AGC 题面题解提交，微调了样式。

- $2022.10.12$ 再次改变上传格式，不需要再上传 `.html` 文件。

- $2022.10.14$ 初步 tag 支持。

- $2022.10.17$ 投票出了 [tag list 暂行版](https://www.luogu.com.cn/paste/2o35avos)。

# 友情链接

- [AtCoder](https://atcoder.jp)

- [Kenkoooo AtCoder Problems](https://kenkoooo.com/atcoder/#/user/)

- [Semantic UI](https://semantic-ui.com)

- [Greasy Fork script](https://greasyfork.org/zh-CN/scripts/452449-atcoder-%E4%B8%AD%E6%96%87%E5%8A%A9%E6%89%8B)


