称 Takahashi 为先手，Aoki 为后手。

- 如果对于所有 $A_i$ 都有 $A_i\bmod (X+Y)<  X$。

    先手取哪些堆，后手就取哪些堆。

    所以最后每堆一定剩下 $A_i\bmod (X+Y)$，但是此时先手不能取了，先手必败。

- 如果存在一堆，使得 $A_i\bmod (X+Y)\ge X$。
    - 如果不存在一堆满足 $Y\le A_i\bmod (X+Y) < X$
    
        那么先手可以通过一步，取所有 $A_i\bmod (X+Y)\ge X$ 的堆，转换为后手必败。

        所以这种情况下先手必胜。
    - 如果存在一堆满足 $Y\le A_i\bmod (X+Y) < X$

        如果先手操作 $A_i\bmod (X+Y)\ge X$ 的堆：
        
        - 如果先手取完，后手取 $Y\le A_i\bmod (X+Y) < X$ 的堆
        - 否则，后手取剩余的 $A_i\bmod (X+Y)\ge X$ 的堆。

        否则先手取哪些堆，后手就取哪些堆。

        不难发现，后手必胜。

```cpp
int n,x,y,t,a[200005],g;
inline void ypa(){
    n=read();x=read(),y=read();
    for(int i=1;i<=n;i++){
        int p=read()%(x+y);
        if(p>=x)g=1;
        else if(p>=y)t=1;
    }
    if(!t)return puts(g?"First":"Second");
    puts("Second");
}
```

(-- by cjn)
