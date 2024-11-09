資料
- [https://datatracker.ietf.org/meeting/interim-2020-dinrg-01/materials/slides-interim-2020-dinrg-01-sessa-an-overview-of-the-interplanetary-file-system-ipfs.pdf](https://datatracker.ietf.org/meeting/interim-2020-dinrg-01/materials/slides-interim-2020-dinrg-01-sessa-an-overview-of-the-interplanetary-file-system-ipfs.pdf)

まとめてみたスライド
[ipfs_kekeho.pdf](https://scrapbox.io/files/64cb062b7bb361001c1a7ac7.pdf)

- IPFSのPaperを読む
	- [https://arxiv.org/abs/1407.3561](https://arxiv.org/abs/1407.3561)
- 概要
	- InterPlanetary File System
	- P2Pの分散ファイルシステム
		- 特権ノードは存在しない
	- 様々な技術を組み合わせている
		- [[DHT]]
		- インセンティブ付きBlock Exchange
		- Self-certifying Namespace
- 感想
	- いろいろな既存技術をうまく寄せ集めて，いい感じにおもしろシステムを構築していてすごい(kekeho)
		- 0からの新技術を生み出すアタマが自分になくても，こういううまい具合にキュレーションして面白いものをつくることはできるかもしれないという励ましをもらえる(kekeho)
- 疑問
	- IPFSのブートストラップ問題ってどうなっとんのやろ(kekeho)

IPFS Protocol
Identities
- Node ID(Identifier)
	- [[Kademlia]]の問題
		- 攻撃者がIDを無数に作れるとSybilアタックができる
		- 攻撃者がIDを自由に選択できるとEclipseアタックができる
		- IDはノードを認証するものであるべきで，他のノードがIDを詐称できないようにする必要がある
	- 公開鍵をハッシュ関数にかけたものをIDとする．
		- PoWを取り入れる
			- [[SKademlia]]で用いられる暗号パズルを用いる
				- ![[assets/64382064016edd001cdf15e2.png]]

				- Static Puzzles: Node IDが自由に選択できることを阻害する. 図左．
				- Dynamic Puzzles: 膨大な量のNode IDを生成することが複雑であることを保証する．図右．
				- $c_i$は暗号学パズルの複雑さを表す．Difficulty．
					- パズルを作る計算量: $O(2^{c_1}+2^{c_2})$
				- ```ipfs-id-gen,					type Multihash []byte
					type NodeID Multihash
					
					type PublicKey []byte
					type PrivateKey []byte
					
					type Node struct {
						NodeId NodeID
						PubKey PublicKey
						PriKey PrivateKey
					}
					
					difficulty = <integer parameter>
					n = Node{}
					
					do {
						n.PubKey, n.PrivKey = PKI.genKeyPair()
						n.NodeId = hash(hash(n.PubKey))
						p = count_preceding_zero_bits(n.NodeId)
					} while { p < difficulty }
					
					```
				- Multihashフォーマット
					- hash digestの書式は以下．IPFSとしては特定のハッシュ関数に依存したくないので．
					- `<function code><digest length><digest bytes>`
	- ノードが交換するメッセージに署名をつける
		- ノードは署名されたメッセージを受け取ったら．署名を検証し(公開鍵のハッシュ値しか知らないのにどうやって? → IPFSでは公開鍵も一緒に教えてもらうらしい)，パズルが解けたかチェックできる．

Network
	- 他のピアとの接続を管理．
	- トランスポート層
		- IPFSはあらゆるトランスポートプロトコルを使用できる．WebRTC DataChannels, [[uTP]]など．
	- Reliability(信頼性)
		- 下層のネットワークが信頼性を提供しない場合，[[uTP]]や[[SCTP]]などを使えば信頼性が担保できる.
		- 脳筋でリライアビリティを担保したかったらTCPでいいってことだよな?(kekeho)
	- Connectivity(接続性)
		- NATトラバーサルを使える([[ICE]])
	- Integrity(完全性)
		- ハッシュチェックサムを用いて完全性を検証
	- Authenticity(認証)
		- 送信者の公開鍵で[[HMAC]]を使用してメッセージの真正性を検証する
	- IPFSはネットワーク層のプロトコルを規定していない．IP以外でもいい．
		- Multiaddrフォーマット
			- ![[assets/644e2313f96507001c64a516.png]]
			- IPに依存したくないので
			- `ip4/10.20.30.40/sctp/1234`  <- SCTP over IPv4
			- `/ip4/5.6.7.8/tcp/5678/ip4/1.2.3.4/sctp/1234/` <- SCTP over IPv4 proxied over TCP over IPv4
Routing
- 特定のピアのアドレス および オブジェクトを持っているピアを見つけるルーティングシステムが必要．
- [[Coral DSHT]]および[[SKademlia]]ベースの[[DSHT]]で構築されている
- 1KB以下の値はDHTに直接保存される．それ以上はDHTにポインタ(情報を持っているピアのNode ID)を格納する．
- DSHTの持つメソッド
	- `FindPeer(node NodeID)`
		- Node IDのネットワークアドレスを知る
	- `SetValue(key []bytes, value []bytes)`
		- DHTに小さな( <= 1KB )メタデータを格納する
	- `GetValue(key []bytes)`
		- DHTから小さな(<=1KB)メタデータを取得する
	- `ProvideValue(key MultiHash)`
		- このノードがkeyに対応するvalue( >= 1KB)を提供できることを公告する
	- `FindValuePeers(key MultiHash, min int)`
		- keyに対応するvalue ( >= 1KB )を提供できるノード数を知る．minってなんだ…(kekeho)

- [[Kademlia]]との違い
	- Key: 160bit → 256bit
	- k=20のバケットにi=256個保持する
- [[Autonat]]を使ってクライアントとサーバーを区別
	- 新しいピアは、
Exchange
	- [[BitSwap]]プロトコルでブロックを交換する
	- BitSwap Credit
		- タダ乗りされたくない．タダ乗り希望者ばかりだと機能しなくなってしまう．
		- ブロックを提供すると，相手に対する貸しが発生
		- ブロックを提供してもらうと，相手に対する借りが発生
		- ノードは，ピアに対する貸し借り収支をトラッキング
			- バイト単位
		- ノードは債務ノード(受信ブロックのバイト数が送信ブロックのバイト数より大きいノード)には，債務が増えるに従い小さくなる確率関数に従い，確率的にブロックの送信を行う
			- 負債率$r = \frac{\mathrm{bytes\_sent}}{\mathrm{bytes\_recv} + 1}$
			- 送信確率$P(send \ | \ r) = 1 - \frac{1}{1 + exp(6 - 3r)}$ 
				- Deep Learningで出てくるシグモイド関数だね(kekeho)
				- 非線形にする必要があったのはなぜ?(kekeho)
				- ![[assets/643a647f91db64001b9f8b07.png]]
				- 過去に多くのデータを交換したノードにおいては負債率をみて，新規のノードにはとりあえずたくさんデータを送ることになる👍
					- シビル攻撃に対する耐性
	- BitSwap Ledger
		- BitSwap Creditを管理する台帳を保持する
		- BitSwapノードは台帳を交換する
			- 台帳が一致しない場合，台帳はゼロに初期化される
				- 悪意あるフリーライダーノードがわざと初期化しようとしてくる可能性があるので，そういうのは不正行為とみなし，取引を拒否することができる
					- うーん(笑)(kekeho)
	- BitSwap Spec
		- 簡単なプロトコル
			- ```bitswap_protocol,				type BitSwap struct {
					ledgers map[NodeId]Ledger
					active map[NodeId]Peer
					need_list []Multihash
					have_list []Multihash
				}
				
				type Peer struct {
					nodeid NodeId
					ledger Ledger
					last_seen Timestamp  // timestamp of last received message
					want_list []Multihash
				}
				
				interface Peer {
				    open (nodeid :NodeId, ledger :Ledger);
				    
				    send_want_list (want_list :WantList);
				    send_block (block :Block) -> (complete :Bool);
				    close (final :Bool);
				}
				```
Objects
- [[IPLD]]で表現
- Merkle [[DAG]]を形成
	- Merkle DAGは[[Merkle Tree]]によく似ているが、[[Balanced Tree]]でなくてよい
	- これでDHTの上にファイル・ディレクトリを表現
	- コンテンツのアドレス指定ができる
		- ハッシュ値で一意に識別できる
	- 耐タンパ性
		- ハッシュ値を用いることで改ざん・破損検知ができる
	- 重複排除
		- 同じデータは同じハッシュ値になる．同じハッシュ値のものは重複して保存しないことができる
			- キーの順序付けをするから、ということらしい(kekeho)
	- Merkle DAGはより一般化したIPLDに取って代わられて、もう非推奨らしい?(kekeho)
- Object Format
	- ```object,		type IPFSLink struct {
			Name string  // alias
			Hash Multihash
			Size int
		}
		
		type IPFSObject struct {
			links []IPFSLink
			data []byte
		}
		```

- Path
	- Format: `/ipfs/<hash-of-object>/<name-path-to-object>`
		- 例: `/ipfs/XLYkgq61DYaQ8NhkcqyU7rLcnSa7dSHQ16x/foo.txt`
			- これはXLY...がTree．Treeの中のfoo.txtを指す．
- Local Objects
	- 各IPFSクライアントは，ユーザーの要求に応じてローカルに生データを格納する必要がある
	- 要件に応じて以下のストレージに保存される
		- 非永続キャッシュ: インメモリ
		- ファイルシステム，[[LevelDB]]
- Object Pinning
	- 特定のオブジェクトの生存を保証したいノードは，Pinningする
	- そうしないといつしか消えていく
		- データはいつしか消えていくが，データに対するリンクの永続化は保証されているのがおもしろポイント(kekeho)
- Objectの暗号化
	- ```encrypted-object,		type EncryptedObject struct {
			Object []bytes
			Tag []bytes
		}
		
		type SignedObject struct {
			Object []bytes  // raw data
			Signature []bytes  // hmac
			PublicKey []multihash
		}
		```
	- EncryptedObjectはどうやって復号する?(kekeho)
		- 多分相手の公開鍵を知っていることが前提(kekeho)

Files
- Blob
	- 可変サイズのデータブロック
- List
	- ブロックやその他リストのコレクション
- Tree
	- Block，List，Treeのコレクション
- Commit
	- Treeのバージョン管理のスナップショット

- それぞれのデータはJSON(を[protobufsでエンコードしたもの)で表現される
	- 生データ見たかったら，`ipfs object get HASH`

Blob
- [[Blob]]はファイルを表す
- ファイルはListと[[Blob]]の両方で表現できる
- Blobにはリンクがない
- ```blob,	{
		"data": "some data"
	}
	```
List
- 複数のBlobが連結された大きなファイルを表す
	- ファイルは256KBごと分割されて保存されるらしい
		- 分割すれば，異なるファイルでも同じバイト列=同じハッシュ値の部分があるはずで，ネットワーク全体でデータ量を削減できる
		- [https://ipfs-book.decentralized-web.jp/adding_files/#巨大なコンテンツは分割されて保存される](https://ipfs-book.decentralized-web.jp/adding_files/#巨大なコンテンツは分割されて保存される)
- Listには，BlobまたはListの順序付きseqが含まれる
- ```list,	{
	   "data": ["blob", "list", "blob"],
	   // lists have an array of object types as data
	   "links": [
	       { "hash": "XLYkgq61DYaQ8NhkcqyU7rLcnSa7dSHQ16x",
	       "size": 189458 },  // blob
	       { "hash": "XLHBNmRQ5sJJrdMPuu48pzeyTtRo39tNDR5",
	       "size": 19441 },  // list
	       { "hash": "XLWVQDqxo9Km9zLyquoC9gAP8CL1gWnHZ7z",
	       "size": 5286 }  // blob
	   ]
	}
	```

Tree
- ディレクトリを表す
- 名前からハッシュへのマップ
- ```tree,	{
		"data": ["blob", "list", "blob"],
		// trees have an array of object types as data
		"links": [
			{
				"hash": "XLYkgq61DYaQ8NhkcqyU7rLcnSa7dSHQ16x",
				"name": "less", "size": 189458 
			},
			{
				"hash": "XLHBNmRQ5sJJrdMPuu48pzeyTtRo39tNDR5",
				"name": "script", "size": 19441
			},
			{
				"hash": "XLWVQDqxo9Km9zLyquoC9gAP8CL1gWnHZ7z",
				"name": "template", "size": 5286
			}
			// trees do have names
		]
	}
	```

Commit
- Gitと同じようにコミットができるらしい
- いまいちどういうふうに親コミットを指すのかよくわからない(kekeho)

Version Control
- 2つの異なるCommit Objectを比較すると，バージョンの違いがわかる
- で，go-ipfsにバージョン管理をするコマンドある?(kekeho)

File Splitting
- デカいファイルは複数のBlobに分割してListで管理する
	- データの重複部分を削減できる
	- どう分割するかはいろいろありうる
		- LBFSのように[[Rabin Fingerprint]]で適切なブロック境界を選択
			- なんかよくわからんけど[[Rolling Hash]]で被ってる部分を探してほげらほげら…?(kekeho)
		- Rsyncのようにバージョン間で変更されたブロックを検出
			- [https://ja.wikipedia.org/wiki/Rsync](https://ja.wikipedia.org/wiki/Rsync)
	- Go-IPFSでは256KBごとらしい(kekeho)

Path Lookup Performance 
- 各オブジェクトを取得するには，DHTでキーを検索し，ピアに接続し，ブロックを取得する必要がある
- 多くのBlobを持つListとかはオーバーヘッドがでかくて大変なので，うまい具合になんとかする
	- tree caching
		- TreeはBlobsと比べて小さい傾向があるので，なるべくキャッシュする
	- flattened trees
		- 任意のTreeに対して，階層をなくしたフラットなTreeを構築できる→それをキャッシュする?(kekeho)
			- ```flatted-tree,				{
				    "data": ["tree", "blob", "tree", "list", "blob" "blob"],
				    "links": [
				        { "hash": "<ttt222-hash>", "size": 1234
				        "name": "ttt222-name" },
				        { "hash": "<bbb111-hash>", "size": 123,
				        "name": "ttt222-name/bbb111-name" },
				        { "hash": "<ttt333-hash>", "size": 3456,
				        "name": "ttt333-name" },
				        { "hash": "<lll111-hash>", "size": 587,
				        "name": "ttt333-name/lll111-name"},
				        { "hash": "<bbb222-hash>", "size": 22,
				        "name": "ttt333-name/lll111-name/bbb222-name" },
				        { "hash": "<bbb222-hash>", "size": 22
				        "name": "bbb222-name" }
				    ] 
				}
				```

Naming
- ファイルの中身を変えたらハッシュ値が変わるので，「ファイルを変更しても不変なな名前」がつけられない
	- IPFSはコンテンツ指向なんだけど，ロケーション指向なIDを作ろうと思うと難しい
	- Immutableな名前ではなくMutableな名前がほしいね
- Self Certified Names (IPNS)
	- 可変な自己認証された名前を構築する
	- [[SFS]]の命名法を用いる
			- `NodeId = hash(node.PubKey)`
			- `MutableNamespace = /ipns/<NodeId>`
			- `MutableNamespace`に，秘密鍵で署名されたオブジェクトを公開する
		- なるほど(kekeho)
- Human Friendly Names
	- IPNSは人間にとって可読ではない
		- DNSに乗っかる
			- `ipfs.kekeho.net. TXT "ipfs=XLF2ipQ5..."`
		- [[Proquint]]
			- `/ipns/dahih-dolij-sozuk-vosah-luvar-fuluh` = `/ipns/KhAwNprxYVxKqpDZ`


Design and Evaluation of IPFS: A Storage Layer for the Decentralized Web
- [Design and evaluation of IPFS | Proceedings of the ACM SIGCOMM 2022 Conference](https://dl.acm.org/doi/abs/10.1145/3544216.3544232)
- 概要: IPFSの評価論文。
	- IPFSは454kのIPアドレス、2700以上の[[AS]]と152カ国で動いていて、その大半はAWSやAzureの外だった。
	- IPFSの性能を評価したところ、欧州からの検索の3/4は2秒未満で取ってこれた。ゲートウェイキャッシングをすると、リクエストの76%は250ms未満で提供された。
- 感想
	- それなりに実世界でうまく回っていてすごい(kekeho)
- Evaluation
	- 2つのデータセットで評価
		- ![[assets/644ea57bbbee85001c4c5525.png]]
		- Peer Data: クロールされたピアの総数と、そのうちダイアル可能/不可能なピアの割合
		- IPFS Gateway Usage Data: 2022/01/02の単一のゲートウェイのリクエストカウント
	- 地理的分散
		- 198KのIPFSピアと1998kのMultiaddrがDHTにあった
		- 152カ国から464kのIPアドレスがあり、54.5%に到達可能
			- 特定の地域への集中がみられる(中国、米国、欧州など)
			- 90%以上の稼働率を誇るピアは広く分布している(USですら全体の0.3%)
		- パブリックゲートウェイへのリクエスト
			- 59カ国からのリクエスト
			- 米国(50.4%), 中国(31.9%), 香港(6.6%), カナダ (4.4%), 日本(1.7%)
