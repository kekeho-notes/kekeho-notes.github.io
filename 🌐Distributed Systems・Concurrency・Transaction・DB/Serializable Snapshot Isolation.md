[#Serializability](Serializability.md) [#Isolation](Isolation.md) [#トランザクション分離レベル](トランザクション分離レベル.md)	[#トランザクション](トランザクション)

- [[Snapshot isolation]]を拡張して、書き込み間の衝突を検出するアルゴリズムを加えたもの
	- 因果関係を追跡し、トランザクションが古くなったプレミスを基に処理を行ったことを検出し、そのトランザクションを中断させる
