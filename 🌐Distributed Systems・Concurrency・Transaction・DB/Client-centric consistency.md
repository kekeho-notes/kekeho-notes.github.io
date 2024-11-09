- [[Bayou]]などからでてきた概念?(kekeho)
- [[Causal Consistency]]と密接な関係がある
	- Causal Consistencyは以下の4つのConsistencyを保証する

分類
,,
,,
,,

定義
- [[Monotonic reads]]
	- >  If a process reads the value of a data item x, any successive read operation on x by that process will always return that same value or a more recent value.
	- $x_i$をreadしたら、次以降は$x_{j \ (i \le j)}$を読まないといけない
- [[Monotonic Writes]]
	- >  A write operation by a process on a data item x is completed before any successive write operation on x by the same process.
	- 同じプロセスによるwriteは、順番が入れ替わってはダメ。並行でもダメ。
- [[Read your writes]]
	- >  The effect of a write operation by a process on data item x will always be seen by a successive read operation on x by the same process
	- 同じプロセスによるwriteは、それ以降のreadから読めないといけない
	- 発展として、[[Cross-device Read your writes]]もある
- [[Writes follow reads]]
	- >  A write operation by a process on a data item x following a previous read operation on x by the same process is guaranteed to take place on the same or a more recent value of x that was read
	- writeは、それ以前に同じプロセスによってreadされた値もしくはそれより新しい値を書き換えるような命令でないといけない
	- 読んだ値を反映した値を書き込まないといけない(kekeho)

- RYW/WFRによりCausalityが保証されてる気がする?(kekeho)
