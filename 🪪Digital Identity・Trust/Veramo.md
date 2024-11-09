- [[DID]], [[Verifiable Credential]]のためのライブラリ・フレームワーク・API
- [[Typescript]]で書かれている
	- いろんなプラットフォームで使うことを考えると、WASMとかにうまい具合にできないんだろうか。。。(kekeho)
- Modularな感じ,、プラグインが組み合わさってできている→拡張が簡単そう(kekeho)
- Demo
	- ![](https://www.youtube.com/watch?v=U6va97LOZ0M)


アーキテクチャ
![[assets/64cdb0bf4fbf92001ba81bb8.png]]

- Veramo Agent
	- 共通インターフェース。アプリケーションが触るエントリーポイント。
- Plugins
	- Veramoの機能は、Pluginという形でAgentに追加されていく
	- いくつかCore Pluginが提供されている
		- [[DID Method]]系
			- [[did ethr]]
			- [[did web]]
	- npmとかから追加してくることもできる
- Messages
	- ![[assets/64cdb3e13a5e63001c5cdb2c.png]]

	- [[DIDComm]]サポート
- [[SDR]]のサポート

ツール群
- CLI
- [Agent Explorer](https://explore.veramo.dev/statistics)

