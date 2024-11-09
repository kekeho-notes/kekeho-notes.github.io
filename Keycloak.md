
機能の拡張
- Keycloakの各機能は、[[Service Provider Interface]]として実装されているので、中身をとっかえひっかえしてカスタマイズできる
	- [https://www.keycloak.org/docs/latest/server_development/index.html#_providers](https://www.keycloak.org/docs/latest/server_development/index.html#_providers)
	- SPI一覧は、Server Infoでチェックできる
		- ![[assets/6550e44b57927a001c1fbc5c.png]]
	- カスタムProviderは、JARファイルとして提供される。JARファイルを$KC_HOME/providersにコピーすれば導入ができる。
