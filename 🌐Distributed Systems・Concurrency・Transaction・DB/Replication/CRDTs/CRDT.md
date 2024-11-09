- [[Conflict-free Replicated Data Type]]とも
- コンフリクトせず、複製可能なデータ
- 分散環境において[[CAP定理]]の[[Availability]]と[[Partition-tolerance]]の両立を実現する
	- Cは[[Strong Eventual Consistency]](結果整合性)しかない

- ネットワーク上に異なるバージョンのデータ(レプリカ)を存在させる
- データへの操作を[[可換]]なものだけに限定する
	- 足し算など
	- 操作列がすべて到達すれば、すべてのノードのレプリカは収束する→[[Strong Eventual Consistency]]!

- [[CmRDT]] ([[Operation-Based CRDT]])
	- 操作を送り合う
		- atSource (prepare): ローカルレプリカのみで実行される。操作と現在の状態を調べ、操作を表現するためのメッセージを生成する
		- downstream (effect): リモートで適用される
	- 操作が可換である必要がある
	- 操作列がすべて到達しないと収束しないので、操作が確実に&一度だけ伝わるような信頼性の高いメッセージング機構が必要
- [[CvRDT]] ([[State-Based CRDT]])
![[assets/656c3fec54b4760025e7a319.png]]


- 全体は$(S, M, Q)$のトリプルから構成される
		- $S$: [[Join Semilattice]]なステート
		- $M$: [[Mutator]]の集合。Mutator $m \in M$は、状態$X \in S$を受け取り、新しい状態$X' = m(X)$を返す
			- Mutatorは[インフレーション](https://chat.openai.com/share/80bf2192-01c4-4f0e-8a18-42db83bdfe0d)するように定義される。$X \sqsubseteq m(X)$が成立する
			- Mutator: 例えばカウンタならinc(), dec()など
		- $Q$: クエリ関数の集合。
	- [[Join Semilattice]]なレプリカ自体を送りあい、マージ
	- マージするときに、コンフリクトしているかどうか判定するために[[論理時計]]が使われている?(kekeho)
		- LWW Registerとか、一部のCvRDTはそうっぽいな(kekeho)

- アプリケーション
	- [https://inria.hal.science/inria-00555588/document](https://inria.hal.science/inria-00555588/document)
	- カウンタ
	- 足し算([[G-Set]]: Grow-only Set)
	- 集合
	- Map
	- Register
	- Graph

- CRDTはNon-adversarial(非敵対的)なシナリオで有効
	- [[Byzantine Fault Tolerant]]にした[[Making CRDTs Byzantine fault tolerant]]という論文もある

- 発展形として[[δ-CRDT]]というのもあるらしい

解説
- [https://link.springer.com/chapter/10.1007/978-3-642-24550-3_29](https://link.springer.com/chapter/10.1007/978-3-642-24550-3_29)
- [https://redis.com/blog/diving-into-crdts/](https://redis.com/blog/diving-into-crdts/)
- [https://qiita.com/everpeace/items/bb73ec64d3e682279d26](https://qiita.com/everpeace/items/bb73ec64d3e682279d26)
- [https://inria.hal.science/inria-00555588/document](https://inria.hal.science/inria-00555588/document) 
- [https://archive.org/details/Microsoft_Research_Video_153540](https://archive.org/details/Microsoft_Research_Video_153540)
- [https://github.com/pfrazee/crdt_notes](https://github.com/pfrazee/crdt_notes)
- [https://www.figma.com/ja/blog/how-figmas-multiplayer-technology-works/](https://www.figma.com/ja/blog/how-figmas-multiplayer-technology-works/)
- [https://josephg.com/blog/crdts-are-the-future/](https://josephg.com/blog/crdts-are-the-future/)
- [https://github.com/ipfs/notes/tree/master/CRDT](https://github.com/ipfs/notes/tree/master/CRDT)
- [https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html](https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html)
	- ![](https://www.youtube.com/watch?v=x7drE24geUw)
- [https://www.bartoszsypytkowski.com/the-state-of-a-state-based-crdts/](https://www.bartoszsypytkowski.com/the-state-of-a-state-based-crdts/)
	- [[Replicated Growable Arrays]]の解説
		- [https://www.bartoszsypytkowski.com/operation-based-crdts-arrays-1/](https://www.bartoszsypytkowski.com/operation-based-crdts-arrays-1/)
		- [https://www.bartoszsypytkowski.com/operation-based-crdts-arrays-2/](https://www.bartoszsypytkowski.com/operation-based-crdts-arrays-2/)

実装
- [Automerge CRDT | Automerge CRDT](https://automerge.org/)
	- [[JSON]]
- [Yjs Shared Editing](https://yjs.dev/)
- [[Roshi]]: [https://developers.soundcloud.com/blog/roshi-a-crdt-system-for-timestamped-events](https://developers.soundcloud.com/blog/roshi-a-crdt-system-for-timestamped-events)

アプリケーションで使われているCRDT
- [[Groupware]], [[共同編集]]でけっこう使われる
- [[TreeDoc]]

注意
- CRDTsは書き込みをConflict-freeにしているだけで、読み込みは"annoying"であることが指摘されている
	- [[Early Read]]([[Potato Ferrari Problem]]): [[2P-Set]]のショッピングカートに、ポテトとフェラーリを入れる。その後フェラーリを外し、チェックアウトする。フェラーリを外すより先にチェックアウトが走ると、どっちも買うことになる。全てのDeleteが到着したかどうか、カートは知る由もない。
	- [[Keep CALM and CRDT on]]: 読み取りクエリも[[monotonic]]にするには…という話が整理されている

その他
- CRDTsは[[2 way merge]]

A comprehensive study of CRDTsのまとめ
- [https://inria.hal.science/inria-00555588/document](https://inria.hal.science/inria-00555588/document) 
Introduction
- [[Replication]]にフォーカス
	- 多くの研究では、[[Fault]]があっても、Global total orderを維持することに重点を置いている
	- しかしながら、[[Serialization]]にかかるボトルネックは性能とスケーラビリティに影響を与えている
	- [[CAP定理]]は[[Consistency]](C)と[[Partition-tolerance]](P)のトレードオフを課している
- [[Eventual Consistency]]や[[Optimistic Replication]]という別のアプローチがある
	- レプリカは、非同期で操作を適用し、他のレプリカに送信する
	- バックグラウンドにあるコンセンサスアルゴリズムがコンフリクトを解消する
	- ネットワークの分断(P)にもかかわらず、データのAvailabilityを高めることができる
	- ハイパフォーマンス
	- [[弱い一貫性]]([[Eventual Consistency]])が許容できるアプリケーションもある
	- [[Reconciliation]](コンフリクトの解決?(kekeho))は一般的に困難で、大変です
- [[Eventual Consistency]]に対するシンプルなアプローチとして、CRDTの概念を提案
- CRDTはコンセンサスいらず
- [[Linearizability]]ほしいが、これには一般的にコンセンサスが必要なので、CRDTでは弱い[[Quiescent Consistency]]を考える
- 続きを書こうと思ったけど、めんどくさくなってしまって諦めた(kekeho)
	- [[Delight]]の輪読でやったときにまとめたスライド: [https://blog.kekeho.net/2023/10/23/論文輪読-crdt/](https://blog.kekeho.net/2023/10/23/論文輪読-crdt/)
