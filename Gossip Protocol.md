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
		- 全てのサイトは、ランダムに他のサイトを選択して、状態を共有し合って一貫性を維持する
		- Direct mailより更新の伝播が遅い
	- Rumor mongering ← これがGossip
		- 噂話モデル
		- 新しい更新を受け取ると、Hot rumorとして保持し、定期的に他のサイトをランダムに選び送りつける
			- 相手がすでに知っていたら、Hotではないとして伝播をやめていく
## Notation
- $S$: サイトの集合。$|S|  = n$。
- $s \in S$におけるDBのコピーは以下の関数を持つ
	- $s.valueOf: K \rightarrow (v: V \times t: T)$
	- $K$: キーの集合、$V$: 値の集合、$T$: タイムスタンプ
	- $s.valueOf[k] = (NIL, t)$は、$k$に対応する値は削除されたことを示す。
	- 単一キーに絞ると、$s.\text{ValueOf} \in (v: V \times t: T)$
- 全てのサイト間で一貫性がある状態: $\forall s, s': s.\text{ValueOf} = s'.\text{valueOf}$
- 更新操作: $Update[v: V] \equiv s.ValueOf \leftarrow (v, Now)$
## Direct Mail
- 自分のサイトで更新が起きたら、以下をやる
```
FOR EACH s' ∈ S DO
	PostMail[to: s', msg: ("Update", s.ValueOf)]
	ENDLOOP
```
- 更新メッセージ$(\text{"Update"}, (v, t))$を受け取ったサイトは以下をやる
```
IF s.ValueOf.t < t THEN
	s.ValueOf ← (v, t)
```

## Anti-entropy
- 各サイトが以下をやる
- [[Pull型]]、[[Push]]型、[[Push-Pull]]型がある
```
FOR SOME s' ∈ S DO
	ResolveDifference[s, s']
	ENDLOOP

ResolveDifference: PROC[s, s'] = {  // PUSH
	IF s.ValueOf.t > s'.ValueOf.t THEN
		s'.ValueOf ← s.ValueOf
}

ResolveDifference: PROC[s, s'] = {  // PULL
	IF s.ValueOf.t < s'.ValueOf.t THEN
		s.ValueOf ← s'.ValueOf
}

ResolveDifference: PROC[s, s'] = {  // PUSH-PULL
	SELECT TRUE FROM
		IF s.ValueOf.t > s'.ValueOf.t ⇛ s'.ValueOf ← s.ValueOf
		IF s.ValueOf.t < s'.ValueOf.t ⇛ s.ValueOf ← s'.ValueOf
		ENDCASE => NULL
}
```

### 全てのサイトにいきわたるまでに必要なラウンド数
- Push: $log_2(n) + \ln(n) + O(1)$
	- 証明: [Boris Pittel: On Spreading a Rumor](https://doi.org/10.1137/0147013)
