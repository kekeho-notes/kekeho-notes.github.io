[#CRDT](CRDT)

- [https://doi.org/10.1007/978-3-319-26850-7_5](https://doi.org/10.1007/978-3-319-26850-7_5)
- [[δ-CRDT]]の提案論文
- ソースコード
	- [https://github.com/CBaquero/delta-enabled-crdts](https://github.com/CBaquero/delta-enabled-crdts)

Introduction
- Op-based CRDT([[CmRDT]])
	- 以下の2つのフェーズで演算の実行が行われる
		- prepare (多分atSourceのこと(kekeho))
		- effect (多分downstreamのこと(kekeho))
	- Pros
		- シンプル
		- メッセージが小さい(effectのみ)
	- Cons
		- メッセージング機構にReliable excactly-once causal broadcastの保証を求める
			- Broadcastでこの保証をするの、難しそう(kekeho)
		- 全てのノードで個別に操作を実行する必要がある。バッチ処理とかも。
			- 全体的な視点に立つと、効率悪くね? という話なのかな? (kekeho)
- State-Based CRDT ([[CvRDT]])
	- 演算はローカルレプリカの状態に対してのみ実行される
	- マージ操作が[[Join Semilattice]]ならマージできる
	- Pros
		- 信頼性に劣るネットワークレイヤでも動作可能
		- [[Churn]]につよい
		- 他のノードで操作を適用し直さなくていい
	- Cons
		- ステートを送り合うので、メッセージサイズデカすぎる
- データサイズがでかくてもOKなState-Based CRDTを考えるぞ
- キーアイデア
	- 状態全体を送り合うのではなく、Joinの冪等性を維持したまま、状態に対する最近の更新操作のEffectの表現を送り合う
		- ちょっとOp-basedっぽい(kekeho)
	- [[Delta State-based CRDTs]] (δ-CRDT)を導入
		- stateは、複数の細かいstate(delta)の集まり
			- deltaは、[[delta-mutator]]によって生成される
			- δ-mutator: stateに含まれる[[mutator]]sを受け取り、effectを返す
				- stateのmutatorsを受け取って、それに応じて新しい状態に持っていくeffectを動的に生成して返す関数、ということかな? (kekeho)
				- や、Effectってこれ単に結果だな(kekeho)
- State-based CRDTの場合は、マージする際に単にJoinするだけでよかったが、δ-CRDTの場合は難しい
	- ここのデルタがState fragmentsとなり、正しいセマンティクスを維持するためにcausallyにマージされないといけない
	- マージされたデルタが、State-Based CRDTにおける全状態のマージと意味的に等価であるか?

Dalta-State CRDTs
- State-based ([[CvRDT]])では、[[Mutator]]が常に完全なステートを返す
	- 最近発生した変更のみを送り合うとかができない
	- Operation-basedは信頼できる通信が必要
- State-basedの利点(Joinの冪等性・結合性・可換性)を維持しながら、最近のMutationを段階的に生成し符号化することを可能にするンゴ
- [[delta-mutator]]($m^{\delta}(X)$): アップデート操作に対応。$X \in S$を受け取り、[[delta-mutation]]$m^{\delta}(X)$を返す関数
- [[delta-group]]($D$): [[delta-mutation]]またはいくつかの[[delta-group]]の結合として再帰的に定義される
- [[δ-CRDT]]: $(S, M^{\delta}, Q)$のトリプルで構成
	- $S$が[[Join Semilattice]]
	- $M^{\delta}$が[[delta-mutator]]の集合
	- $Q$: クエリ関数の集合
	- 各レプリカ$X \in S$の状態遷移:
		- $X' = X \sqcup m^{\delta}(X) = X \sqcup \delta$
				- Effect($\delta$)は、$\delta = m^{\delta}(X)$で表現される
		- または、受け取ったdelta-groupをJoinしたもの:  $X' = X \sqcup D$
- $\delta$だけを送りあえばOK
- [[δ-CRDT]]における全ての状態遷移は、現在の状態といくつかのJoinの結果だから、Deltaを受け渡せばいいよね〜ってこと? (kekeho)
