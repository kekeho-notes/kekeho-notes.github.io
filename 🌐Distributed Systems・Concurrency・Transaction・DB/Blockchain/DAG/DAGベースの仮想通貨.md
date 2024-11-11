SoK論文を参考に、[[DAG]]ベースの仮想通貨についてまとめる

サーベイ(SoK)論文
- [https://dl.acm.org/doi/10.1145/3576899](https://dl.acm.org/doi/10.1145/3576899)

システムモデル
- [[有向非巡回グラフ]]$\mathcal{G} = (\mathcal{E}, \mathcal{V})$
	- 点集合$\mathcal{V} = \{ u | u \in \{\mathcal{T} \cup \mathcal{B} \cup \mathcal{E} \}\}$
		- $u$はunit。unitは、トランザクション$\mathsf{Tx} \in \mathcal{T}$, ブロック$\mathsf{B} \in \mathcal{B}$, イベント$\mathsf{E} \in \mathcal{E}$としてインスタンス化される
		- ここいらは個別のDAGで異なるということ? まとめてunitとよんでいるということっぽい(kekeho)
	- 辺集合$\mathcal{E} = \{ (u, v) | u \leftarrow v \land \{u, v\} \subseteq \mathcal{V} \}$
		- 2点$u, v$の部分順序関係を表すペア
- unit表現の種類
	- $1^{od}$: ピアからのリクエストを待たずに、受診される度に即座に処理されるリクエスト
		- トランザクション、トリガーイベントなど
	- $2^{od}$: さらなる処理が必要なリクエスト。事前計算、マイナー、バリデータなどによってパッケージ化される
		- ブロックなど
- グラフトポロジーの種類
	- Divergence($\hat D$): Unitがあらかじめ決められた順序を持たずに、予測不能な方向に発散していく
	- Parallel($\hat P$): Unitが複数のチェーンの形で維持される
	- Convergence($\hat C$): Unitが決定的な順序で組織化されている・収束する
		- これ気になる(kekeho)
システムモデルによる分類
,,,
,,,
,,,
$1^{od}$かつConvergenceなやつが気になる(kekeho)

- 台帳モデルによる分類
	- [[UTXO]]-based: すべての操作がAtomicなトランザクションによって完了する。UTXOをたどっていけば残高の計算ができる。
	- [[Account-based]]: ユーザーはアカウント(ステート)を保持して、トランザクションはそのフィールドの変更に用いられる
- 構造による分類
	- In/Out degree: DAGのUnitの結合の仕方。InはUnitの後ろに繋がるUnitの数。OutはUnitの祖先の数。
		- 例: [[IOTA]]: In: x, Out: 2
- コンセンサスの仕組みによる分類
	- Openess: 任意のノードが、Permissionがなくともコンセンサスアルゴリズムを実行できるかどうか。Permission lessかPermissionedかどうか。
		- Permissionless: [[IOTA]], [[Graphchain]], ... 
			- [[IOTA]]ってPermissionlessだっけ? [[coordinator]]の存在があったような(kekeho)
		- Permissoned: [[Swirlds Hashgraph]]
	- Unit allocation: UnitをDAGのどこに位置づけるか?
		- Divergence: [[Blockchain]]におけるheightのような概念に乏しい
		- Parallel: 2次元座標で表せる
		- Convergence: ポジションが決まる
	- Extension rule: DAGの枝をどう拡張していくか? 同点をどう解消するか? (フォークの解消とかを指している)
		- [[Nakamoto Consensus]](最長木を取る)、[[PBFT]], [[Asynchronous Byzantine Agreement]], [[Tip Selection Algorithm]]など

DAGでよく使われるテクニック
- Unitの相互参照によりチェーンをねじれさせて、スループットの向上、高いスケーラビリティ、低いConfirmation時間を狙う
	- Orphan Unitを巻き取りやすい
	- 相互参照とはどういう意味? 相互参照というより、複数の親Unitを指す子が複数いていい感じに束ねてくれている、ということかな? それによってなぜスループット向上、スケーラビリティ向上、Confirmation時間の低減につながる? (kekeho)
- Trusted Authorityを置く
	- [[PBFT]]におけるリーダー、[[IOTA]]における[[Coordinator]]、[[Vite]]における[[Snapshot chain]]、など
- [[Pairwise Vote]]
	- 通常のn-for-1ではなく2-for-1の投票選択
	- [[Pairwise comparison]]のことかな? 勝者が決まらないこともあると思うけど…(kekeho)
	- [[Spectrum]]のコンセンサスで採用
- [[Sharding]]
	- スループットを上げるために複数チェーンに分ける
	- トランザクションのハッシュ値の末尾とかでチェーン割り当てを決めたりする
DAGで用いられるアルゴリズム
- [[Tip selection algorithm]]
	- 祖先となるユニットがどのように後続のトランザクションを選択するか、トランザクションがどのように祖先にアタッチされるか
- [[Recursive algorithm]]
	- 各ラウンドのOutputが徐々に安定した値に近づいていくアルゴリズム群
	- [[Spectre]]の[[Recursive transverse algorithm]], [[Avalanche]]の[[Sampling algorithm]], [[Phantom]]の[[greedy algorithm]]など
- [[Consensus algorithm]]
	- BFT-style
		- [[PBFT]], [[PoW]], [[PoS]]
	- [[Asynchronous Byzantine agreement protocols]], [[Leaderless BFT Protocol]]
		- 線形順序の実現は困難
	- BFT-styleとAsynchronous BAの統合
		- [[Nakamoto Consensus]]とかはこれ。PoW + 最長チェーン選択
- Sorting algorithm
	- 線形順序を決定する

コンセンサスアルゴリズムのProperty analysis
- [[Consistency]], [[Ordering]], [[Finality]]の3つのプロパティを分析
	- [[Consistency]]
		- [[Strict Consistency]]: 正直なノードはそれぞれ、台帳上の与えられたPositionに対して同じ決定を下す。Unitはシステム内で正確に位置づけられる
			- Trusted Authorityがいるモデル、メインチェーンがあるものだと達成しやすい
		- [[Partial Consisntency]]: 関連するノードのみが同じ決定を持ち、関係のないノードの決定はお互いに未知である。関連するトランザクションの数は2〜複数
	- [[Ordering]]
		- [[Topological Ordering]]: 一方向性と非巡回の特性を満たす、頂点の順序
			- [[Transitive]] system: unitからgenesisまでのpathが辿れる
				- [[IOTA]], [[Graphchain]]など
				- そうでないものは、特定のトランザクションまでしか辿れない。[[Pairwise vote]]やる系はこっち
		- [[Linear ordering]]: 線形順序が定まる
			- Blockchainもこれ
			- [[Smart Contract]]を実現するにはこういうのが必要
	- [[Finality]]
		- [[Probablistic Finality]]: システムに追加されたunitは、常に覆される可能性がある
			- 確率: 累積信頼度(信頼度=深さ、スコア、重さ…)に反比例する
			- [[Nakamoto Consensus]]とかはこれ
		- [[Deterministic Finality]]
			- Unitは一度システムに取り込まれると、恒久的にconfirmされる
			- [[PBFT]]とかはこれ
		- DAGベースだと、[[Trusted Roles]]に依存する事が多い
			- TRの選出に色々レパートリーがある

セキュリティ: 攻撃の種類
- [[Parasite chain attack]]: 正直な部分グラフを別の部分グラフに置き換える攻撃
	- [[IOTA]]は[[First Order MCMC]]を使って対処
- [[Balance attack]]([[liveness attack]]): 
- [[Large weight attack]]: 競合するheavyなトランザクションが、最近confirmされたトランザクションを無効にする(heavy: スコア・信頼度・重みが重い)
	- 敵対者が十分なパワーを持っている、Probablistic Finalityの場合に起こる
- [[Censorship attack]]: PermissionedなDAGにおいて、委員会メンバーが談合をする
- [[Sybil attack]]: ノード間でチャネルを切断したり、ネットワーク全体を支配するために複数のIdentityを生成する
- DAGのプライバシー保護も重要な研究課題? あまりない?(kekeho)
	- Bitcoinにおける[[Monero]]や[[ZCash]]みたいなのはあるんだろうか(kekeho)

パフォーマンス
- [[DAGにおけるパフォーマンス評価指標]]:
	- Throughput($\lambda$): ネットワーク上で確認されたunitの最大レート
	- Latency($\tau$): unit propagation time, confirmation timeの2つから構成される
	- Scalability ($\phi$): 多数のノードを追加したときに、どれくらいthroughputを達成できるか

メモ
- 5.1
- iota qubicを調べる
