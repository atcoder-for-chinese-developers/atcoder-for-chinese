# Attention / 必读

**Q 群：564841485**

**请务必确保你的翻译和题解没有版权问题，如果涉及抄袭等侵权我们将会删除。同时我们对投稿到这里的翻译和题解保留权利。**

**注意：写完题面/题解后建议在自己仓库里预览，以免出现渲染方式导致的问题。**

除了直接参与网页开发的人给了 owner 以外其他人只给了 member 权限，fork + pull request 方式请[自行学习](https://www.luogu.com.cn/paste/c9atia7m)。（即使是 owner 也建议 fork + PR）

最好不要写一篇就传一篇，建议一批一批来。

如果发现自己的文件没有更新，首先等待 github pages 进行部署（[在自己库中部署的前置操作](https://www.luogu.com.cn/paste/r39mg2gg)），然后刷新，再不行就 Ctrl+F5 清除缓存。

## 临时通知

11.11 更新后贡献格式有较大改变。如果只是想传题解不会对前端做出贡献的同学，可以删除在主团队内的 fork，改到 translations / solutions 仓库下。贡献格式见仓库内 README，仓库网址为：

<https://github.com/atcoder-for-chinese-developers/translations>

<https://github.com/atcoder-for-chinese-developers/solutions>

# AtCoder for Chinese

Atcoder Descripution and Solution for Chinese. Now support both [web](https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/) and [script](https://greasyfork.org/zh-CN/scripts/452449-atcoder-%E4%B8%AD%E6%96%87%E5%8A%A9%E6%89%8B) version.

# Atcoder 中文站

Atcoder 的中文版题解与题面。现在支持[网页版](https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/)和[插件版](https://greasyfork.org/zh-CN/scripts/452449-atcoder-%E4%B8%AD%E6%96%87%E5%8A%A9%E6%89%8B)。

## 如何贡献

### 上传题解、题面方法：

上传一个 Markdown 文件到团队下的 [`translations`（翻译）](https://github.com/atcoder-for-chinese-developers/translations) 或者 [`solution` （题解）](https://github.com/atcoder-for-chinese-developers/solutions) 仓库下。文件名参照对应仓库里的 `README.md` 的内容。

Markdown 文件内写入题解/题面内容，题解没有特定格式要求。

题面格式为：（请按照这个格式上传题面，方便插件渲染；三杠 `---` 为格式需要，请不要删除，并且在其他样例与样例间也添加之）

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

### 由于公式渲染的编码问题，写 .md 的时候，请注意以下问题

- 中文符号后跟着公式的 `$` 时，请在中文符号后加入一个空格。

- 公式中 `<`、`>` 后请加入一个空格。

- 公式中 `\&` 请写成 `\And`。

- ```
  $$
  
  $$
  ```
  
  使用这一语法时，请在前后都加入一个换行。

### 上传标签方法：（beta）

在根目录下 `tags.json` 中添加一项，在末尾添加一项名为 `contestId_problemId` 的数组数据，其中的值参考 [tag list](https://www.luogu.com.cn/paste/2o35avos)（右半部分，带 x 的弃用），值之间以 `,` 分隔，具体格式可参考已有的内容。

建议是，不少题目有不止一种做法，可以都写上去，最大控制在 3 至 4 个。
  

## 待办事项

大项：

- ~~高亮有题解、题面的题目。（完成）~~

- ~~支持 ARC、AGC。（完成）~~

- ~~爬取题目名称。（完成）~~

- ~~给题目打 tag。（完成）~~

- ~~难度区间筛出题目、在中间随机题目。（完成）~~

- ~~添加复现赛功能。（完成）~~


小项：

- 支持爬取 other rated contests 和 other unrated contests。（计划）

- 筛选的表格可排序。（计划）

- ~~比赛每个题有不同的分数。（完成）~~

- ~~题目 tag 筛选由 `input` 改为 `dropdown`。（完成）~~

- ~~去掉 `list.json`，使用团队内用 github action 配置的 translation / solution repo 自动爬取记录。（完成）~~

## 更新日志

- $2022.9.27$ 爬取 ABC。

- $2022.9.28$ 支持难度颜色，支持 markdown 转 html

- $2022.9.29$ 支持高亮有题解、题面的题目，更新难度圆，更新了友链。

- $2022.9.30$ 去除了对题目难度的静态存储，改为爬取 kenkoooo 的 api。

- $2022.10.2$ 更新了 UI。

- $2022.10.4$ 支持了在 AT 中直接看翻译的 [插件](https://github.com/atcoder-for-chinese-developers/notwt-atcoder-for-chinese-helper)

- $2022.10.8$ 对题面和题解格式进行大改，更新了查看题解时的界面。

- $2022.10.10$ 支持 ARC，AGC 题面题解提交，微调了样式。

- $2022.10.12$ 再次修改上传格式，不需要再上传 `.html` 文件。

- $2022.10.14$ 初步 tag 支持，in alpha。

- $2022.10.17$ 投票出了 tag list 暂行版。

- $2022.10.19$ tags in beta。

- $2022.10.20$ 把友链移到了底边栏。

- $2022.10.22$ 对筛选界面进行了更新，增加随机跳题功能。

- $2022.11.10$ 再次修改上传格式，`list.json` 由 Github Actions 自动生成，文件名格式有变。

- $2022.11.17$ 实现初步的导入用户功能。

- $2022.12.28$ 加上了其他比赛的界面显示，给过长的筛选列表加了个页码。

## 友情链接

- [AtCoder](https://atcoder.jp)

- [Kenkoooo AtCoder Problems](https://kenkoooo.com/atcoder/#/user/)

- [Semantic UI](https://semantic-ui.com)

- [Greasy Fork script](https://greasyfork.org/zh-CN/scripts/452449-atcoder-%E4%B8%AD%E6%96%87%E5%8A%A9%E6%89%8B)
