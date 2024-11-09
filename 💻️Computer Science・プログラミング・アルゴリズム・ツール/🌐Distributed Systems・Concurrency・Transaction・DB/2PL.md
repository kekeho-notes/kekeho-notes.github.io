- [[Two phase lock]]
- [[Serializability]]を実現するために使われる
- [[Pessimistic Concurrency Control]]
- Read-Read以外は全部ブロックする
lock
,,
,,
,,

- [[Snapshot isolation]]と異なり、リーダーはライターをブロックする & ライターはリーダーもブロックする

仕組み
- Shared modeのロックと、Exclusive modeのロックがある
	- Shared mode lock
		- 複数のトランザクションが同時に取得できる
		- 他のトランザクションがそのオブジェクトのExclusive mode lockを取得していたら、それを待たないと取れない
	- Exclusive mode lock
		- 排他ロックなので、同時に取得できるトランザクションは1つ
- Readするとき: まずShared modeのロックを取ってから読む
- Writeするとき: まずExclusive mode lockを取ってから書く
- ロックを取得したトランザクションは、トランザクションCommit時(またはAbort時)まで保持し続けないといけない

- [[Phantom]]を発生させないため、lockは、オブジェクト単位だったり、[[predicate lock]]だったり、[[range lock]]だったり

- [[Deadlock]]が起こり得る
