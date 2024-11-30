[#Isolation](🌐Distributed%20Systems・Concurrency・Transaction・DB/Isolation.md) [#トランザクション分離レベル](🌐Distributed%20Systems・Concurrency・Transaction・DB/Transaction/Isolation/Isolation.md) [#トランザクション](トランザクション)

- 書き込んだ値が、他のトランザクションによってなかったことにされる[[Anomaly]]。([[Dead step]])
- ![[assets/671c7c61b0332e7f6de91072.png]]
	- この図の例では、T1の書き込みはT2によってなかったことにされる。[[Serializable]]だったら、T1のあとにT2(またはその逆)で、なかったことにはされないのに…
	- 画像は[いろんなAnomaly #ポエム - Qiita](https://qiita.com/kumagi/items/5ef5e404546736ebac49#lost-update) より
- [[Read committed]]で起こり得る。[[Snapshot isolation]]でも起きる。[[Repeatable Read]]では起きない。
- アトミック操作のクエリなどで対処するのが一般的
	- 明示的にロックを取る、トランザクションマネージャーがlost updateを検出するなどもある
- [[CRDT]]であればこれは起きない。[[LWW]]的な操作で起きてしまう問題。
