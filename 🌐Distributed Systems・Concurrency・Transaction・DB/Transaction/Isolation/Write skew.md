[#Isolation](🌐Distributed%20Systems・Concurrency・Transaction・DB/Isolation.md) [#トランザクション分離レベル](🌐Distributed%20Systems・Concurrency・Transaction・DB/Transaction/Isolation/Isolation.md) [#トランザクション](トランザクション)

- 読んでいない値に書き込む際に、他のトランザクションの読んだ値に書き込んでしまう[[Anomaly]]
- [[Snapshot isolation]]のもとで起こる
- ![[assets/671c7e030589e03ab5b30728.png]]
	- T2ではy->xに依存関係があるが、T1ではx->yに依存関係がある
	- 図は[いろんなAnomaly #ポエム - Qiita](https://qiita.com/kumagi/items/5ef5e404546736ebac49#write-skew-anomaly)より
- [[Dirty write]], [[Lost Update]]を一般化させたものと捉えられる
	- 2つのトランザクションが同じオブジェクト群からの読み取りを行い、それらのいくつかを変更する(変更するものが別々でも良い)際に起こるAnomaly
	- 同じオブジェクト更新するという特殊ケースで生じるのが[[Dirty write]], [[Lost Update]]
- Write skewが生じる理由: [[Phantom]]
