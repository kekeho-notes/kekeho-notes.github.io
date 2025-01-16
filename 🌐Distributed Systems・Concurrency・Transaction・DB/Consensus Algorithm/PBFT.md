---
aliases:
  - Practical Byzantine Fault Tolerance
---
# 概要
- [[Byzantine fault tolerant consensus|Byzantine fault tolerant consensus algorithm]]
- [[Nakamoto Consensus]]等と異なり、ノード数Nが頻繁に変動する環境では使えないことに注意
# 仮定
- メッセージの送信者は識別可能(署名等により達成される)
- $N \ge 3f+1$のノードがあるときに、$f$台以上のサーバーが[[ビザンチン故障]]しない限り、安全([[Safety]])
- [[Partially synchronous system]]の仮定のもとで、[[Liveness]]を保証
	- メッセージ遅延が有限
## プロトコル
- 書き込み時に$n - f = 2f + 1$の[[Quorum Certificate]]をもらう
	- このうち、$f$個が書き込んでないのに嘘をついていて、さらに読み取り時に別の$f$個が故障していても、1個は正しい値を持っている

## 性能
-  [[メッセージ複雑性]]: $O(n^2)$
	- [[View change]]: $O(n^3)$
		- カスケード障害が起きていると$O(n^4)$まで悪化する
- レイテンシ: 2-RTT
# 論文
- [[OSDI]] 99 : [https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html)
- 翻訳: [https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html](https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html)
# 実装
- [[Hyperledger Fablic]]のPBFT実装: https://github.com/hyperledger-archives/fabric/tree/master/consensus/pbft
- [[Rust]]による実装: https://github.com/Szymongib/pbft-rust
	- 記事
		- [[Implementing Practical Byzantine Fault Tolerance - Part 1](https://sgibala.com/02-01-implementing-pbft/)](https://sgibala.com/02-01-implementing-pbft/)
		- [Implementing Practical Byzantine Fault Tolerance - Part 2](https://sgibala.com/02-02-implementing-pbft/)
		- [Implementing Practical Byzantine Fault Tolerance - Part 3](https://sgibala.com/02-03-implementing-pbft/)
