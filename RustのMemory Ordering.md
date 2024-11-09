![[assets/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F31409%2Fb0091608-d6cb-92e4-e528-8e487f06831f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=fc9e0daf2c9a8ad777381b9fb232f4e1]]


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

参考文献
- [https://qiita.com/qnighy/items/b3b728adf5e4a3f1a841](https://qiita.com/qnighy/items/b3b728adf5e4a3f1a841)
