- 複数のプロセスが、お互いのリソース開放を永久に待ち続ける状態が発生しない
- 広義のデッドロック([[Livelock]])も禁止

# ネタ
- Any deadlock-free [[mutex]] algorithm requires allocating and then reading or writing at least _n_ distinct locations in the worst case.
	- [[Lamport's Bakery algorithm]]もそう
	- 
