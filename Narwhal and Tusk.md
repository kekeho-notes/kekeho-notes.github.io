- [[DAG]]系[[Consensus algorithm]]
- 従来の[[State Machine Replication]]/[[Consensus algorithm]]と異なり、トランザクションの伝播と順序付けを分離した設計となっている
	- [[Narwhal]]: トランザクションの伝播をする[[Mempool]]. [[Causal History]]を保存する
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
- Narwhal and Tuskでは、トランザクションの配信とコンセンサスを分離する
#### 高性能な分散台帳を作るうえでの仮説
- トランザクションを着実に分散させるようなよいMempoolを設計すれば、高性能な台帳ができる
- コンセンサスプロトコルとMempoolを分離させ、コンセンサスプロトコルは小さなサイズのリファレンスを順序付けることに徹するとよい。これにより、システム全体のスループットはコンセンサスのスループットに制約されなくなる（?）
# 解説
![https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90](https://www.youtube.com/watch?v=K5ph4-7vvHk&list=WL&index=90)
