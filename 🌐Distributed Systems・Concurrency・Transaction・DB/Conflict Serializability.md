- [[CSR]]とも

- Conflict: 同じデータアイテムに対する、write-write,write-read, read-writeのいずれかの関係を持つ、2つの異なる[[トランザクション]]の関係
- CSR: 競合の仕方が同じSerial historyが存在するhistoryの集合
- Conflict graph: Txをノード、Conflictをエッジとしたグラフ
	- 非巡回 => CSR


- [[Serializability, CSR, VSR, MVSR, FSRの関係]]
