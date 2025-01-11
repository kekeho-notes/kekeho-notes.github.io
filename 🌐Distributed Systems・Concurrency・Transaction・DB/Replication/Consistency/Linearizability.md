---
aliases:
  - Linearizable
  - Strong Consistency
  - 線形化可能性
---
- [[Consistency]]のレベルの一つ
- あるオブジェクトに対する並行操作は、何らかの逐次的な順序([[Real-time Order]])で実行されたものとみなせる + 操作の開始から完了までの何処かの一瞬で実行されたとみなせる
	- その瞬間のことを、[[Linearization point]]という
		- [[Lock]]ベースの実装の場合、クリティカルセクションがLinearization point
		- Lockを使わない実装の場合、メソッド呼び出しの結果が他から見えるようになる時点がLinearization point
- 同期実行であり、同一スレッド内での操作順の反転も発生しないという保証
- [[Quiescent Consistency]], [[Sequential Consistency]]の両方を満たしている
- 操作に[[全順序関係]]がある
	- [[SMR]], [[Total Order Broadcast]]はLinearizableだと思われ? (kekeho)
- [[Composability]]を満たす
- [[Real-time Order]]を満たす

- 単一のオブジェクトについて、[[Sequential Consistency]]と[[Linearizability]]は外部から見分けることができない
	- こうした理由から、[[External Consistency]]と呼ばれることも

参考
- [https://muratbuffalo.blogspot.com/2024/08/linearizability-correctness-condition.html](https://muratbuffalo.blogspot.com/2024/08/linearizability-correctness-condition.html)
- [nikezono/Linearizability](https://scrapbox.io/nikezono/Linearizability)
- http://www.bailis.org/blog/linearizability-versus-serializability/
- [[Linearizability a correctness condition for concurrent objects]]