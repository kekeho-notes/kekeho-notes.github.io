[#clang](clang) 
- 文字列: `char *`
- `strtol(charptr, &charptr, 10)`が使える
- `long strtol(const char *nptr, char **endptr, int base)`では、数字に変換できる文字列はlongに変換されるが、基数に対して有効でない文字が現れた時点で変換が終了する。そして(endptrがNULLでなければ)最初に現れた不正な文字のポインタが`**endptr`に保存されるため

例
```c
#include <stdio.h>
#include <stdlib.h>

 
int main() {
    char *s = "123hello";
    long value = strtol(s, &s, 10);

    printf("%ld\n", value);  // 123
    printf("%s\n", s);  // hello
}

```

参考
[https://linuxjm.osdn.jp/html/LDP_man-pages/man3/strtol.3.html](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/strtol.3.html)

