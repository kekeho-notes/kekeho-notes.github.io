[An Introduction to Gordian Envelopes - Blockchain Commons](https://www.blockchaincommons.com/introduction/Envelope-Intro/)
[GitHub - BlockchainCommons/Gordian: An entire architecture focused on user agency and security.](https://github.com/BlockchainCommons/Gordian)
[Gordian/Intro-Tech.md at master · BlockchainCommons/Gordian · GitHub](https://github.com/BlockchainCommons/Gordian/blob/master/Envelope/Intro-Tech.md)

- Smart Document(Envelope)のアーキテクチャ．
	- 封筒には何かを書き込むことができる
	- 封筒にはルーティングの指示を含めることができる
	- 封筒にはモノを入れることができる
	- 封筒の中に封筒を入れることができる
	- 封筒に封をすることができる
		- 署名
	- 封筒を証明することができる
		- 署名
	- 封筒は閉じることができる
		- 暗号化
	- 封筒には窓があることがある
		- [[Selective Disclosure]]
		- Markle Proofによる，データが封筒に含まれている存在証明
			- おもしろいね(kekeho)
	- 封筒の開け方は受取人によって異なる


- Elisionってなんだ?(kekeho)
	- 削除/省略の意味．Selective Disclosureとは区別された概念で，[[Merkle Tree]]としては対象アイテムのHashは存在するが，ハッシュに紐付いたデータだけが省略されているという感じとのこと
	- 対象データ(封筒に含まれているデータの一部)が，その封筒に含まれていたということを証明できる
	- Elisionを使えば[[Progressive Trust]]を実現できる

![](https://www.youtube.com/watch?v=uFxStP3ATkw)

