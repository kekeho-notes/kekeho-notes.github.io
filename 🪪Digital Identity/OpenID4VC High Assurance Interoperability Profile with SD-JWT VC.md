- [[OpenID]]が策定
- [[OpenID4VC]]のインターオペラビリティを取るためのProfile

概要
![[assets/65ae2d7b2374c600248e88c4.png]]

- Format: [[SD-JWT]]
	- [[mDoc]]と[[SD-JWT]]両方の形式でクレデンシャルを組合せて発行する方法についても記載がある
- トランスポート
	- [[OID4VCI]], [[OID4VP]]
- ウォレットの認証
	- [[SIOPv2]]

OpenID for Verifiable Credential Issuance
- MUST support both pre-auth code flow and authorization code flow.
- MUST support protocol extensions for the SD-JWT VC credential format profile as defined in Section 7.2.
- MUST support sender-constrained tokens using the mechanism defined in [[RFC9449]].
- MUST support [[RFC7636]] with S256 as the code challenge method.
