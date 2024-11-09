[#OpenID](OpenID) [#OAuth](OAuth) #[[OpenID Connect]]
- [https://openid.net/specs/openid-connect-discovery-1_0.html](https://openid.net/specs/openid-connect-discovery-1_0.html)
- `ベースURL` + `/.well-known/openid-configuration`にアクセスし、[[OpenID]]プロバイダーの情報をまとめて取ってこれる
- メタデータ: [https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)
	- `authorization_endpoint`: [[OAuth 2.0]]のAuthorization Endpoint
	- `token_endpoint`: [[OAuth 2.0]] Token Endpoint

実装例
- Google: [https://accounts.google.com/.well-known/openid-configuration](https://accounts.google.com/.well-known/openid-configuration)
