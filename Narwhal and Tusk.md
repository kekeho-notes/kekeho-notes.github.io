- [[DAG]]系[[Consensus algorithm]]
- [[Quorum]]-based [[Byzantine fault tolerant consensus]]を実現するプロトコル
- 従来の[[State Machine Replication]]/[[Consensus algorithm]]と異なり、**トランザクションの伝播**と**順序付け**を**分離**した設計となっている
	- [[Narwhal]]: トランザクションの伝播をする[[Mempool]]. [[Causal History]]を保存する. [[Asynchronous Network]]を仮定
	- [[Tusk]]: [[Consensus algorithm]]

# 論文
- [[EuroSys]]'22
	- https://dl.acm.org/doi/10.1145/3492321.3519594
![[narwhal-and-tusk.pdf]]

## メモ
### 1. Introduction
#### HotStuffの課題
- [[HotStuff]]では、リーダーが提案を収集・ブロードキャストする（3フェーズも!）
	- 大きな（10MBほどある）ブロックを何度も送るなんて、帯域を圧迫する
	- たしかにHotStuffではメッセージ複雑性を減らしているが、大きなブロックをもっと効率的に配信しないと…。
- HotStuff等の課題
	- （多くの[[Partially synchronous system]]を想定した）リーダーに依存するコンセンサスプロトコルは、リーダーのボトルネックがきつい
	- 中規模のコミッティー間でコンセンサスを得る場合、通常のコンセンサスメッセージ（100Byte程度）のサイズと比べてブロックのサイズがクソでかい（10MB）ので、実質メッセージ複雑性のオーダーより定数項（ブロックサイズ）のほうが効いてきてしまう
	- 
- Narwhal and Tuskでは、トランザクションの配信とコンセンサスを分離する
#### 高性能な分散台帳を作るうえでの仮説
- トランザクションを着実に分散させるようなよいMempoolを設計すれば、高性能な台帳ができる
- **コンセンサスプロトコルとMempoolを分離させ、コンセンサスプロトコルは小さなサイズのリファレンスを順序付けることに徹するとよい。これにより、システム全体のスループットはコンセンサスのスループットに制約されなくなる（?）**
	- データそのものを順序付けるのではなく、ポインタを順序づければ、ネットワークの負荷下がるという感じ?（kekeho）
#### [[Narwhal]]
- [[DAG]]ベースの構造化された[[Mempool]]
- トランザクションブロックを[[Causal order]]を保った[[Reliable Broadcast]]する
#### [[Tusk]]
- Fully [[asynchronous]]なコンセンサスプロトコル。一切追加でメッセージを送る必要がない。ローカルDAGを検証することで合意値を決定できる。
- [[DAG Rider]]の拡張らしい

### 2. Overview
#### System Model, goals and assumption
- $n$人のパーティ
- $f < n/3$（$3f < n$）の場合耐える
- Honestな参加者間でのeventually reliable communication linkを仮定
	- メッセージの遅延に上限はない。有限（ただし不明）のメッセージがロストする
	- [[Reliable link]]かつ[[Eventual Delivery]]ということかな?
- [[Narwhal]] Mempoolの定義
	- データ構造
		- ブロック$b$は、トランザクションセットと前のブロックのダイジェスト$d$を持つ
			- ダイジェストによって[[happend-before]]関係が示される（[[推移律]]も成り立つ）
	- Mempoolに対する操作
		- $write(d, b)$: ダイジェスト$d$を持つブロック$b$を格納する
		- $c(d)$: ダイジェスト$d$上の可用性証明書（certificate of availability）を返す。$c(d)$が形成されたときに書き込みが成功したとみなされる。
		- $valid(d, c(d))$: 証明書が有効な場合True、それ以外はFalseを返す
		- $read(d)$: $write(d, b)$が成功している場合に、ブロック$b$を返す
		- $read\_causal(d)$: ブロック集合$B$を返す。$B$の中身は、$\forall b' \in B: b' \rightarrow ... \rightarrow read(d)$。つまり、$d$に対応する$b$またはそれより前におきた（happend-before関係がつながっている）ブロックたち
	- 満たす特性
		- [[Integrity]]: Honestなパーティーによる2回の$read(d)$は、値が返ってくるものについては同じ値を返す
		- [[Block-Availability]]: $write(d, b)$がHonestなパーティーにより成功したあとに、$read(d)$したら、最終的に呼び出しが完了して$b$が返される
		- [[Containment]]（束縛?）: $read\_causal(d)$によって返される$B$のうち、$\forall b' \in B: read\_causal(d') \subseteq B$
		- 2/3-[[Causality]]: 成功した$read\_causal(d)$が返す$B$は、$write(d, b)$される前に成功した書き込み操作によって生成されたブロックの少なくとも2/3を含む
			- 1/3は、まだ含まれていないかもしれない
		- 1/2-[[Chain Quality]]: 成功した$read\_causal(d)$の返す$B$のうち、少なくとも1/2がHonestパーティーによって書き込まれたものである
### 3. Narwhal Core Design
#### 3.1 The Narwhal Mempool
- [[Threshold Logical Clock]]のアイデアに基づくペースメーカーを用いる
- 各Validatorは、現在のローカルラウンド$r \ge 0$を保持する
- 各Validatorは、クライアントから継続的にトランザクションを受取、トランザクションリストに蓄積する
- 各Validatorは、ブロックに対する可用性証明書を受け取り

# 解説
![https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90](https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90)
