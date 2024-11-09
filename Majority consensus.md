[#分散システム](分散システム)

- [[多数決合意]]
- [[Mutex]]を実現
アルゴリズム
- プロセスの集合を$\Pi = P_0, P_1, ..., P_{n-1}$とし、$M = \lceil (n+1)/2 \rceil$とする(過半数)
- 各プロセス$P_i$は、変数$vote_{P_i}$(初期値: NULL)とキュー$wailt_{P_i}$(初期値: $\phi$)を持っている
- 資源$R$へのアクセスを希望するとき
	1. $M$個のプロセスの集合$Q \sub \Pi$を選択
	2. $Q$から、プロセス番号$k$が小さい順に...  ←これにより、[[deadlock]]を回避している。[[定順要請法]]
		- a. メッセージ$Request(i)$を送信
		- b. $P_k$から$Perm(k)$が届くのを待つ
	3. $R$へのアクセスを開始する
- 資源$R$へのアクセスを終了したとき
	1. これまで受信した$Perm(j)$を送信したプロセスの集合を$PERM$とする
	2. $PERM$に属する全てのプロセス$P_j$にメッセージ$Release(i)$を送信する
- メッセージ$Request(j)$を受信したとき
	1. $vote_{P_i} \neq$ NULLなら: $P_j$を$wait_{P_i}$に挿入
	2. $vote_{P_i} =$NULLなら:
		- a. メッセージ$Perm(i)$を$P_j$に送信する
		- b. $vote_{P_i} \leftarrow P_j$
- メッセージ$Release(j)$を受信したとき
	1. $wait_{P_i} \neq \phi$なら:
		- a. $wait_{P_i}$から最初のプロセス$P_k$を取り出す
		- b. メッセージ$Perm(i)$を$P_k$に送信する
		- c. $vote_{P_i} \leftarrow P_k$
	2. $wait_{P_i} = \phi$なら: $vote_{P_i} \leftarrow$ NULL

