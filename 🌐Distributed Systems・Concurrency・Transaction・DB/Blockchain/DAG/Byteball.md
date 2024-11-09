[#DAGベースの仮想通貨](DAGベースの仮想通貨.md)

- [https://obyte.org/Byteball.pdf](https://obyte.org/Byteball.pdf)
- 有志による日本語訳: [https://github.com/knskito/byteball_whitepaper_jp/blob/master/main.pdf](https://github.com/knskito/byteball_whitepaper_jp/blob/master/main.pdf)

特徴
- [[Deterministic Finality]]を提供する
- プライバシー
	- セカンドカレンシーとして[[blackbytes]]があり、これは追跡しづらい
- コンプライアンス
	- 送金に権威的なエンティティによるmultisigを末代まで強制できる通貨を作れば一定コンプライアンス担保ができる?
	- これアイデアとして非常に面白い気がする(kekeho)

データ構造
- Storage unit
	- 以下のデータが含まれる
		- データ
		- 署名
		- 親のunitのhash(confirmationを表現)
	- [[DAG]]を形成。半順序を提供
	- unitをあとから編集しようとすると、hashも変更しなければならず、自分をconfirmationしてくれている子どもたちを失うことになる。すべての子供達と協力しないといけない

Double spendingへの対処
- 同じoutputを消費しようとする2つのunitの間に、partial orderがあるときは、後のunitのほうを拒否できる
- 同じoutputを消費しようとする2つのunitの間に順序関係がないときは、とりあえず両方を受け入れて、後日total orderを計算する
	- total order決められるんだ?(kekeho)
- Total orderの決め方
	- unitは、 かならず同じaddressの先行するunitを親に含める
		- 同じaddressからのunit間ではtotal orderが決まる
Main chain
![[assets/661cbd9b741f97002768273d.png]]
- Total orderを決めるためにmain chain(MC)を決める
	- 最良の親を決めるselection algorithm
- main chainに含まれないunitは、main chain indexを持つ
	- main chain index(MCI): unitの子供に含まれるmain chain unitのindexの中で、一番小さい値
		- これ賢いなと思った(kekeho)
- 同じMCIを持つ場合は、hash値の低いほうが先

Ball
- unitがstableになったら、このunitに基づいてballという構造を作る
- ballには以下のデータが含まれる
	- unit: hash of unit
	- parent balls: array of hashes of balls based on parent units
	- is_nonserial: 無効ならtrue
	- skiplist_balls

Private payments
- hashのみをDAGに書く。payloadはプライベートチャネルで送る。
	- それだけだと二重支払いを防げないので、spent proofを発行

感想
- Witness周り、[[Finality]]周りがなんともしっくりこないな…(kekeho)
