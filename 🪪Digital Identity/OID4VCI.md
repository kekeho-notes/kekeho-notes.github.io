[#OpenID4VC](OpenID4VC.md)
[https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)

特徴
- クレデンシャルフォーマットに依存しないトランスポートプロトコル

Specメモ
3. Overview
- Credential Issuerが提供するCredential発行APIを定義している
- APIの種類は以下
	- Credential Endpoint
	- Batch Credential Endpoint (オプション): バッチ処理発行
	- Deferred Credential Endpoint (オプション): クレデンシャルの遅延配送を可能にする
	- IssuerがWalletにCredential Offerをするためのメカニズム(オプション)
	- 発行可能なクレデンシャルにまつわるMetadata公開用のメカニズム
- Issuerのエンドポイントは、[[OAuth 2.0]]で認証される
3.3 Core Concepts
- ウォレットは、個々のクレデンシャルごとに、一つのCredential RequestをCredential Endpointに送る。同じアクセストークンを利用して複数のCredential Requestを送れる
- Credential Request/Batch Credential Request: 以下の発行を要求: ここの話、本来のクレデンシャルは一つなんだけど、type別とかproof別に複数出してもらえる、ということぽい (kekeho)
	- 同じProofにバインドされた、異なるtype/doctypeの複数のクレデンシャル
	- 異なるProofにバインドされた、同じtype/doctypeの複数のクレデンシャル
	- 異なるProofにバインドされた、異なるtype/doctypeの複数のクレデンシャル
- 以下により、クレデンシャルフォーマットに依存しないトランスポートプロトコルを実現
	- クレデンシャルフォーマットに固有のパラメータまたはClaimを、Credential Issuerのメタデータ、Credential Offer、Authorization Request、(Batch)Credential Requestに差し込む拡張ポイントを定義

わかりやすい解説
- [https://www.authlete.com/ja/developers/oid4vci/](https://www.authlete.com/ja/developers/oid4vci/)
