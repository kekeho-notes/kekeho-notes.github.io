---
aliases:
  - 時相論理
  - 線形時相論理
  - Linear Temporal Logic
---
# 概要
通常の論理を拡張して、みらいに関するある種の主張(assertion)を含むようにしたもの。このページでは主に[[Concurrent|並行]]プログラムにおけるTemporal logic (Linear Temporal Logic)についてまとめる。

$\square$ : now and forever (常に)
$\Diamond$: now or sometime in the future (最終的に、Eventually)

## 並行プログラム
- $s_0, s_1, ...\in \Sigma$: sequence of program states
	- 以下の条件を満たしてstate transitionを起こす
		- Valid starting state: $s_0$ is possible program state
		- Transition: $i > 0$について、$s_i$ は$s_{i-1}$から$\textit{ready}(s_{i-1})$に含まれる1つのアトミック処理によって引き起こされる
		- Fairness: $\textit{ready}(s_i)$に含まれるアトミック処理$a$は、$s_j (j > i)$の実行にいつか含まれる
- 現在のステートのみから次の遷移可能なステート群が決まる

## Immediate Assertions
- Temporal logicは、$\land$, $\lor$, $\sim$などの一般的な論理記号と$\square$, $\Diamond$からなる、Immediate Assertion(即時アサーション)から構築される
- プログラムのステートにおける関数
- 記法
	- $s \vDash P$: ステート$s$において、即時アサーション$P$が真である
		- 例: $s \vDash x = 1$はステート$s$において$x = 1$が満たされていることを示す
- $s \vDash at \ A$: プログラムの制御がステートメント$A$の開始地点にある状態を示す ($A$は実行可能なプログラムのステートメント)
- $s \vDash in \ A$: プログラムの制御が$A$の開始地点あるいは内部の何処かにある状態を示す
- $s \vDash after \ A$: プログラムの制御が$A$の直後にある状態を示す
	- whileループのafterは、ループの条件式テスト地点にいることを示す
	- Aが[[cobegin]]の中のステートメントの場合、cobegin全体が終了しているか、cobeginは実行中だがAは終わっている、という状態

## Temporal Assertions
- プログラムの実行シーケンスにおける関数
- 記法
	- $\sigma \vDash P$: プログラムの無限の実行シーケンス$\sigma$においてtemporal assertion $P$が真である
- Immediate assertionsとの関連性:
	- $\sigma \vDash P$ if and only if $s_0 \vDash P$
- 時相演算子を使う場合
	- $\sigma \vDash \square P$ if and only if $\forall i \ge 0: \sigma^{(i)} \vDash P$
	- $\sigma \vDash \Diamond P$ if and only if $\exists i \ge 0: \sigma^{(i)} \vDash P$
### 公式
- $P \supset \square Q$ (含意): if $P$ is true now, then $Q$ will always be true
- $\square(I \supset \square I)$ (不変条件): if $I$ ever becomes true, then it will remain true forever
- $\square (P \supset \Diamond Q)$: if $P$ ever becomes true, then $Q$ will be true at the same time or later
	- $P \leadsto Q$: $P$ leads $Q$ともいう
- $\square (P \supset Q) \supset (P \leadsto Q)$
- $\square(P \land Q) \equiv (\square P \land \square Q)$
- $(\square P \lor \square Q) \supset \square(P \lor Q)$
- $\Diamond(P \lor Q) \equiv (\Diamond P \lor \Diamond Q)$
- $(\square P \land \square (P \supset Q)) \supset \square Q$
- $\Diamond P \lor \square \sim{P}$: Pは最終的に真になるか、永遠に偽でありつづけるかのどちらかである
- $((P \leadsto Q) \land (Q \leadsto R)) \supset (P \leadsto R)$: 推移律
- $((P \leadsto R) \land (Q \leadsto R)) \supset ((P \lor Q) \leadsto R)$
- $\square(P \lor Q) \supset (\square P \lor \Diamond Q)$
- $[(P \land \square Q) \leadsto R] \supset [(P \land \square Q) \leadsto (R \land \square Q)]$

# Proof lattices
以下が言えれば、推移律から$R \leadsto Q$が言える
- $P \leadsto (R_1 \lor R_2)$
- $R_1 \leadsto Q$
- $R_2 \leadsto Q$
![[Pasted image 20241208221304.png]]
- Proof latticeの定義: A proof lattice for a program is a fnite directed acyclic graph in which each node is labeled with an assertion, such that
	- There is a single entry node having no incoming edges (図の$P$)
	- There is a single exit node having no outgoing edges (図の$Q$)
	- If a node labeled $R$ has outgoing edges to nodes labeled $R_1, R_2, ..., R_k$, then $R \leadsto (R_1 \lor R_2 \lor ... \lor R_k)$ holds for the program
- $A \leadsto B$ということは、ある時点で$B$がtrueの場合$A$もtrue
> 定理: If there is a proof lattice for a program with entry node labeled $P$ and exit node labeled $Q$, then $P \leadsto Q$ is true for that program

## Safetyの時相論理による表現
- $P \supset \square Q$: $P = true$でプログラムを開始したら、$Q$は常にtrueであり続ける
- partial correctnessの表現: $(\textit{at} \ S \land P ) \supset \square(\textit{after} \ S \supset Q)$
- [[Mutex]]の時相論理による表現: $\textit{at} \ S \supset \square\sim(\textit{in} \ CS_1 \land CS_2)$
## Livenessの時相論理による表現
- 以下のfairnessを前提に置く
	- Atomic assignment axiom: for any atomic assignment statement $S$: $\textit{at} \ S \leadsto \textit{after} \ S$
	- while control flow axiom: For the statement $w$: while <$b$> do s: S od, $\textit{at} \ w \leadsto (\textit{at} \ s \lor \textit{after} \ w)$
- 「悪いことが起こらない」という[[Safety]]と「何かが最終的に起こる」というfairnessを組み合わせて、「なにか良いことが最終的に起こる」というlivenessを導く



# 参考
- https://www.cs.tsukuba.ac.jp/~mizutani/under_grad/programtheory/2014/2014-09.pdf
- [[Proving the Correctness of Multiprocess Programs]]