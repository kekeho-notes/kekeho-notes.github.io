- [[State Machine Replication]]のアルゴリズム。[[Asynchronous State Machine Replication]]。[[Crash-fault torelant]]。
- [[EuroSys]] 2024

概要
- [[Raft]]などの[[State Machine Replication]]アルゴリズムは[[Partially synchronous model]]
	- リーダー等の選出のタイミングの仮定に依存しており、パフォーマンスボトルネックが見られる。
		- [[Safety]] Property ([[Strong Consistency]]など)は保証されても、[[Liveness]], [[Availability]]はメッセージ伝送の最大遅延時間の仮定が崩れると達成されない
			- たしかにね(kekeho)
	- フェイルオーバーアルゴリズムも複雑。
- Bandleは[[Leaderless SMR]], [[Asynchronous State Machine Replication]]。
	- [[FLP Theorem]]の通り非同期で[[Safety]], [[Availability]]を両立するのはできないので、乱択アルゴリズムに頼る
- [[Ben-Or's randomized consensus algorithm]]ライクな[[FlashBA]]コンセンサスアルゴリズムを採用

参考
- [https://dl.acm.org/doi/10.1145/3627703.3650091](https://dl.acm.org/doi/10.1145/3627703.3650091)
