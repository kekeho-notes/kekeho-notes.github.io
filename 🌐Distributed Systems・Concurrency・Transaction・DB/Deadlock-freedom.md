- 複数のプロセスが、お互いのリソース開放を永久に待ち続ける状態が発生しない
- 広義のデッドロック([[Livelock]])も禁止

# ネタ
- Any deadlock-free [[mutex]] algorithm requires allocating and then reading or writing at least _n_ distinct locations in the worst case.
	- [[Lamport's Bakery algorithm]]もそう
	- 
# 定理
##  [[Deadlock-freedom]]特性を持つ[[Mutex]]アルゴリズムは、同時スレッドの最大数をnとしたときに、少なくともn個のメモリ領域を読み書きする必要がある
- [[Lamport's Bakery algorithm]], [[Filter lock]]とかもそう
- こうした制約により、CPUに同期操作や[[CAS]]などが導入される動機づけがされる
### 証明
- 3スレッドあるとして、2つのメモリ領域のみを使用するDeadlock freeなLockアルゴリズムがあると仮定して、矛盾を示す (背理法)
- [[Covering State]]の概念を導入
	- 各メモリ位置に対して、少なくとも1つのスレッドがその位置に書き込もうとしている状態
	- Lockオブジェクトの状態は、クリティカルセクションにいるスレッドが0に見える
- Covering stateからはじまる実行を考える
	- ![[Pasted image 20241216151935.png]]([[The Art of Multiprocessor Programming|TAoMP]]より)
	1. まずスレッドCを実行させる。Cはクリティカルセクションに入る。
	2. スレッドA,Bを実行させる。Covering stateを更新させる。
	3. AもBも、Cがクリティカルセクションにいるかどうか判断できない (何の印もないので)
		1. で、AがCSに突入して、AとCが同時にCSにいることになってオシマイ
	