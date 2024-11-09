[https://docs.libp2p.io/concepts/nat/autonat/](https://docs.libp2p.io/concepts/nat/autonat/)
[https://github.com/libp2p/specs/blob/master/autonat/README.md](https://github.com/libp2p/specs/blob/master/autonat/README.md)

- [[libp2p]]が実装している、ノードがNATの後ろにいるかどうか判断するプロトコル
	- すげーシンプル(kekeho)

- P2Pシステムに於いて、NATの裏にいて到達不可能なアドレスを広告すると、他のノードがそのアドレスにダイヤルしようとして失敗し、無駄なリソースを消費してしまう。→ NATの裏にいるかどうか判別する必要

プロトコル
(ノードが、自身がNATの裏にいるかどうか確かめたいシーン)
- ノードはMultiaddrのリストを含む`Dial`メッセージを他のピアに送る
- ピアはそれらのアドレスへ接続を試みる
- 少なくとも1つの接続が成功した場合、StatusがSUCCESSな`DialResponse`を返す
- 失敗した場合、StatusがERRORなDialResponseを返す
- ノードはDialResponseを見て自身がNATのうらにいるかチェックできる

P2Pシステムにおいて、こんな感じでやるとよい
- NATのうらにいるノード
	- プライベートアドレスを広告しない
	- リレーにつなげて、リレーのアドレスをアドバイスする
- パブリックなノード
	- リレーとしての役割も担う


