[#Serializability](Serializability.md) [#Isolation](Isolation.md) [#トランザクション分離レベル](トランザクション分離レベル.md)	[#トランザクション](トランザクション)
- [[スナップショット分離]]とも
- それぞれのトランザクションが、データベースの一貫性のあるスナップショットから読み取りを行う
	- ここでの一貫性は、因果関係において一貫している、という意味
		- [[Nonrepeatable read]]とかは、因果律に違反が生じている状態での読み取りに当たる
- トランザクションが読み取る値は、すべてそのトランザクションの開始時点でコミット済みだったものだけということを保証
- [[Optimistic Concurrency Control]]

- 「リーダーはライターをブロックせず、ライターはリーダーをブロックせず」
	- 並行するトランザクション間のread-writeは、お互いにブロックしない
	- Snapshot取ってるので、OK
- [[Multiversion Concurrency Controll]]が使われる

- Snapshot Isolationでも、[[Write skew]]は起きる
