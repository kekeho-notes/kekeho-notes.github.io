- [[Rust]]の[[Atomic]]操作には、いくつかの保証レベルがある
	- 大前提として、単一スレッドの中では順序が守られる。しかし、別スレッドから観測したときに、あたかも順序がぐちゃぐちゃに実行されているように見えることがある
- [[Relaxed]]: 同期を行わない
	- 単一のAtomic操作については一貫性を保証するが、他の変数に対する操作との相対的な順序については何も保証しない
- [[Acquire]], [[Release]]
	- [[Acquire]]: 読み取り操作を、対応するRelease書き込みと同期(Lock)
	- [[Release]]: 書き込み操作を、対応するAcquire読み取りと同期
	- [[AcqRel]]: 読み取り部分をAcquire、書き込み部分をReleaseとして扱う
	- [[Acquire]]と[[Release]]の間で[[happend-before]]関係が生まれる
		- 当然、単一のAtomic変数に対するacq, relの間にしかhappend-beforeは生まれないのだが、そのAtomic変数を[[Mutex]]のように使えば複数の変数にhappend-before関係を作れる?
- [[SeqCst]]: [[Sequential Consistency]]を保証
	- すべてのスレッドが合意する単一の全順序を構成
難しい。。。(kekeho)

おそらくだが、単一の操作に限ればAckRelとSeqCstは同じ結果を生むはず。問題は複数の変数を扱うときで、AckRelでは異なる変数間の操作順序に一貫性が生まれない一方で、SeqCstでは全てのスレッドが全ての変数の操作を同じグローバルな順序で見ることが保証�