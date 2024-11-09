- [[DID Method]]の一つ
- [[Verifiable Data Registry]]として[[Mainline DHT]]を用いる

- フォーマット
	- `did-dht-format := did:dht:Z-BASE-32(raw-public-key-bytes)`
- [[DID Document]]は[[DNS Resource Records]]としてエンコードされる。これが[[DNS packet]]としてDHTに格納される
	- Root Recordにバージョン番号がかかれる
- 操作(Create・Read・Update)
	- [https://did-dht.com/#operations](https://did-dht.com/#operations)

- 操作はMainline DHTノード or Gatewayから
	- Gatewayが過去DIDドキュメントをResolveしたり、type indexingをサポートしたりする
		- ここは信頼できるGatewayに頼る必要があるんやね(kekeho)
		- でも署名を見ればAuthenticityはわかる
		- DID Controllerが信頼できるGatewayをNSレコードで指定

- [Republishing Data](https://did-dht.com/#republishing-data)がめんどくさそう(kekeho)

参考
- 仕様: [https://did-dht.com/](https://did-dht.com/)