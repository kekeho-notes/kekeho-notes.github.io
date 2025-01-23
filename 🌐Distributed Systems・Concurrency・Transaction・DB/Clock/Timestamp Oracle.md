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
	- [[Timestamp as a Service]]ではコンセンサスプロトコルを使わない。リーダーレスなアプローチが提案されている。
- [[Percolator]] Transaction Modelでよく使われる

## Correctness
- TSOは以下のCorrectnessを提供する (セッション$\sigma$は、時刻$Q_\sigma$に開始し、$A_\sigma$に終了する)
$$ \forall{\sigma, \tau \in \text{Sessions}}: A_{\sigma} \prec Q_{\tau} \Longrightarrow T(\sigma) < T(\tau) $$

## うれしさ
- 一般的な[[Logical Clock|論理クロック]]では、プロセス間でメッセージを伝播することで因果関係を伝えていかないといけないが…TSOであれば、クロックサーバーと通信するだけで一貫したクロック値を得られる。例えばプロセス数が数百個とか数千個だと、ありがたそう
- [[Real-time Order]]があると言えそう
	- [参考?](https://pingcap.co.jp/blog/async-commit-the-accelerator-for-transaction-commit-in-tidb-5-0/)

参考
- [https://tikv.org/deep-dive/distributed-transaction/timestamp-oracle/](https://tikv.org/deep-dive/distributed-transaction/timestamp-oracle/)
