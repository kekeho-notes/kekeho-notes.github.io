- システムが[[Deadlock]]状態にあるかどうかの検知をする

[[分散システム]]におけるDeadlock detection
- 分散システム$S = {P_1, P_2, ..., P_n}$があるとする。$P_i$: プロセス
- [[Wait-for graph]] $G = (\Pi, E)$: プロセス間の待ち状況を表現した[[有向グラフ]]
	- ここで、$\Pi = {P_1, P_2, ..., P_n}$
	- 有向枝$(P, Q) \in E$はプロセス$P$がプロセス$Q$を待っていることを示す
	- [[dependent set]] $D(P_i)$: $P_i$が待っているプロセスの集合
	- 例: ![[assets/66106ed70179f60024b38eaf.png]]
		- $D(P)={Q},\ D(Q) = {R},\ D(R) = {P},\ D(S) = {R}$
- [[Deadlock]]状態: [[Wait-for graph]]$G$が[[有向閉路]]$Q_1, Q_2, ..., Q_k$を含むとすると、$Q_1$は$Q_2$を、$Q_2$は$Q_3$を…$Q_k$は$Q_1$を待つことになり、deadlock
	- 要は有向閉路があったらオシマイ(kekeho)
	- Deadlock detectionにおいては、有向閉路の存在があるかどうかチェックすればOK
Deadlock detection algorithm 1
- 仮定
	1. 分散システム$S$はある別のシステム$S^*$上で稼働していると仮定。そのうえで、$P_i \in \Pi$を管理する、システム$S^*$上のプロセス$P^*_i$は$D(P_i)$を把握しているとする
	2. $P^*_i \in S^*$は、$P_j \in S^* \ (j \neq i)$とメッセージ交換が可能
	3. プロセスも通信リンクも故障しないことを仮定
	4. 各プロセスの持つ入力情報が変化しない[[Static problem]]として捉える。少なくともアルゴリズム実行中に、$D(P_i)$が変化しないことを仮定
- [[initiator]] $P^*_1$: Deadlock detection algorithmを開始したいプロセス
- 擬似コード
	- $P^*_i$がinitiatorの場合:
	1. for all $j = 2, 3, ..., n$ do Send($P^*_j$, Request)
	2. for all $j = 2, 3, ..., n$ do Receive($P^*_j$, $D_j$)
	3. [[Wait-for graph]]$G$を、$D(P_1)$と$D(P_j) \ (j = 2 ,3, ..., n)$から構築
	4. $G$に対し、有向閉路発見アルゴリズムを適用
	- $P^*_i$がinitiatorではない場合:
	1. Receive($P^*_1$, M);
	2. if M = Request then Send($P^*_1$, $D(P_i)$)
- 定理
	1. このアルゴリズムの始動時にシステムがデッドロック状態にあるならば、それを検知する
		- デッドロック状態が勝手に解消されることはないので、[[Asynchronous System]]を仮定してもこれは言える(kekeho)
	2. [[Asynchronous System]]を仮定する。このアルゴリズムはデッドロックを誤検知、すなわち[[Phantom deadlock]]を検知することがある。
		- 非同期システムにおいては、デッドロックがある=>検知されるは真でも、その逆は成り立たない(検知されたからといって、本当にデッドロックが起きているとは限らない)
		- 各プロセス$P^*_i$がレスポンスを返すタイミングはバラバラなので、バラバラな時間における依存関係が重ね合わさってしまう
	3. [[Synchronous System]]を仮定する。このアルゴリズムがデッドロックを検知したときは、実際にシステムはデッドロック状態にある。[[Phantom deadlock]]を検知しない。
- 実際の分散システムは、[[Dynamic problem]]として捉えるほうが適切

