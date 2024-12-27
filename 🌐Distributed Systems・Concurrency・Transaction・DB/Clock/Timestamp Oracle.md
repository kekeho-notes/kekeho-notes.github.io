---
aliases:
  - TSO
  - タイムスタンプオラクル
---
- [[Logical Clock]]の一種。Centralizedなタイムスタンプサービス
- インクリメンタルなタイムスタンプ(クロック値)を提供するサーバー
- 単一のサーバーの場合もあれば、レプリケーションされている場合もある
	- 何らかの[[Consensus algorithm]]でクロック値をレプリケーションする方法が主流
		- [[TiDB]]では[[Timestamp Oracle]] を[[Raft]]でレプリケーションしている
		- [[PolarDB-X]]では、[[Paxos]]を使ってレプリケーションしている
	- [[Timestamp as a Service]]ではコンセンサスレスなレプリケーションを実現している
- [[Percolator]] Transaction Modelでよく使われる

## うれしさ
- 一般的な[[Logical Clock|論理クロック]]では、プロセス間でメッセージを伝播することで因果関係を伝えていかないといけないが…TSOであれば、クロックサーバーと通信するだけで一貫したクロック値を得られる。例えばプロセス数が数百個とか数千個だと、ありがたそう

参考
- [https://tikv.org/deep-dive/distributed-transaction/timestamp-oracle/](https://tikv.org/deep-dive/distributed-transaction/timestamp-oracle/)
