[https://arxiv.org/abs/2004.00107](https://arxiv.org/abs/2004.00107)
![](https://www.youtube.com/watch?v=XGehT8tNuWw)


- [[Merkle Tree]]に[[CRDT]]オブジェクトを埋め込む
	- [[Merkle Tree]]: データの解決／発見と自己検証を行うことができる
	- [[CRDT]]: [[Consensus algorithm]]を必要とせずにグローバルな状態収束を可能にする([[Strong Eventual Consistency]])
	- Merkle Tree x CRDT: 両者の特性を活かして、DAGを論理的な時計(タイムスタンプ? (kekeho))とすることができる

Contributions
- [[Merkle Clock]]
	- Merkle DAGベースの論理時計
	- CRDTで活用されるバージョンベクタ・[[Logical Clock]]のかわりに、Merkle Treeが使えることを示すンゴ
- Merkle-CRDTs
	- CRDTのペイロードのための汎用トランスポート・永続化レイヤ

詳細
Merkle Clock
- DAGは(ブロックチェーンでの使用例のように)因果関係を表すのにも使える
	- Tx AがTx Bに先行する([[happend-before]])を表現できる
- Merkle Clock $M$は、各ノードがEventを表すMerkle DAGである
- $M_{\alpha}$と$M_{\beta}$は以下の手順でマージできる ($\alpha, \beta$は[[CID]], TreeのRoot)
	- $\alpha = \beta$の場合: 同じDAGなので何もしなくていい
	- $\alpha \in M_{\beta}$の場合: $M_\alpha$の履歴はすでにその一部なので、$M_\beta$を残す (その逆もしかり)
		- これで[[happend-before]]がわかるね
	- それ以外: 全然別の不連続なDAGなので、$\alpha, \beta$という2つのノードを子に持つ$\gamma$を作る(マージ)
		- これで[[並行]]がわかるね
- ↑より、Merkle Clockは因果関係情報を含んでいるといえる。Merkle DAGがたしかに[[Logical Clock]]として使える
	- Strict Partial Orderなので、全部のイベントについて前後がわかるわけではない、並行も存在することに注意。
- Merkle Clock DAGは[[G-Set]] CRDTとみなせるので、収束するンゴ
	- (ちゃんとした証明は元論文にある)

Merkle CRDTs
- ノードが任意のCRDTペイロードを持つMerkle-Clock
	- CRDTペイロード: CRDTのOperationとかStateを指す
	- Partial Orderなので、ディスオーダーが起きない👍
- Operation BasedなCRDTに向いてる。Stateもできるけど、ノードにStateを埋め込むことになるので、大きくなっちゃってどうだろねー
- 論文にはアンチエントロピーアルゴリズムの紹介もある

DAG-Syncer Component
- レプリカが[[CID]]を与えられた他のレプリカからリモートでMerkle DAGのノードを取得するコンポーネント
- 以下のメソッドを持つ
	- `Get(CID): Node`
	- `Put(Node)`
Broadcaster Component
- 以下のメソッドを持つ
	- `Broadcast(Data)`

- DAG-SyncerとBroadcasterとして、[[IPFS]]が使える
	- IPFSはDAG-Syncerとして動作し、[[libp2p]]層が提供するPubSub機構の一つがBroadcastを担当する

限界と最適化
- DAGがどんどん大きくなってしまう


アプリケーション
- Markle-CRDTsで分散[[KVS]]とか作れちゃう
	- [[PeerPad]]
	- [[OrbitDB]]
		- 多分Read/Write等の順序付けにCRDTを使ってる?(要調査)(kekeho)
