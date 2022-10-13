- 方法一

    把五个数排序，去重，输出去重后的长度。

    ```cpp
    #include<bits/stdc++.h>
    using namespace std;
    int a[5];
    signed main(){
        for(int i=0;i<5;i++)cin>>a[i];
        sort(a,a+5);
        cout<<unique(a,a+5)-a<<'\n';
        return 0;
    }
    ```

- 方法二

    开一个桶，记录桶中的元素个数。

    ```cpp
    #include<bits/stdc++.h>
    using namespace std;
    int x,p[105],ans;
    signed main(){
        for(int i=0;i<5;i++)cin>>x,p[x]=1;
        for(int i=0;i<101;i++)ans+=p[i];
        cout<<ans<<'\n';
        return 0;
    }
    ```

- 方法三

    利用 `std::set` 或 `std::map` 的自动去重。

    ```cpp
    #include<bits/stdc++.h>
    using namespace std;
    int x;set<int>s;
    signed main(){
        for(int i=0;i<5;i++)cin>>x,s.insert(x);
        cout<<s.size()<<'\n';
        return 0;
    }
    ```

    