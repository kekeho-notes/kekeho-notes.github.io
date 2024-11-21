- [[Consensus algorithm]]
- [[Leader-followerモデルのコンセンサスアルゴリズム]]
- 前提条件
	- [[Partially synchronous system]]
	- プロセス間のコミュニケーションはunreliable
		- メッセージの[[Omission fault]], Duplication、リオーダーなどが起こり得る
	- 破損したメッセージは検出できる想定
	- すべての操作は決定論的
	- [[Crash-fault torelant]]

解説
- [https://www.slideshare.net/tyonekura/paxos-63835103](https://www.slideshare.net/tyonekura/paxos-63835103)