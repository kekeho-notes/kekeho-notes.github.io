[#Broadcast](Broadcast)

- 用語
	- $\mathsf{Broadcast(m)}$: メッセージmをブロードキャストする
	- $\mathsf{Deliver(m)}$: メッセージmを受診する
- 以下の3つの性質を満たす(V, AはPが正常であることを仮定しているのに注意)
	- 妥当性(Validity?): ある正常プロセス$P$が$\mathsf{Broadcast(m)}$を実行したならば、$P$はいつか$\mathsf{Deliver(m)}$を実行する
	- 合意性(Agreement?): ある正常プロセス$P$が$\mathsf{Deliver(m)}$を実行するならば、全ての正常プロセスもいつかは$\mathsf{Deliver(m)}$を実行する
	- 整合性(Integrity?): どのメッセージmについても、$\mathsf{Deliver(m)}$を複数回実行するプロセスは存在せず、しかも$\mathsf{Deliver(m)}$が実行されるのは対応する$\mathsf{Broadcast(m)}$が事前に実行されているときに限る 

