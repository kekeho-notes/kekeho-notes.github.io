- [[Google]]が作った、大規模データに対するインクリメンタル処理のためのシステム
- [[Google]]の検索インデックス構築で使われている
- [[TiKV]]の分散トランザクションでもアイデアが使われている

- Percolatorでは、[[Snapshot isolation]]を保証

仕組み
- カラムCは、以下のカラム群に細分化され、[[BigTable]]に載る
	- `c:lock`, `c:write`, `c:data`, `c:notify`, `c:ack_0`
- こんな感じで書かれる
	- example,		,,,
		,,,,
		,,,,
		,,,
	- タイムスタンプ値は[[Timestamp Oracle]]から取る
	- c:notifyは変更されたセルがdirtyであることを示す
	- ユーザーはPercolatorにオブザーバを追加することができ、オブザーバが処理をしたらその時のタイムスタンプをc:ack_0に書く
		- オブザーバのread onceを保証するためという感じかな(kekeho)

write
- [[2PC]]で書く
	1. prewrite
		- [[Timestamp Oracle|TSO]]から取得した`start_ts`で`c:lock`にロックを掛ける
			- ロックのうち、どれか1つがPrimary lockとなり、ほかはSecondary lockとなる?
		- start_tsで`c:data`に値を書き込む
		- 既にロックされている or start_tsより新しいバージョンの値がある場合、書き込み競合なので、現在のトランザクションは[[rollback]]される
			- 単にロックと、データ列の対応する値を削除するだけ
	2. commit
		- [[Timestamp Oracle|TSO]]から`commit_ts`を取得
		- `commit_ts`、`c:write`に書き込む。Primary lockを取る。すべてのSecondary lockに対してもこれを繰り返す
			- PrimaryのCommitが完了すればトランザクションはおしまい。セカンダリロックのコミットが失敗しても問題ない
				- なんで? というか、いまいちprimary lock, secondary lockがわかっていない(kekeho)
- read
	- [[Timestamp Oracle|TSO]]からタイムスタンプ`ts`を取得
	- 読み込もうとしているrowが、$\lbrack 0, ts \rbrack$の範囲でロックされていないかチェック
		- ロックがないか、tsより大きなタイムスタンプでロックされていればOK
	- `c:write`の`commit_ts`が$\lbrack 0, ts \rbrack$の範囲の中で最新のレコードを取得する
		- そこで指している`start_ts`の`c:data`を読む
	- [[lock-free read]]と[[historical read]]を提供

参考
- [https://tikv.org/deep-dive/distributed-transaction/percolator/](https://tikv.org/deep-dive/distributed-transaction/percolator/)
