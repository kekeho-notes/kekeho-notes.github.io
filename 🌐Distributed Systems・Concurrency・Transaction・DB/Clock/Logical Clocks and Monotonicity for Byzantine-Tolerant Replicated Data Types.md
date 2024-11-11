[#CRDT](CRDT.md) [#Logical_Clock](Logical_Clock) [#論理時計](Logical%20Clock.md) [#Monotonicity](Monotonicity)

- [https://dl.acm.org/doi/10.1145/3642976.3653034](https://dl.acm.org/doi/10.1145/3642976.3653034)
- [[PaPoC]] 2024
- ビザンチン環境下での論理時計の条件を定義
	- 最近のHashgraph作って論理時計作ろう系 ([[Merkle-CRDTs]]とか) の総括
	- 因果的過去が改ざんできない
	- しかし依然として並行を差し込み続けることは可能...なので、全順序なクロックを作ろうと思うと無理がある。あくまで半順序の[[Logical Clock]]用(kekeho)





以下読みながらのメモ
- この論文での用語の定義
	- [[monotonicity]]
		- $f: I \rightarrow O$について、以下の条件を満たすとき$f$は[[monotone]]である
		- $x \le_{I} y \Rightarrow f(x) \le_{O} f(y)$
		- $I, O$は[[Posets]]
		- 複数の入力があるものも同様
		- 順序関係の保存を保証(kekeho)
	- [[inflation]]
		- [[Endomorphism]] $f: I \rightarrow I$は以下の条件を満たすとき[[inflation]]である
		- $x \le_{I} f(x)$
		- 入力値を(型は一緒で)そのままか大きくする関数?(kekeho)
	- $e \in \mathbb{E}$: イベント
	- $r \in R$: レプリカ
	- $t \in \mathbb{T}$: タイムスタンプ
	- $c: \mathbb{E} \rightarrow \mathbb{T}$: クロック関数
	- $e_\bot$: genesis event
	- $post(e) = \{\hat{e} \in \mathbb{E} | \hat{e} \preceq e \}$: 因果的過去。不変
	- $future(e) = \{\check{e} \in \mathbb{E} | e \preceq \check{e}\}$:  因果的未来。不変。
		- 不変…?(kekeho)
[[Byzantine Monotonicity]]
- 従来の[[Logical Clock]]([[Lamport Clock]], [[Vector Clock]]等)はmonotone functionだけど、レプリカがイベントに全順序を割り当てるという仮定があるので、[[Byzantine Fault Tolerant]]とはいえない
	- 協調無しで検証ができない
- ビザンチンレプリカの攻撃ベクトル
	- [[Malformation]]
		- [[confluent]] invariantに違反するメッセージを送る
		- 構文的に不正なメッセージや、無効な署名を持つメッセージを送るなど
		- フィルタリングできるのでヨシ
	- [[Omission]]
		- メッセージを一部のレプリカに送らない
		- [[Gossip]]等を使って状態の収束を図れば問題にならない
	- [[Equivocation]] ← これが厄介
		- 2つの異なる有効な入力を作成し、別々のレプリカに送る
		- 同じタイムスタンプを異なるイベントにつけて、別々のレプリカに送るなど
		- 仮想通貨の[[double spend]]的な? (kekeho)
- [[Replicated Chronicle Problem]]
	- イベントの順序付けはイベントが発生したレプリカによって定義づけられる
	- イベントのcausal pastは、常にoriginレプリカのknowledgeの下界である
		- つまり、イベントを発生させたレプリカ(origin replica)は、そのcausal pastに含まれるすべてのイベントを知っているということ(kekeho)
	- Chronicle:
		- イベントだけでなく、その先行イベントとその間の因果関係も普遍的に含まれる
		- すべてのイベントが、同じGenesisイベントに繋がる
		- 半順序関係がある
			- $C \sube C' \Leftrightarrow \forall e \in C: e \in C' \land past(c \in C) = past(e \in C')$
			- Chronicle CがC'の部分集合であるための必要十分条件は、Cに含まれるすべてのイベントがC'にも含まれており、かつそれぞれのイベントのcausal pastが両方のchronicleで同じであること
	- 効率的で[[Byzantine Fault Tolerant]]な複製を可能にする論理時計関数を見つける
	- Safety
		- [[Chronicality]]: The local state $C_r$ is always a chronicle, i.e., a causal event set that is downward-closed and directed at the minimal event $e_\bot$ of global state $C$
			- $\forall r \in R, \forall e \in C_r:$ (すべてのレプリカ$r$, そのレプリカのChronicleである$C_r$内の全てのイベント$e$、およびグローバルchronicle $C$内の全てのイベント$\bar{e}$において、$e$と$\bar{e}$の関係は以下のいずれかである)
				- $\forall \bar{e} \in C: \quad e \preceq \bar{e} \vee \bar{e} \preceq e \vee e \| \bar{e}$ ($e$と$\bar{e}$の関係は、前後関係 or 並行)
				- $\forall \bar{e} \in C: \quad \bar{e} \preceq e \Longrightarrow \bar{e} \in C_r$ (もし$\bar{e}$が$e$より前であれば、$\bar{e}$も$C_r$に含まれる)
			- $\exists e_\perp \in C:$
				- $\forall \bar{e} \in C: e_\perp \leq \bar{e}$ (これはGenesisイベントの定義)
		- [[Monotonicity]]: Next local chronicle $C'r$は、$C_r$をinflationさせたものである
			- $\forall r \in R: C_r \sube {C'}_r \sube C$
	- Liveness:
		- [[Eventual Delivery]]
