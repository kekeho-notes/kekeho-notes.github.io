- [[DHT]]の実装の1つ
- 解説
	- [https://blog.kekeho.net/2022/10/31/論文輪読-kademlia-a-peer-to-peer-information-system-based-on-the-xor-metric/](https://blog.kekeho.net/2022/10/31/論文輪読-kademlia-a-peer-to-peer-information-system-based-on-the-xor-metric/)
- 特徴
	- 大規模ネットワークによる効率的な検索
	- クエリにかかる時間は$log_{2}{(n)}$ ($n$はノード数)
- 攻撃
	- [[SKademlia]]の論文より [https://ieeexplore.ieee.org/document/4447808](https://ieeexplore.ieee.org/document/4447808)
		- 下位ネットワークへの攻撃
		- Eclipseアタック
		- シビル攻撃
			- node id作り放題
		- Churn攻撃

