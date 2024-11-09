[#Consistency](Consistency.md)
- [[線形化可能性]]とも
- [[Strong Consistency]]とも
- あるオブジェクトに対する並行操作は、何らかの逐次的な順序で実行されたものとみなせる + 操作の開始から完了までの何処かの一瞬で実行されたとみなせる
- 同期実行であり、同一スレッド内での操作順の反転も発生しないという保証
- [[Quiescent Consistency]], [[Sequential Consistency]]の両方を満たしている
- 操作に[[全順序関係]]がある
	- [[SMR]], [[Total Order Broadcast]]はLinearizableだと思われ? (kekeho)
参考
- [https://muratbuffalo.blogspot.com/2024/08/linearizability-correctness-condition.html](https://muratbuffalo.blogspot.com/2024/08/linearizability-correctness-condition.html)
- [[ nikezono Linearizability]]
- [http://www.bailis.org/blog/linearizability-versus-serializability/](http://www.bailis.org/blog/linearizability-versus-serializability/)