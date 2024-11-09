[#LN](LN) [#ライトニングネットワーク](ライトニングネットワーク) [#Bitcoin](Bitcoin)

概要
- [[L2]]プロトコル
- [[Poon-Dryja]]プロトコルが使われる
	- [https://lightning.network/lightning-network-paper.pdf](https://lightning.network/lightning-network-paper.pdf)
- [[Funding Transaction]]と[[Commitment Transaction]]の組み合わせで[[Payment Channel]]を開く
	- 支払うたびに新たなCommitment Transactionを作る
	- 古いCommitment Transactionを公開してお金をだまし取ることを防ぐために、[[Timelock Delay]]と[[Revocation Secret]]が使われる
		- AliceがBobの新しいCommitment Transactionに署名するのは、Bobが以前のコミットメントに対するRevocation Secretの半分をAliceにわたす場合に限られる

解説
[https://github.com/lnbook/lnbook](https://github.com/lnbook/lnbook)
