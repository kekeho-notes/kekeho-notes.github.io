定義
$e_i$と$e_j$を分散システム内のプロセスで起こるイベントとする。ここで、以下のいずれかの条件を充足するとき、イベント$e_i$はイベント$e_j$に先行する($e_i$ happend-before $e_j$)
- イベント$e_i$, $e_j$は同じプロセスで起きて、$e_i$の命令は$e_j$の命令より前に実行されている。
- イベント$e_i$はプロセス$p_i$でのメッセージ$m$の送信イベント$s_i \lbrack m \rbrack$であり、$e_j$はプロセス$p_j$でのメッセージ$m$の受信イベント$r_j \lbrack m \rbrack$である
- $e_i \Rightarrow e_k$かつ$e_k \Rightarrow e_j$からなるイベント$e_k$が存在する

メモ
- Transitive relation(推移関係)が成り立つ
	- a -> b かつ b -> cなら、a -> c


[https://www.hpcs.cs.tsukuba.ac.jp/~msato/lecture-note/dsys-2012/lecture-dist-clock.pdf](https://www.hpcs.cs.tsukuba.ac.jp/~msato/lecture-note/dsys-2012/lecture-dist-clock.pdf)
[#p2p](p2p) [#分散システム](分散システム)
