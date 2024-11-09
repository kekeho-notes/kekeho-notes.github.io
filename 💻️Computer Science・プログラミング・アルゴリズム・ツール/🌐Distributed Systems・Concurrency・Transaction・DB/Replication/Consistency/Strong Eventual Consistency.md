[#Consistency](Consistency.md)

- [[SEC]]とも
- すべてのノードが同じUpdateの集合を受け取った場合、受け取る順序にかかわらず、同じ状態になることを保証する
- [[CRDT]]や[[Operational Transformations]]によって実現される

- SECの要求 ( [https://link.springer.com/chapter/10.1007/978-3-642-24550-3_29](https://link.springer.com/chapter/10.1007/978-3-642-24550-3_29) より)
- causal history $C = [c_1, c_2, ... c_n$]
- プロセス$p_i$は、状態$s_i$を持つ
	- Eventual delivery: ある正しいレプリカに配信された更新は、最終的にすべての正しいレプリカに配信される
		- $\forall{i, j} : f \in c_i \Rightarrow ♢f \in c_j$
	- Convergence: 同じアップデートを受け取った正しいレプリカは、最終的に同じ状態になる
		- $\forall{i, j} : □c_i = c_j \Rightarrow ♢□s_i \equiv s_j$
	- Termination: 全てのメソッドの実行は終了する
	- Strong Convergence: 同じアップデートを受け取った正しいレプリカは、(受け取った順序によらず、ロールバックとかせず)同じ状態になる
		- $\forall{i,j} : c_i = c_j \Rightarrow s_i \equiv s_j$
		- これがないのが[[Eventual Consistency]]


関連: [[Eventual Consistency]]

参考
- [https://www.baeldung.com/cs/eventual-consistency-vs-strong-eventual-consistency-vs-strong-consistency](https://www.baeldung.com/cs/eventual-consistency-vs-strong-eventual-consistency-vs-strong-consistency)

