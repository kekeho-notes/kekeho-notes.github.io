# 概要
- [[Leaderless Replication]]のアルゴリズム
	- [[Replication]]
- 保証する[[Consistency]]:  [[Linearizability]]を保証
- Local readと同時書き込みを可能にすることで、高スループット・低レイテンシを実現
	- [[Invalidations]]と[[Lamport Clock]]を組み合わせてLocal readとコンフリクトの起きない同時書き込みを実現している
 Aaa
 
# 論文
https://dl.acm.org/doi/10.1145/3373376.3378496
