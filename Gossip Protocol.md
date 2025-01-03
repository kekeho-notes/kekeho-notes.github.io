---
aliases:
  - Epidemic Protocol, Epidemic Algorithm, Gossip Algorithm
  - ゴシッププロトコル
  - Anti-entropy
  - Rumor mongering
---
# 論文
- [[PODC]]'87: [Epidemic algorithms for replicated database maintenance](https://dl.acm.org/doi/10.1145/41840.41841)

## 概要
- データベースの一貫性維持を信頼性の低いネットワークで行うことは困難
- Randomized algorithmで解決していく
- 以下3つの手法を検討
	- Direct mail
		- 更新は、更新がおきたサイトから他のすべてのサイトへ直ちに送られる
		- 信頼性の低いネットワークでは難しい。(それに、すべてのサイトを知っているとも限らない←[[P2P]]的な仮定)
	- [[Gossip Protocol|Anti-entropy]]
	- Rumor mongering ← これがGossip