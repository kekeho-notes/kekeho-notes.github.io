- [[Read skew]]のこと
- ![[assets/671c712491f05391efb7237c.png]]
	- 画像は[トランザクションの分離性（isolation）の概要 #Transaction - Qiita](https://qiita.com/immrshc/items/efc8cb31226da297c9b4#ノンリピータブルリード)より
- [[Read committed]]のもとでは許容されてしまう[[Anomaly]]
- [[Snapshot isolation]]では起きない

- Isolation的には、トランザクションの逐次実行と等しくなるべきなのに、図のようにxを2回読んでそれぞれで値が変わっていたらおかしい

許容されないケース
- DBのバックアップ
	- Repeatable readが発生していたら、一貫性(ACIDのC)が失われる
- 大規模な分析クエリにおける整合性チェック
	- DBの大部分をスキャンするクエリでは、一貫性(ACIDのC)が失われた結果を得てしまう→整合性チェックなどをしようと思ったらつらい
