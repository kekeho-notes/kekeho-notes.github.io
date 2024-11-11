- [[Starvation-freedom]]では、[[Lock]]獲得までの時間は保証されていない
- 理想的には[[first-come-first-served]]であるべき
	- 先着順、ということ。スレッドAがスレッドBより先にロックを呼び出した場合、Aが先にクリティカルセクションに入るべき、ということ
- [[Starvation-freedom]]よりも強い性質。
	- [[Deadlock-freedom]]かつ[[first-come-first-served]]なら、[[Starvation-freedom]]でもある

# Lockがfirst-come-first-servedである条件
- lock習得処理を[[doorway section]]と[[wating section]]にわけ、$\text{if } D_{A}^{j} \rightarrow D_B^k \text{ then } CS_A^j \rightarrow CS_B^j$なとき、first-come-first-servedという
	- [[doorway section]] ($D_{Thread}^{n-th call}$) : フラグを立てるなど、他スレッドの実行状態に関係なく進行できる部分.
		- 有限の決まったステップ数で終わる(ループのないコードの部分など。ループがあってもこれを提供するものもあるらしい?(kekeho))
		- [[Bounded wait-free]]特性を持つ。
	- wating: 他スレッドの状態によって待機が必要な部分
		- unboundedなステップ数がかかる
	- 「スレッドBがdoorwayを始める前にスレッドAがdoorwayを終了したら、AがBに追い越されないとき、first-come-first-reservedといえる」という感じ