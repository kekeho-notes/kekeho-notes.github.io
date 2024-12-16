- 複数のプロセスが、お互いのリソース開放を永久に待ち続ける状態が発生しない
- 広義のデッドロック([[Livelock]])も禁止

# ネタ
- Any deadlock-free [[mutex]] algorithm requires allocating and then reading or writing at least _n_ distinct locations in the worst case.
	- [[Lamport's Bakery algorithm]]もそう
	- 
# 定理
- [[Deadlock-freedom]]特性を持つ[[Mutex]]アルゴリズムは、同時スレッドの最大数をnとしたときに、n個のメモリ領域を読み書きする必要がある ([[Lamport's Bakery algorithm]], [[Filter lock]])
	- こうした制約により、CPUに同期操作や[[CAS]]などが導入される動機づけがされる