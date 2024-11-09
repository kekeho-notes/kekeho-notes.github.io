[#CALM_Theorem](CALM_Theorem) [#CRDT](CRDT)

- [[CALM Theorem]]の記事を[[CACM]]に書いたJ. M. Hellersteinらの論文
- [[VLDB]] 2022: [https://www.vldb.org/pvldb/vol16/p856-power.pdf](https://www.vldb.org/pvldb/vol16/p856-power.pdf)
	- [https://arxiv.org/pdf/2210.12605](https://arxiv.org/pdf/2210.12605)

- [[CRDT]]の保証はデータ更新にのみフォーカスが当てられていて、データのReadは安全ではない
	- [[Early Read]]とかがある
	- マージとかは[[monotonic]]だけど、クエリは[[monotonic]]なものとそうでないものが混ざってるのが問題
- [[CALM Theorem]]の[[monotonicity]]をCRDTに適用して、安全なクエリモデルを作る

クエリの満たすべき性質
- Safety: Queries should be sequentially consistent, regardless of the replica at which they are evaluated
	- これって別に、[[Sequential Consistency]]とは関係ない…? [[monotonic reads]]みたいな話?(kekeho)
- Efficiency: Queries should be evaluated locally without coordination whenever possible
	- whenever possible...(kekeho)
- Simplicity: The query model should be easy for developers to reason about.

- [[Sequential Consistency]]を満たすクエリの例: ローカルレプリカの[[Grow-only Set]]に対して、要素数がnを越えているかチェックするクエリ
	- ローカル状態はグローバル状態のサブセット。[[monotonic]]だ!
- 満たさないクエリの例: [[Potato Ferrari Problem]]([[2P-Set]]の全体集合を取るクエリ)
	- ローカル状態がグローバル状態と等しいことを保証できない限り、ローカル状態がグローバル状態と等しいとはいえない。non-[[monotonic]]なクエリだ!
- Monotone query: a query $Q$ is [[monotone]] if $\forall i, j \in D: i \le j, Q(i) \Rightarrow Q(j)$
	- $D$はState-based CRDTの取りうる状態集合
	- 任意の状態i, jについて、iがjよりも小さいならば、クエリ$Q(i)$が真ならば$Q(j)$も真となる
		- CRDTの状態が進むにつれて、クエリの結果は偽から真になることはあっても、真から偽に変わることはない(kekeho)
	- Safety, Efficiency, Simplicityを満たす
	- monotone queryの合成もまた、monotoneである([[CALM Theorem]]での[[Composability]]の議論)

- CRDTsでは、Non-MonotonicなQueryのみを順序付けてやればよい
