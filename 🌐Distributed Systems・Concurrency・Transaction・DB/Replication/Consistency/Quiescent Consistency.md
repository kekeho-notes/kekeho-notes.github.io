---
aliases:
  - 静止一貫性
---
- 静止状態(Quiescent State)をまたぐリオーダが起きない[[Consistency]]
	- [[Quiescent State]]: どのスレッドからの操作も行われていない瞬間
- [[Real-time Order]]がある
	- 終了時含め、Quiescent Stateにおいては必然的にそれまでに開始されたすべての操作が反映されていることを意味する
	- 実時間性あるか? と思うが、何らかのタイミングで保証できるので実時間性があると言われる
		- バッチで見たらたしかにそう言えそう
- [[Non-blocking]]である
- [[Composability]]がある

