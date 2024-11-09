- [[B-Tree]]の亜種
- [[B-Tree]]は(通常4kbの)ページ単位のブロックが使われる。ページ全体を一度メモリに載せてキャッシュしないといけないけど、そのうち書き換えたり読み出されたりするのはごく一部の領域で、無駄が多い
	- (ページサイズ=レコードサイズであれば、こうした問題は発生しないはず)
	- [[minipage]]と呼ばれるキャッシュ機構を用意
- 性能
	- ![[assets/66d98bc96b66e7001d69d872.png]]
	- [[LSM Tree]]より性能高い
		- LSM-Treeはやっぱりコンパクションが高コストでつらい

minipage
- 可変長のキャッシュ(〜4kb)
	- [[circular buffer]]([[ring buffer]])で実現
- 目的
	- 頻繁にアクセスされるレコードをキャッシュする
	- 最近の更新をバッファリングする
	- [[range gap]](2つのキーの間のレンジ)をキャッシュする

論文
- [Bf-Tree: A Modern Read-Write-Optimized Concurrent Larger-Than-Memory Range Index](https://doi.org/10.14778/3681954.3682012)
	- [[VLDB]] 2024
