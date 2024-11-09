- [https://docs.ipfs.tech/concepts/bitswap/](https://docs.ipfs.tech/concepts/bitswap/)
- [[IPFS]]におけるデータExchangeプロトコル
- 主な機能
	- クライアントから要求されたブロックをネットワークから取得する
	- 持っているブロックを，それを欲している他のピアに送信する

- ファイルがほしいとき，他のピアに`want-lists`を送る
	- `want-list`: ほしいブロックのCIDのリスト
- 各ノードは，他のピアの`want-list`を把握している
	- ブロックを受信するたびに，そのブロックを欲しがっている他のピアがいるかどうかチェックし，欲しがってるピアがいたらそこに送る

Discovery
![[assets/643a535dd3908b001b17ca94.png]]

- ファイルを持ってるピアを見つけたいとき…
	- 自分が接続しているすべてのピアに`want-have`リクエストを送信
		- `want-have`にはファイルのルートブロックのCIDが含まれる([[Merkle Tree]]の根)
	- `want-have`を受信したノードは，持ってたら`have`，持ってなかったら`dont-have`レスポンスを送る
	- どのピアも持ってなかったら，DHTに問い合わせて誰がルートブロックを提供できるか尋ねる
	- want-haveとwant-blockを分けたのはなぜ? 最初からwant-blockを送ればいいのでは(kekeho)
