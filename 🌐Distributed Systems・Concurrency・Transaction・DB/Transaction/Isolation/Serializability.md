---
aliases:
  - Serializable
  - 直列化可能性
---
- [[Isolation|トランザクション分離レベル]]の一つ(最強)
- トランザクションを順次実行したのと論理的に等価な結果を生成する
	- Serializableな結果の組み合わせは、Concurrentなトランザクション数を$N$としたとき$N!$
- [[Serializability|Serializable]] $\subset$ [[Linearizability|Linearizable]]

# 実現する方法
- 本当にトランザクションを順次実行する
	- [[VoltDB]]とかはこれらしい
- [[2PL]]
- [[Serializable Snapshot Isolation]]