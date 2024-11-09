- [[DID Method]]の一つ
- [[Verifiable Data Registry]]として[[Ethereum]]を使う
- 仕様
	- [https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md](https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md)
	- EIPはこれ: [https://eips.ethereum.org/EIPS/eip-1056](https://eips.ethereum.org/EIPS/eip-1056)
- 以下の特徴を持つ
	- 識別子作成の取引手数料は無料
	- 識別子の作成は非公開
		- オフライン(EOAとか)の場合は、ということかな? コントラクトアドレスの場合は、非公開と言えるんだろうか? (kekeho)
	- イーサリアム組み込みのアカウント抽象化を使用
	- アカウントコントローラー用のマルチシグ（またはプロキシ）ウォレットをサポート
	- 識別子としてsecp256k1公開鍵をサポート
	- Claimデータを識別子から切り離す
		- どういうこと? (kekeho)
	- イーサリアムとのやり取りを識別子から切り離すことが可能
		- どういうこと? (kekeho)
	- 鍵管理の柔軟性
	- 必要に応じてサードパーティのファンディングサービスにガス料金の支払いを許可する柔軟性（メタ取引）
	- あらゆるEVM準拠のブロックチェーンをサポート
	- 検証可能なバージョニングをサポート

Identifier Format
```format
ethr-did = "did:ethr:" ethr-specific-identifier
ethr-specific-identifier = [ ethr-network ":" ] ethereum-address / public-key-hex
ethr-network = "mainnet" / "goerli" / network-chain-id
network-chain-id = "0x" *HEXDIG
ethereum-address = "0x" 40*HEXDIG
public-key-hex = "0x" 66*HEXDIG
```

Create
- [[EOA]]、コントラクトアドレス、secp256k1のpubkeyがDIDとなる
- 基本的にはオフラインでOKだが、追加属性を入れたい場合はEthereumDIDRegistryコントラクトに書く
	- `0xdca7ef03e98e0dc2b855be647c39abe984fcf21b` on Mainnet, Ropsten, Rinkeby, Kovan
Identity Ownership
	- DIDの生成は、キーペアを作るだけ。オフライン。
	- `changeOwner`/`changeOwnerSigned`を呼び出すことで、DIDのOwnerとなるアカウントを変えられる
		- W3C用語でいうところの[[DID controller]]を変えられる、ということか?(kekeho)
			- そうっぽい: [https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md#identifier-controller](https://github.com/decentralized-identity/ethr-did-resolver/blob/master/doc/did-method-spec.md#identifier-controller)
Delegate
- [[DID delegate]]を行える仕組みを備える

