---
aliases:
  - FLP
---
> In this paper, we show the surprising result that no completely asynchronous consensus protocol can tolerate even a single unannounced process death.
- [[Byzantine fault]]は考慮せず(もっとゆるく[[Crash fault]]しか仮定していない)、信頼性のある通信路があって、Exactly-onceのメッセージ配信が可能と仮定しても、ダメ！
- [[Determinisitc Consensus]]を仮定している


# 論文
- https://dl.acm.org/doi/10.1145/3149.214121 ([[JACM]]'85)

## 2. Consensus Protocols
- Consensus Protocol $P$の定義: $N \geq 2$個のプロセスからなる[[Asynchronous System]]
	- 各プロセス$p$がもつinternal state:
		- 1bitの入力レジスタ$x_p$
		- ${\{b, 0, 1\}}$の値を持つwrite-onceな出力レジスタ$y_p$ (初期値は$b$, $0$ or $1$が決定状態)
		- 無限の容量を持つinternal storage
		- program counter
	- 各プロセス$p$は状態遷移関数に従い決定論的に作用する
	- 他のプロセスとはメッセージングにより通信する
		- $\text{send}(p, m)$: メッセージバッファに$(p, m)$を置く
		- $\text{receive}(p)$: メッセージバッファから$(p, m)$を削除し、$m \in M \cup \{\phi\}$を返す。メッセージがなければ$\phi$を返す
			- メッセージは[[Eventual Delivery]]が保証されている
	- Systemのconfiguration $C$: 各プロセスの内部状態から構成される
		- step: configurationの遷移
			- event $(p, m)$によって引き起こされる
		- いくつかのプロセス$p$が$y_p = v$となる決定状態になるとき、$C$は決定値$v$を持つ

- 故障モデル
	- プロセス$p$は、無限に多くのstepを持つ場合nonfaulty
	- それ以外はfaulty
		- [[Crash fault]]を想定しているということだろう
	- 最大で1つのプロセスのみ故障していて、それ以外のnonfaultyプロセスにはメッセージがeventuallyに届けられる

- Consensus Protocolのcorrectness
	- Partially correct
		1. No accessible configuration has more than one decision value
			- どのような遷移可能なConfigurationも、複数の決定値を持たない
		2. For each $v \in {0, 1}$, some accessible configuration has decision value v
			- 0と1それぞれについて、その値を決定値とする遷移可能なConfigurationが存在する
	- Totally correct
		- 1つのfaulty processがいても、partially correctかついくつかのプロセスが決定状態にたどり着ければOK


- Lemma 1 (scheduleの[commutativity](commutative): あるconfiguration $C$から、schedules $\sigma_1, \sigma_2$がそれぞれconfigurations$C_1, C_2$を導くとする。$\sigma_1$と$\sigma_2$のstepを取るプロセスの集合がdisjointである場合、$C_1$に$\sigma_2$を適用し、また$C_2$に$\sigma_1$を適用することで同じconfiguration$C_3$を導くことができる
	- disjoint: 2つのscheduleの間で、stepを実行するプロセスの集合に共通部分がない
	- まあそりゃ、例えばプロセス群の半分が$\sigma_1$を受け取って$C_1$、そのあと残りが$\sigma_2$を受け取って$C_3$になるのと、その逆は、結果が一緒だよね

## Main result
- Theorem 1: No consensus protocol is totally correct in spite of one fault
	- 高々1つの故障にも関わらず、totally correctなconsensus protocolはない ([[Asynchronous System]]の場合は)
### 証明
- 背理法を用い、逆に$p$は1つのfaultがあってもtotally correctであると証明しようとしたときに矛盾が生じることでTheorem 1を証明する
-  証明の流れ
	1. まだ決定されていない初期構成がいくつか存在することを証明する
	2. システムが特定の決定をするようなステップを回避するadmissible runを組み立てられることを示す
- TODO: 続きを読む