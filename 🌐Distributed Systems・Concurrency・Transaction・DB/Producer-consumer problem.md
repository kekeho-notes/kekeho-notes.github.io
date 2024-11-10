[#Multiprocessor_Programming](Multiprocessor%20Programming%201.md)

- [[Bounded-buffer problem]]とも
- [[ダイクストラ]]が提起した

- Producer
	- 循環プロセス
	- サイクルを回すたびに、Consumerによって処理されなければならない情報の一部(=アイテム)を生産する
		- バッファにアイテムを追加する
		- バッファがいっぱいのときは、しばらく待機
- Consumer
	- 循環プロセス
	- サイクルを回すたびに、Producerが生産した情報の次の部分を処理することができる
		- バッファからアイテムを取り出して、処理をする
		- バッファが空のときは、しばらく待機
- ProducerとConsumerは、バッファを介して接続されている
- ProducerとConsumerが[[Concurrent]]に動作しているとき、どうやって[[競合状態]]を回避すればよいか? というのがProducer-consumer problem
	- 解決策として、[[Semaphore]]が使われる
参考
- [https://en.wikipedia.org/wiki/Producer–consumer_problem](https://en.wikipedia.org/wiki/Producer–consumer_problem)
