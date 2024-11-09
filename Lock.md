[#Mutex](Mutex) [#分散システム](分散システム)
Lockが満たすべき基準
[https://csis.pace.edu/~marchese/CS865/Papers/bershad00289730.pdf](https://csis.pace.edu/~marchese/CS865/Papers/bershad00289730.pdf) より (TODO: 読む(kekeho))

- ロックの取得は、関連するShared dataのすべての更新が完了した後にのみ取得できる
	- ロックへの排他的アクセスは、そのロックへの排他的または非排他的なアクセスを他のプロセスが持たない場合にのみ成功する
- ロックを持つプロセスは常に1つ
- ロックへの非排他的なアクセスは、ロックの関連データの更新を含む、以前の排他的アクセスが完了した場合にのみ許可される
