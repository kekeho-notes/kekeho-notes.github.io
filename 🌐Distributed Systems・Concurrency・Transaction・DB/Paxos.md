[#分散システム](分散システム.md) [#consensus_algorithm](consensus_algorithm)
- 前提条件
	- [[Partially synchronous model]]
	- プロセス間のコミュニケーションはunreliable
		- メッセージの[[Omission failure]], Duplication、リオーダーなどが起こり得る
	- 破損したメッセージは検出できる想定
	- すべての操作は決定論的
	- [[Crash-fault torelant]]

解説
- [https://www.slideshare.net/tyonekura/paxos-63835103](https://www.slideshare.net/tyonekura/paxos-63835103)