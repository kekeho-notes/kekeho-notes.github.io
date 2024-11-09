[https://en.wikipedia.org/wiki/Bully_algorithm](https://en.wikipedia.org/wiki/Bully_algorithm)

- $N$個のプロセス$P_0, P_1, ..., P_{N-1}$が存在
- プロセスID: $id(P_k) = k$
- いずれのプロセスも、コーディネーターがリクエストに応答しなくなったことに気づくと選挙を開始する
	- $P_k$は、自身より大きな$id$を持つプロセス$P_{k+1}, P_{k+2}, ..., P_{N-1}$にELECTIONメッセージを送信
	- 誰も応答しないなら、自身がコーディネーターとなり、VICTORYメッセージを全体に送る
	- $P_{i>k}$から応答があれば、選挙は$P_i$に引き継がれ、自分の仕事は終わり
- 生きている中で最も大きな$id$のプロセスがコーディネーターになる
	- なんかガキ大将っぽいから、Bullyという名前なんだろうか(kekeho)
- [[Safety]]: 障害のない全てのプロセスがプロセス$Q$を選出するか、全く選出しないかどちらか。Bully algorithmはこれを満たす
	- 複数のプロセスがコーディネータになっていると仮定したら、それぞれがVICTORYメッセージを送っているはずだが、それ以前に上位者にELECTIONを送っているはずだから
- [[Liveness]]: [[同期システム]]、[[Crash-recovery model]]の元で、Livenessも保証される
