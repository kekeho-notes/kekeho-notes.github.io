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
- Honestな参加者間での[[eventually reliable]] communication linkを仮定
	- [[Reliable link]]かつ[[Eventual Delivery]]ということかな?
# 解説
![https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90](https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90)
