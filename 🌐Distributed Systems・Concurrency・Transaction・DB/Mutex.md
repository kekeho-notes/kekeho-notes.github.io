[#Multiprocessor_Programming](Multiprocessor%20Programming%201.md)
- [[Mutual exclusion]], [[相互排除]], [[相互排他]], [[相互排他制御]]
- 異なるプロセスが、同時にアクセスすることがない。1度に1プロセスのみ。([[Safety]])
	- [[Critical section]]を作るのに便利なツール
- [[Deadlock-freedom]]が求められる ([[Liveness]])
	- あるプロセスがlock あるいは releaseを試みている場合、最終的に何処かのプロセスがロックを獲得またはリリースする
- [[Starvation-freedom]]が求められる([[Liveness]])
	- lockあるいはreleaseを試みているすべてのプロセスは、最終的に成功する

アルゴリズム
- [[Peterson's algorithm]]
