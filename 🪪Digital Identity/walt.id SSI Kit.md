![[assets/spaces%2F1k3zreXT6Nz41D1g1C6K%2Fuploads%2Fgit-blob-e0bbc151c7bba4836663ed0fa163808a2f06ca14%2FArchitecture-SSIKit-by-waltid.png?alt=media]]
アーキテクチャ図

[#waltid](waltid) [#Verifiable_Credential](Verifiable_Credential)
- [https://docs.walt.id/v/ssikit/ssi-kit/readme](https://docs.walt.id/v/ssikit/ssi-kit/readme)

概要
できること
以下をREST API or CLI or Java/Kotlinでできる
- 鍵管理
- DIDの管理
- VCの発行
	- テンプレート機能あり
	- Revocationにも対応
- VCの検証・保存
	- 単に署名検証をするだけでなく、検証ポリシーを定義してそれに沿って行える

アーキテクチャ
それぞれのレイヤーごとに、REST・CLI APIが用意されている。
- Low-Level Services Abstraction
	- 鍵管理・DID・VC・データストレージ
- Ecosystem Abstraction
	- よくわからんけど、[[EBSI]]とか[[Gaia-X]]とかをサポート? (kekeho)
- High-Level Interfaces / APIs
	- [[Signatory]](for Issuer)
		- VCの発行
			- テンプレートを作ることも可能
		- VCのRevocation
			- [https://docs.walt.id/v/ssikit/concepts/credential-statuses/issue-with-status](https://docs.walt.id/v/ssikit/concepts/credential-statuses/issue-with-status)
			- [[Verifiable Credentials Status List v2021]]に対応
	- [[Custodian]] (for Holder)
		- VCの保管
	- [[Auditor]] (for Verifier)用のAPI
		- VCの検証

サポートするFlavor
- 鍵
	- EdDSA / ed25519
	- ECDSA / secp256k1
	- ECDSA / secp256r1
	- RSA
- DID
	- [[did ebsi]]
	- [[did web]]
	- [[did key]]
	- [[did jwk]]
	- [[did iota]]
	- [[did cheqd]]
- VC   ↓具体的になんの仕様?(kekeho)
	- JSON / JWT
	- JSON-LD
- Data Exchange Protocol
	- [[OID4VCI]]
		- 受け取り側として、CLIで対応?
	- [[OID4VP]]
		- Verifierに提示
		- まだベータ版らしい

遊べるポータル
- [https://portal.walt.id/](https://portal.walt.id/)
- [https://wallet.walt.id/](https://wallet.walt.id/)

REST API
- [https://docs.walt.id/v/ssikit/getting-started/rest-apis](https://docs.walt.id/v/ssikit/getting-started/rest-apis)
