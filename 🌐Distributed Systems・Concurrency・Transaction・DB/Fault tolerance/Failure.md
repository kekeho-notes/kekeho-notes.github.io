---
aliases:
  - 故障
  - 故障モデル
---
- いろいろな[[Fault]]がある
# ネットワークのFailure
[[Transient failure]]([[一時障害]])
		- [[Omission failure](脱落)
		- [[Duplication]](複製)
	- [[Patition failure]]([[Network partition]])
	- [[Timing failure]]: タイミング障害。メッセージが予想より早く着いたり、遅くついたりする。
	- [[Arbitrary failure]]([[Byzantine failure]]): 通信における任意故障もある。メッセージを送れてないふりしてn重に送ってるとか。
# プロセスのFailure
- [[プロセス障害]]
	- [[Stop failure]]/[[Crash failure]]([[停止故障]])
		- [[Fail-stop fault]]
		- [[Crash-stop failure]]
	- [[Byzantine failure]]

参考
- [https://homepage.divms.uiowa.edu/~ghosh/16612.week10.pdf?page=10](https://homepage.divms.uiowa.edu/~ghosh/16612.week10.pdf?page=10)
- [https://www.geeksforgeeks.org/various-failures-in-distributed-system/](https://www.geeksforgeeks.org/various-failures-in-distributed-system/)
