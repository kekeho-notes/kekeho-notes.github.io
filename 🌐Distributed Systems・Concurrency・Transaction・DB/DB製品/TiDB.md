[#分散DB](分散DB)
- [[PingCAP]]社が開発
- [[MySQL]]互換

アーキテクチャ
- [[TiDB]]サーバー: MySQLのエンドポイントを提供。SQLレイヤ。
- [[PD]]サーバー: メタデータ管理。各[[TiKV]]ノードの管理をする。トランザクションIDを割り当てる
	- [[Timestamp Oracle|TSO]]): タイムスタンプ割当を担当
- ストレージサーバー
	- [[TiKV]]サーバー: データ保存([[Key-Valueストア]])。行指向。[[OLTP]]向け
	- [[TiFlask]]サーバー: 列指向のストレージエンジン。[[OLAP]]向け
		- TiFlaskにも列指向で保存するから、[[HTAP]] DBなんだろう

参考資料
- アーキテクチャ: [https://docs.pingcap.com/ja/tidb/stable/tidb-architecture](https://docs.pingcap.com/ja/tidb/stable/tidb-architecture)
- [[TLA+]]で実装の形式検証をしているらしい: [https://github.com/pingcap/tla-plus](https://github.com/pingcap/tla-plus)
