人生で初めて[[CTF]]に出てみた。解いた問題の[[Writeup]]をメモしておく

- [Three](https://score.beginners.seccon.jp/challenges/26)(Reversing)
	- Ghidraにかけると、フラグが難読化されていることがわかる
	- 難読かの仕組みがとても単純なので、辿っていけば解ける

- [Leak](https://score.beginners.seccon.jp/challenges/16)(Reversing)
	- 通信内容(pcap)とサーバープログラムが与えられる
	- Ghidraでサーバープログラムをみると、入力されてきたものを暗号化して送ってくれるプログラムだとわかる
		- 暗号化といっても鍵ファイルとXORを取っているだけ
		- ということはもちろん、pcapの内容をもう一度送れば平文が返ってくる
			- (Content xor PrivKey) xor PrivKey == Contentなので
	- ここまでは突き止めたものの、なんかどうもうまく通せず、最終的にチームメイトに通してもらった

- [Poker](https://score.beginners.seccon.jp/challenges/20)(Reversing)
	- 後日解いた
	- Indian Pokerのプログラムのバイナリが与えられる
		- 何回も勝つとフラグを教えてくれる
	- 解き方
		- とりあえずGhidraで解析してみる
			- main:
				- ![[assets/648db684bd525d001b39e616.png]]
				- whileループから抜けると、フラグを教えてくれる関数が呼ばれる（その関数の中を見てもフラグは難読化されている）
				- whileループから抜けるためには、99回勝たなければいけないとわかる
		- 99の部分を0に変えて、1回勝ったらフラグを教えてくれるようにする
			- hex editorで該当部分を0x63(99) -> 0x00に書き換え
			- その後プレイしたら順当にフラグを教えてもらえる


感想
CTFは未経験、ぜんぜん勉強もしたこともなかったが参加できて楽しかった。解けた時の脳汁が気持ちよかった。これを機にCTFに興味が出てきたので、勉強を始めていきたい。



