[#Hybrid_Logical_Clock](Hybrid_Logical_Clock)
[https://link.springer.com/chapter/10.1007/978-3-319-14472-6_2](https://link.springer.com/chapter/10.1007/978-3-319-14472-6_2)

- [[HLC]]の提案論文
- [[Lamport Clock]]と、[[Physical Time]]のハイブリッド! かっこいい(kekeho)
- [[MongoDB]], [[CockroachDB]]で使われているらしい

Introduction
- Brief History of Time
	- [[💻️Computer Science・プログラミング・アルゴリズム・ツール/🌐Distributed Systems・Concurrency・Transaction・DB/Logical Clock]]: [[Lamport Clock]], [[Vector Clock]]など。Lamport Clockは物理的な時間に紐づいていないし、バックチャンネルでの通信は反映できないので実用的でない
		- (とこの論文ではしている。まあケースバイケースでは)(kekeho)
	- [[Physical Time]](PT): [[物理時間]]。[[NTP]]使っても完全に同期はできないので、[[Uncertainty intervals]]が生じ、その期間が被っているイベントには順序付けができない。秒が飛んだり、巻き戻ったりということも発生する
	- [[TrueTime]]: [[Google Spanner]]で提案。特別なデバイスが必要である。また、同期がゆるいとイベントの遅延がかさむ。
		- TrueTimeちゃんと勉強してないけど、多分そうなんだろう(kekeho)
	- [[HybridTime]]: [[Vector Clock]]と[[Physical Time]]の組み合わせ

HLCのアルゴリズム
- HLC($l$)は以下の特性を提供する
	1. $e \ \mathsf{hb} \ f \Rightarrow l.e < l.f$
	2. $l.e$の[[空間計算量]]はO(1)
	3. $l.e$は有限のビット幅で表現される
		- 実際はint64(OSの[[NTP]]クロックと同じビット幅)
	4. $l.e$は$pt.e$と近い値を取る。$|l.e - pt.e|$が有界
Naive algorithm
- 任意のイベント$e$に対して、$l.e \ge pt.e$なタイムスタンプを与える
- 初期化
	- $l.j := 0$
- 送信イベント or ローカルイベント$f$
	- $l.j := \mathrm{max}(l.j+1, pt.j)$
	- $l.j$をそのイベントのタイムスタンプとする(メッセージにはそれを付ける)
- 受信イベント of message $m$
	- $l.j := \mathrm{max}(l.j+1, l.m+1, pt.j)$
	- $l.j$をそのイベントのタイムスタンプとする
- ほぼLamport Clockと一緒(kekeho)
- これで特性1, 2は満たすけど、4は満たされないし、3も満たさない
	- 3を満たさず、どんどんズレが蓄積していく例:
		- ![[assets/667ecc969d0294001dec84e9.png]]
HLCアルゴリズム
- naive algorithmの$l.j$を、$l.j$と$c.j$に分割
	- $l.j$はこれまでに学習した$p.t$の最大値を把握するために使うレベル
	- $c.j$は、$l.j$の値が等しいときにのみ因果関係の更新を捉えるために使用される
- 送信・ローカルイベント
	- $l'.j := l.j$
	- $l.j := max(l'j, pt.j)$
	- $\mathsf{If} \ (l.j = l'j) \ \mathsf{then} \ c.j := c.j + 1 \\ \mathsf{Else} \ c.j := 0$
	- イベントのタイムスタンプは$l.j, c.j$
- 受信イベント of message $m$
	- $l'j := l.j$
	- $l.j := max(l'j, l.m, pt.j)$
	- $\mathsf{If} \ (l.j = l'j = l.m) \ \mathsf{then} \ c.j := max(c.j, c.m) + 1 \\ \mathsf{Elseif} \ (l.j = l'j) \ \mathsf{then} \ c.j := c.j + 1 \\ \mathsf{Elseif} \ (l.j = l.m) \ \mathsf{then} \ c.j := c.m + 1 \\ \mathsf{Else} \ c.j := 0$
		- イベントのタイムスタンプは$l.j, c.j$
![[assets/667ed0e952f2a7001d9e2d93.png]]
- [[happend-before]]を見たかったら、$l$を比べて、等しければ$c$を比べろということっぽい(kekeho)
- 要件4を満たすことの証明は論文に書いてある

参考
- [https://martinfowler.com/articles/patterns-of-distributed-systems/hybrid-clock.html](https://martinfowler.com/articles/patterns-of-distributed-systems/hybrid-clock.html)
- [https://muratbuffalo.blogspot.com/2014/07/hybrid-logical-clocks.html](https://muratbuffalo.blogspot.com/2014/07/hybrid-logical-clocks.html)
