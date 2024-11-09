[#トランザクション](トランザクション) [#トランザクション分離レベル](トランザクション分離レベル.md)	[#Isolation](Isolation.md)
- [[トランザクション分離レベル]]
	- [[ACID]]の[[Isolation]]

- 実現する方法
	- 本当にトランザクションを順次実行する
		- [[VoltDB]]とかはこれらしい
	- [[2PL]]
	- [[Serializable Snapshot Isolation]]

- [[Serializable]] $\subset$ [[Linearizable]]
