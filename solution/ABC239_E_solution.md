发现题目中 $K_i \leq 20$，所以可以对于每一个节点 $i$ 开一个 `vector` 预处理出以 $i$ 为根的子树内第 $1 \sim 20$ 大的权值，查询时直接输出即可。

合并两个 `vector` 可以直接合并后 `sort`，时间复杂度 $\Theta (nk \log k + q)$，也可以归并排序，时间复杂度 $\Theta (nk + q)$。

此题有更优秀的 $\Theta (n \log n)$ 的线段树做法，这里就不在赘述。

AC Code：

```cpp
#include <bits/stdc++.h>

#define rep(i, a, b) for (int i = (a); i <= (b); ++i)
#define lep(i, a, b) for (int i = (a); i >= (b); --i)

const int maxn = 1e5 + 5;

int n, q;
std :: vector <int> G[maxn], vec[maxn];

std :: vector <int> merge(const std :: vector <int> &A, const std :: vector <int> &B) {
    std :: vector <int> C; C.clear();
    for (auto i : A) C.emplace_back(i);
    for (auto i : B) C.emplace_back(i);
    std :: stable_sort(C.begin(), C.end(), std :: greater <int> ());
    C.resize(20); C.shrink_to_fit();
    return C;
}

inline void dfs(int u, int fa) {
    for (auto i : G[u]) {
        if (i == fa) continue; dfs(i, u);
        vec[u] = merge(vec[u], vec[i]);
    }
}

int main() {
    std :: ios_base :: sync_with_stdio(false);
    std :: cin.tie(nullptr);

    std :: istream &fin = std :: cin;
    std :: ostream &fout = std :: cout;
    
    fin >> n >> q;
    rep(i, 1, n) {
        int x; fin >> x;
        vec[i].clear(); vec[i].emplace_back(x);
    }
    rep(i, 1, n - 1) {
        int u, v; fin >> u >> v;
        G[u].emplace_back(v);
        G[v].emplace_back(u);
    }

    dfs(1, 0);
    while (q--) {
        int v, k; fin >> v >> k;
        fout << vec[v][ k - 1 ] << '\n';
    }

    return 0;
}
```