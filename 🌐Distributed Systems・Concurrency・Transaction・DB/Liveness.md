---
aliases:
  - 活性
---
- good things do happen
	- 例えば、操作が進行する、デッドロックとかしないよという保証
- どんな事態からも正常状態へ復旧できるよという性質
- [[Progress]]とも
- 関連: [[Safety]]

# Livenessの例
- [[Deadlock-freedom]]
- [[Termination]]
- メッセージの[[Eventual Delivery]]

追記する
# Livenessを証明するには
- 参考: [Proving Liveness Properties of Concurrent Programs](https://lamport.azurewebsites.net/pubs/liveness.pdf)
- [[Temporal logic|時相論理]]で証明する
	- Livenessは、有限な期間での反例を無限の時系列に拡張したとき、それが反例でなくなる（その論理式が真となる）状態

# 参考
- [https://en.wikipedia.org/wiki/Safety_and_liveness_properties](https://en.wikipedia.org/wiki/Safety_and_liveness_properties)
- 