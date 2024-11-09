- [[Delay-Tolerant Networking]]
- [[RFC4838]], [[CCSDS]]で標準化されている

- 宇宙で[[TCP]]/[[IP]]は大変
	- [[惑星間通信]]では、パケロス率・レイテンシが非常に高くつく
	- 衛星の移動・Link handoverなども考慮する必要がある
	- 衛星が惑星の裏に隠れていると通信できない
	- ノードが継続的に接続されていることを前提としている(ことが多い)
	- データリンクが対称・双方向であることを前提としている

- [[DTNとTCPの比較]]
	- ![[assets/65f026e9f00f200025e836ab.jpeg]]

	- DTNは[[Store-and-Forward]]でパケットを送る
		- TCP/IPでは再送をソース側でやるけど、DTNはこっち

- [[Bundle Protocol]]と[[Convergence Protocol]]の2つがある
	- [[Bundle Protocol]]: Transport(TCPとか)の上に載る。バンドルの配送を頑張る。インターネットでいうところのIP的な感じ。
	- [[Convergence Protocol]]: DTN環境内での異なるネットワークとのインターフェイスを提供する。

- 用語
	- [[Bundle]]
		- ノードのストレージから別のノードのストレージへと、徐々に(Eventuallyに)パスをたどって配達されていく。
	- [[Bundle Protocol]]に基づいてデータを受信・送信するエンジン。各ノードは[[DTN endpoints]]のメンバー
	- [[DTN endpoints]]: DTNノードの集合。エンドポイント内のノードの最小サブセットがエラー無しでバンドルを受診したときに、BundleはDTNエンドポイントに正常に配信されたとみなされる
	- [[ADU]]s: Application Data Unitsの略。アプリケーションは、[[Bundle Protocol]]の上でADUを運ぶ

