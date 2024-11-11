[#分散システム](分散システム.md)
- [[Practical Byzantine Fault Tolerance]]
	- [[Byzantine Fault Tolerant]]な[[Consensus algorithm]]
	- [[Nakamoto Consensus]]等と異なり、ノード数Nが頻繁に変動する環境では使えないことに注意
- 仮定
	- メッセージの送信者は識別可能(署名等により達成される)
	- $3k+1$のノードがあるときに、$k$台以上のサーバーが[[ビザンチン故障]]しない限り、安全([[Safety]])
	- [[Partially synchronous model]]の仮定のもとで、[[Liveness]]を保証
		- メッセージ遅延が有限

論文
- [[OSDI]] 99 : [https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html)
- 翻訳: [https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html#safety](https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html#safety)
