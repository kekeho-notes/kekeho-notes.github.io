---
aliases:
  - 障害
  - 障害モデル
---
- [[Error]]の原因

# Faultの種類
- [[Crash fault]]
- [[Omission fault]]
- [[Timing fault]]
- [[Byzantine fault]]
- [[Transient fault]]: 一過性
	- 伝送経路におけるビット反転
- [[Intermittent fault]]: 断続性
- [[Permanent fault]]: 永続性
	- ソフトウェアバグ、ディスクヘッドの破損、など
- [[Fault tolerance]]: [[故障耐性]]
	- [[Crash-fault torelant]]
	- [[Byzantine Fault Tolerant]]

# Faultのヤバい順
- [[Fail-stop fault]] ([[Synchronous System]])
- [[Fail-stop fault]] ([[Asynchronous System]])
- Crash-recovery fault([[Crash-recovery model]])
- [[Byzantine fault]]

# メモ
- 