[[TiDB]]の[[Timestamp Oracle]]についてまとめる

![[assets/66a3a812d43b78001ce7b5e0.png]]
- [[PD]] Clusterが[[Timestamp Oracle|TSO]]を提供
	- [[Raft]]([[etcd]])でメタデータのレプリケーションをしている
- 下の18bitが[[Logical Clock]]、上の46bitが物理クロック([[Physical Time]])
	- [[Logical Physical Clocks]]的なノリ?

- 実装: [pd/pkg/tso/tso.go at master · tikv/pd · GitHub](https://github.com/tikv/pd/blob/master/pkg/tso/tso.go)

参考
- [https://dzone.com/articles/tidbs-timestamp-oracle](https://dzone.com/articles/tidbs-timestamp-oracle)
