[[TiDB]]の[[Timestamp Oracle]]([[TSO]])についてまとめる

![[assets/66a3a812d43b78001ce7b5e0.png]]
- [[PD]] Clusterが[[TSO]]を提供
	- [[Raft]]([[etcd]])でメタデータのレプリケーションをしている
- 下の18bitが論理クロック、上の46bitが物理クロック

- 実装: [pd/pkg/tso/tso.go at master · tikv/pd · GitHub](https://github.com/tikv/pd/blob/master/pkg/tso/tso.go)

参考
- [https://dzone.com/articles/tidbs-timestamp-oracle](https://dzone.com/articles/tidbs-timestamp-oracle)
