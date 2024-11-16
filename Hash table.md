# 方式
- [[Closed Addressing]]
	- 要素がLinked Listになっている(=ポインタ使う)ので、キャッシュミスが起きやすい
- [[Open Addressing]]
	- キャッシュに乗りやすいので速い

最良の計算量はO(1)だが、どちらも最悪計算量はO(n)になる
- https://stackoverflow.com/questions/9214353/hash-table-runtime-complexity-insert-search-and-delete

# 参考
- あなたの知らないハッシュテーブルの世界: https://www.docswell.com/s/kumagi/ZGXXRJ-hash-table-world-which-you-dont-know