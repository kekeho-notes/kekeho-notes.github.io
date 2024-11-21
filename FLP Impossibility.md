> In this paper, we show the surprising result that no completely asynchronous consensus protocol can tolerate even a single unannounced process death.
- ビザンチン障害は考慮せず、信頼性のある通信路があって、Exactly-onceのメッセージ配信が可能と仮定しても、ダメ！
- processがdeterministicなことを仮定している


# 論文
- https://dl.acm.org/doi/10.1145/3149.214121

## 2. Consensus Protocols
- Consensus Protocol $P$の定義: $N \geq 2$個のプロセスからなる[[Asynchronous System]]
	- 各プロセス$p$:
		- 1bitの入力レジスタ$x_p$

- Lemma 1 (scheduleの[commutativity](commutative): あるconfiguration $C$から、schedules $\sigma_1, \sigma_2$がそれぞれconfigurations$C_1, C_2$を導くとする。$\sigma_1$と$\sigma_2$のstepを取るプロセスの集合がdisjointである場合、$C_1$に$\sigma_2$を適用し、また$C_2$に$\sigma_1$を適用することで同じconfiguration$C_3$を導くことができる
	- disjoint: 2つのscheduleの間で、stepを実行するプロセスの集合に共通部分がない
	- メッセージバッファは順序づけされていないので、これが成り立つということかな?
