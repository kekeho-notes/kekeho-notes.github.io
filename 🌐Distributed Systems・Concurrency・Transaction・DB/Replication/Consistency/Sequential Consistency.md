---
aliases:
  - 逐次一貫性
  - Timeline Consistency
---
- 観測される実行順序とプログラムの実行順序が等しい
	- (各スレッドごと) 命令O1→O2の順序が入れ替わらない
- 一般的な非同期実行
- [[実時間性]]がない
- [[Composability]]を満たさない
	- 複数のオブジェクトに対する操作同士の順序反転は起こる
	- 複数のオブジェクトに対するR/Wは、非同期実行の環境下において古いデータに基づいた読み書きを行うこととなり、正しく動作しない
- 書き込みについては[[Linearizability]]と一緒だが、読み込みは[[Linearizability|Linearizable]]にならない
	- 読み込みの最新性が保証されない

- [[Multiprocessor Programming]]の文脈で、コンピュータのメモリは一般的にSequential Consistencyを提供することが多い