- [[計算モデル]]の一つ
- [[RAMモデル]](RAM: [[Random Access Machine]])
	- 各単純計算(+, -, *, =, if, call)は一単位時間で実行できる
	- 各メモリアクセスは1単位時間で実行できる
	- メモリの1つのセルには任意の桁の数を格納できる
- [[word-RAM]]: [[RAMモデル]]をより現実的にしたもの
	- ![[assets/6636e5d53c0e1a00241df23d.png]]

	- 計算機は$U$ビットのメモリを持つ。メモリのアドレスは[$0$, $U - 1$]の整数で指定する
	- 計算機の語長は$\log_2 U$ビットである。つまり、$log_2 U$ビットの数の算術・論理演算・および連続する$log_2 U$ビットのメモリアクセスが1単位時間で行える
	- メモリから読み込んだ値は[$0, U-1$]の整数とみなす

- word-RAMにおける[[空間計算量]]
	- アルファベット: $A = {1, 2, ..., \sigma-1, \sigma}$
		- [$1..\sigma$]と表すことも
		- 文字の集合
		- $\sigma$: アルファベットサイズ
	- サイズ$\sigma$のアルファベット上の、長さ$n$の文字列: $n \log_2\sigma$bitの領域を占める
		- 1文字あたり$\log_2\sigma$bit使うのだから、あたりまえ体操(kekeho)
