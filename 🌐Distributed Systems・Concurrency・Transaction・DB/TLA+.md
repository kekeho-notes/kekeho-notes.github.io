- 分散システムの仕様を記述するモデリング言語
- [[Safety]], [[Liveness]]などの形式的な検証ができる
	- [[TLC]]における検証
		- Safety: 全ての状態で、不変条件が満たされているかチェック。あとは[[Livelock]]の検出をする
		- Liveness: 経路上の何処かの状態で、満たされているかチェック。[[Deadlock]]の検出もする。

- [[PlusCal]]: TLA+をより使いやすくした言語
	- [[Concurrent|並行処理]]や[[分散処理]]を記述するための言語
	- TLA+への変換が可能

- IDEのDownload
	- [https://github.com/tlaplus/tlaplus/releases](https://github.com/tlaplus/tlaplus/releases)

- スタッタリング(何もしない)の検査もできる
	- サーバーのクラッシュ・メッセージロストなどを表現できる
	- [[Liveness]]のチェックに役立つ

TLA+における値
- 文字列
- 整数
- ブール値
	- `TRUE`, `FALSE`
	- 実際の定義は、`set {TRUE, FALSE}`
		- `variable x \in BOOLEAN`みたいな書き方ができる
- モデル値

TLA+における演算子
演算子は、TLA+においてプログラミングのプロシージャに相当するもの
- `Op(arg1, arg2) == Expr`
- 定数の定義に使える
- `define 〜 end define;`に定義
- 高階演算子, Lambda
	- ```high,		Add(a, b) == a + b
		Apply(op(_, _), x, y) == op(x, y)
		>> Apply(Add, 1, 2)
		3
		>> Apply(LAMBDA x, y: x + y, 1, 2)
		3
		```
- Invariantとして使える
	- cfgに書いとけばOK

代表的な演算子
- `=`: 等しい
- `/=`, `#`: 等しくない
- `/\`: 論理積・AND
- `\/`: 論理和・OR
- `:=`: 代入
- `~`: 否定
- `\A`: All
	- 例: `\A p in people: acc[p] >= 0` ← 集合peopleのすべての要素pについて、…
- `\E`: Exists
	- 例: `\E x \in 1..10: x > 5`
- `=>`: ならば
	- `P => Q`: PならばQ(`P \/ Q`)
- `<=>`: どちらも真・どちらも偽
	- 論理式がどちらも同等であることを示す
- `[]`: 常に (参考: [[Temporal logic]])
	- `~[]`: 常にではない、つまり1つ以上のケースで成り立たない
- `<>`: 最終的に (参考: [[Temporal logic]])
- `<>[]`: 最終的には常に
- `[]<>`: 常に最終的に

TLA+における式
LET-IN
```letin
RotateRight(seq) ==
	LET
		last == seq[Len(seq)]
		first == SubSeq(seq, 1, Len(seq)-1)
	IN <<last>> \o first
```
IF
- TLA+では、IFも式。PlusCalでは文であることに注意
- ELSE必須
```if
Max(x, y) == IF x > y THEN x ELSE y
```
CASE
```case
CASE x = 1 -> TRUE
  [] x = 2 -> TRUE
  [] x = 3 -> 7
  [] OTHER -> FALSE
```
CHOOSE
- `CHHOSE x \in S : P(x)`: 集合Sの中から、P(x)がTRUEとなるようなxを選択する

TLA+における型
- 集合
	- `{1, 2, 3}`
	- 集合の演算子:
		- `x \in set`: xが集合の要素かどうか。Bool値が返ってくる。
		- `x \notin set`: xが集合の要素に含まれないかどうか。Bool値が返ってくる。
		- `set1 \subseteq set2`: 部分集合かどうか。Bool値が返ってくる。
		- `set1 \union set2`: 和集合
		- `set1 \intersect set2`: 積集合
		- `set1 \ set2`: 差集合
		- `Cardinality(set)`: 集合内の要素の個数([[濃度]])
			- EXTENDS FiniteSetsが必要
		- `SUBSET {"a", "b"}`: `{{}, {"a"}, {"b"}, {"a", "b"}}` 冪集合。全ての部分集合からなる集合
		- `UNION {{"a"}, {"b"}, {"b", "c"}}`: `{"a", "b", "c"}` 全ての部分集合からなる集合を一つにまとめる
		- `{"a", "b", "c"} \X (1..2)`: `{<<"a", 1>>, <<"a", 2>>, <<"b", 1>>, ...}` 全ての組み合わせ
	- 集合のフィルタ: `{x \in 1..2: x < 2}`
	- 集合のマップ: `{ x*2: x \in x..2 }`
	- 集合は、要素の型が一緒じゃないとダメ
- タプル(シーケンス): 順序関係がある
	- `<<1, 2, "a", {1, 2}>>`
	- インデックスアクセス: `seq[index]`
	- タプルの演算子(EXTENDS Sequencesが必要)
		- `Head(seq)`: 先頭の要素を返す
		- `Tail(seq)`: 先頭を除いたタプルを返す
		- `Append(seq, x)`: 末尾に要素を追加したタプルを返す
		- `seq1 \o seq2`: 結合したタプルを返す
		- `Len(seq)`: タプルの長さを返す
	- タプルは、要素の型が異なって良い
- 構造体
	- 文字列を値にマップする
		- 値の型は異なって良い
	- `[key1 |-> 1, key2 |-> "hoge"]`
	- 値の取得: `[key1 |-> 1].key1`
	- 構造体の集合
		- `[key: set]`と書くと、各パターンを生成してくれる。
		- ```structset,			>> [a: {1, 2}]
			{[a |-> 1], [a |-> 2]}
			```
- 関数(mapに近い)
	- 一連の入力(定義域)を、一連の出力にマッピングするもの
	- `[x \in set |-> P(x)]`の形式で書く
		- れい: `[x \in numbers |-> x * 2)]`
	- 関数呼び出し: `f[arg1, arg2]`
	- 関数は演算子にすることができる
		- 演算子との違い: 関数の場合は定義域が必要
	- 実は、タプル・構造体は関数。タプルは定義域が1..n, 構造体は定義域が文字列集合
	- `@@`: 関数のマージ
		- 構造体も関数なので、構造体のマージもできる
	- 関数の集合
		- `[set1 -> set2]`: set1からset2へのマッピングをするすべての関数からなる集合


PlusCal記法
- アルゴリズムの書き方:
	- ```algorithm,		(*--algorithm <名前>
		
		end algorithm;*)
		```
	- TLA+のパーサに無視されるように、コメントとして書く
- `variables`: 変数の初期化
- `define ~ end define`: 不変条件(invariant)の定義
- `begin ~ end algorithm`: 実装の定義
- `=`: 宣言・代入
- `:=`: 代入
- ラベルはAtomicに実行される?
- `assert`: アサーション。不変条件のテストに使える。
	- EXTENDS TLCが必要
- `skip`: なにもしない
- `exp1 || exp2`: 1と2を同時に評価
- if文
	- ```if,		if cond1 then
			body
		elsif cond2 then
			body
		else
			body
		end if;
		```
- while
	- ```while,		while cond do
			body
		end while;
		```
	- forはない
- macro
	- ```macro,		macro name(arg1, arg2) begin
			body
		end macro;
		```

		- macroには、whileを書けない、変数の代入が1度のみなど制約がある
		- macroの外側の変数を参照・代入することが可能。
- 複数の開始状態
	- 変数の初期化時に、以下の感じで書くと複数の開始状態を定義できる。
	- ```varin,		(*--algorithm in
		variables x \in 1..3;
		begin
			assert x <= 2;  \* x = 3で失敗
		end algorithm; *)
		```
- 非決定論性のシュミレート
	- >  PlusCal では either または with を用いて非決定性 (nondeterminism) の挙動を記述することができる。これらの記述は制御構文と似ているが、制御構文がある状態に対して必ず 1 つの経路が決まるのに対して、非決定性挙動はシステムの状態によらず任意の経路を取りうるという点で異なる。非決定性挙動の代表的な例はユーザ入力やサーバ応答のようなシステムの外部で決定する事象である。
	- >  状態変数の定義域が組み合わせでテストされていたのと同様に、処理中に either や with と遭遇すると PlusCal は自動でその組み合わせ数の検証経路を増加させる。
	- >  
[https://hazm.at/mox/lang/tla+/pluscal/control-flow/index.html](https://hazm.at/mox/lang/tla+/pluscal/control-flow/index.html)
		- なるほど(kekeho)
	- `either`: 
		- ```either,			either
				\* 分岐1
			or
				\* 分岐2
			or
				\* ...
			end either;
			```
	- `with`:
		- setの中から、非決定的に何らかの値を取る
		- ```with,			with var \in set do
				\* 本文
			end with;
			```
- `process`: プロセスの定義
	- PlusCalでは、状態機械をprocess, either, awaitで実現する
- `await cond`: condがtrueになるまでプロセスを待機
	- `when cond`でもOK
		- 違いはなんだろ。。。(kekeho)
- `fair`: [[Fairness]]の表現。[[弱い公平性]]。いずれはそのプロセスが実行されることを示せる。ステップが進行可能な条件が継続して続くのであればいつか進行する。
	- `fair process process_name`
- `fair+`: [[強い公平性]]。進行可能と進行不可能が断続的に繰り返されたとしてもいつか進行する
	- fairって、クラッシュしないプロセスをシュミレートできるのか?(kekeho)
ラベル
- 原子性の粒度を決定する
	- ラベル内のすべてのものをAtomicに(1ステップで)実行する。続いて、全ての不変条件を検査する

モデル値
- [https://old.learntla.com/models/model-values/](https://old.learntla.com/models/model-values/)
	- `[model value]`の説明

VSCode環境
- TLA+ ToolboxよりVSCodeのほうが書きやすい
	- Toolboxのほうが高機能ではある
- 拡張機能: [TLA+ - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=alygin.vscode-tlaplus)
- .cfgファイルが生成されるので、そこに色々書ける
	- ```例.cfg,		SPECIFICATION Spec
		\* Add statements after this line.   
		INVARIANT NoOverdrafts   
		PROPERTIES EventuallyConsistent
		```


Tips
- リストの最大値を取得するコード
	- ```max,		Max(seq) ==
		    LET set == {seq[i]: i \in 1..Len(seq)}
		    IN CHOOSE x \in set: \A y \in set: y <= x
		```

参考資料
- [The TLA+ Home Page](https://lamport.azurewebsites.net/tla/tla.html)
- [A High-Level View of TLA+](https://lamport.azurewebsites.net/tla/high-level-view.html)
	- 概要の説明 by [[Leslie Lamport]]
- [https://lamport.azurewebsites.net/tla/summary-standalone.pdf](https://lamport.azurewebsites.net/tla/summary-standalone.pdf)
	- チートシート的なもの
- [https://hazm.at/mox/lang/tla+/index.html](https://hazm.at/mox/lang/tla+/index.html)
	- > TLA+ や PlusCal は設計を抽象化する過程で設計者の主観や感覚の影響を大きく受けやすい。「TLA+ で証明済み」といった主張を盲信せず、どのような前提の下にどのようなケースが適用または省略されたか (省略した部分はどう実装することを想定しているか) を十分にレビューすべきである。
		- なるほど(kekeho)
- [エンジニア目線で見る TLA+ と PlusCal - TAKAMI Torao | PPT](https://www.slideshare.net/slideshow/tla-pluscal-takami-torao/265420965)
	- [[TLC]]がどうやって[[Sa